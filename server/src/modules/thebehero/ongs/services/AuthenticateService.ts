import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOngsRepository from '@modules/thebehero/ongs/repositories/IOngsRepository';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

interface IProps {
  id: string;
}

@injectable()
export default class AuthenticateService {
  constructor(
    @inject('TheBeHero_OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute({ id }: IProps): Promise<IOngDTO> {
    const ong = await this.ongsRepository.findOngById(id);

    if (!ong) {
      throw new AppError('No ONG found with this ID!', 400);
    }

    return ong;
  }
}
