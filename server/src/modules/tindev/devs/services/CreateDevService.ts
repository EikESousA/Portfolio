import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import IAPIGithubProvider from '@modules/tindev/devs/providers/APIGithubProvider/models/IAPIGithubProvider';
import { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';

interface IResponse {
  name: string;
  bio: string;
  avatar_url: string;
  message?: string;
  login: string;
}

@injectable()
export default class CreateDevService {
  constructor(
    @inject('TinDev_DevsRepository')
    private devsRepository: IDevsRepository,
    @inject('TinDev_APIGithubProvider')
    private apiGithubProvider: IAPIGithubProvider,
  ) {}

  public async execute(username: string): Promise<IDev> {
    const userExists = await this.devsRepository.findByUser(
      username.toLowerCase(),
    );

    if (userExists) {
      return userExists;
    }

    const githubResponse = await this.apiGithubProvider.get(username);

    if (githubResponse) {
      const { name, bio, avatar_url, login } = githubResponse;

      const dev = await this.devsRepository.create({
        user: login.toLowerCase(),
        name,
        bio,
        avatar: avatar_url,
      });

      return dev;
    }

    throw new AppError('User not found!', 400);
  }
}
