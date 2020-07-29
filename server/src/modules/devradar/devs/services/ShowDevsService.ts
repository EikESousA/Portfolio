import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IDevsRepository from '@modules/devradar/devs/repositories/IDevsRepository';

import { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';

@injectable()
export default class ShowDevsService {
  constructor(
    @inject('DevRadar_DevsRepository')
    private devsRepository: IDevsRepository,
  ) {}

  public async execute(): Promise<IDev[]> {
    const devs = await this.devsRepository.findAllDevs();
    return devs;
  }
}
