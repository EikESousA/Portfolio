import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import IDevsRepository from '@modules/devradar/devs/repositories/IDevsRepository';
import { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';
import {
  findConnections,
  sendMessage,
} from '@shared/infra/http/middlewares/websocketio';
import parseStringAsArray from '../utils/parseStringAsArray';

interface IResponse {
  login: string;
  bio: string;
  avatar_url: string;
}

interface IDevProps {
  github_username: string;
  techs: string;
  latitude: number;
  longitude: number;
}

@injectable()
export default class CreateDevService {
  constructor(
    @inject('DevsRepository')
    private devsRepository: IDevsRepository,
  ) {}

  public async execute({
    github_username,
    techs,
    latitude,
    longitude,
  }: IDevProps): Promise<IDev> {
    let dev = await this.devsRepository.findByGithubUsername(github_username);

    if (!dev) {
      const apiResponse = await axios.get<IResponse>(
        `http://api.github.com/users/${github_username}`,
      );

      const { login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await this.devsRepository.create({
        name: login,
        bio,
        avatar_url,
        github_username,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return dev;
  }
}
