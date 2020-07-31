import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';

interface IProps {
  user_id: string;
}

@injectable()
export default class ShowDevsService {
  constructor(
    @inject('TinDev_DevsRepository')
    private devsRepository: IDevsRepository,
  ) {}

  public async execute({ user_id }: IProps): Promise<IDev[] | undefined> {
    const loggedDev = await this.devsRepository.findById(user_id);
    if (loggedDev) {
      const users = await this.devsRepository.findAllDevsByUser(
        user_id,
        loggedDev,
      );
      return users;
    }
    return [];
  }
}
