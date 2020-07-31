import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IOngsRepository from '@modules/thebehero/ongs/repositories/IOngsRepository';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

@injectable()
export default class ShowOngService {
  constructor(
    @inject('TheBeHero_OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute(): Promise<IOngDTO[]> {
    const ongs = await this.ongsRepository.showAllOngs();

    return ongs;
  }
}
