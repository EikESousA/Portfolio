import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDevsRepository from '@modules/devradar/devs/repositories/IDevsRepository';
import IAPIGithubProvider from '@modules/devradar/devs/providers/APIGithubProvider/models/IAPIGithubProvider';
import { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';

import {
  findConnections,
  sendMessage,
} from '@shared/infra/http/middlewares/websocketio';

import parseStringAsArray from '@modules/devradar/devs/utils/parseStringAsArray';

interface IDevProps {
  github_username: string;
  techs: string;
  latitude: number;
  longitude: number;
}

@injectable()
export default class CreateDevService {
  constructor(
    @inject('DevRadar_DevsRepository')
    private devsRepository: IDevsRepository,
    @inject('DevRadar_APIGithubProvider')
    private apiGithubProvider: IAPIGithubProvider,
  ) {}

  public async execute({
    github_username,
    techs,
    latitude,
    longitude,
  }: IDevProps): Promise<IDev> {
    let dev = await this.devsRepository.findByGithubUsername(
      github_username.toLowerCase(),
    );

    if (!dev) {
      const apiResponse = await this.apiGithubProvider.get(github_username);

      if (apiResponse) {
        const { login, avatar_url, bio } = apiResponse;

        const techsArray = parseStringAsArray(techs);

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        dev = await this.devsRepository.create({
          login: login.toLowerCase(),
          bio,
          avatar_url,
          github_username: github_username.toLowerCase(),
          techs: techsArray,
          location,
        });

        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          techsArray,
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
      } else {
        throw new AppError('User not found!', 400);
      }
    }

    return dev;
  }
}
