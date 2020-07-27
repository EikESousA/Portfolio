import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import AppError from '@shared/errors/AppError';

import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';

interface IResponse {
  name: string;
  bio: string;
  avatar_url: string;
}

@injectable()
export default class CreateDevService {
  constructor(
    @inject('DevsRepository')
    private devsRepository: IDevsRepository,
  ) {}

  public async execute(user: string): Promise<IDev> {
    const userExists = await this.devsRepository.findUser(user);

    if (userExists) {
      return userExists;
    }

    const githubResponse = await axios.get<IResponse>(
      `https://api.github.com/users/${user}`,
    );

    if (!githubResponse.data) {
      throw new AppError('User not found!', 400);
    }

    const { name, bio, avatar_url } = githubResponse.data;

    const dev = await this.devsRepository.create({
      user,
      name,
      bio,
      avatar: avatar_url,
    });

    return dev;
  }
}
