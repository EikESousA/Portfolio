import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IOngsRepository from '@modules/thebehero/ongs/repositories/IOngsRepository';
import IGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/models/IGenerateUniqueIdProvider';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

@injectable()
export default class CreateOngService {
  constructor(
    @inject('TheBeHero_OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('TheBeHero_GenerateUniqueIdProvider')
    private generateUniqueIdProvider: IGenerateUniqueIdProvider,
  ) {}

  public async execute({
    city,
    email,
    name,
    uf,
    whatsapp,
  }: IOngDTO): Promise<IOngDTO> {
    const id = this.generateUniqueIdProvider.generateUniqueId();

    const ong = await this.ongsRepository.create({
      id,
      city,
      email,
      name,
      uf,
      whatsapp,
    });

    return ong;
  }
}
