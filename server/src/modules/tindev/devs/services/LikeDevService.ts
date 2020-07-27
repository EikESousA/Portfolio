import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';

@injectable()
export default class LikeDevService {
  constructor(
    @inject('DevsRepository')
    private devsRepository: IDevsRepository,
  ) {}

  public async execute(
    dev_id: string,
    user_id: string,
  ): Promise<{ loggedDev: IDev; targetDev: IDev }> {
    const loggedDev = await this.devsRepository.findById(user_id);
    const targetDev = await this.devsRepository.findById(dev_id);

    if (loggedDev) {
      if (!targetDev) {
        throw new AppError('Dev not found!', 400);
      }

      loggedDev.likes.push(targetDev.id);

      await this.devsRepository.save(loggedDev);

      return { loggedDev, targetDev };
    }

    throw new AppError('User not exist!', 400);
  }
}
