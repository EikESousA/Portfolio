import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IDevsRepository from '@modules/devradar/devs/repositories/IDevsRepository';
import { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';

import parseStringAsArray from '@modules/devradar/devs/utils/parseStringAsArray';

interface ISearchDev {
  latitude: number;
  longitude: number;
  techs: string;
}

@injectable()
export default class SearchDevService {
  constructor(
    @inject('DevsRepository')
    private devsRepository: IDevsRepository,
  ) {}

  public async execute({
    latitude,
    longitude,
    techs,
  }: ISearchDev): Promise<IDev[]> {
    const techsArray = parseStringAsArray(techs);

    const devs = await this.devsRepository.findByTechsLocation({
      latitude,
      longitude,
      techsArray,
    });

    return devs;
  }
}
