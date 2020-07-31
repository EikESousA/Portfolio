import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import { ISpot } from '@modules/aircnc/spots/infra/mongoose/entities/Spot';

interface IProps {
  tech: string;
}

@injectable()
export default class ShowSpotsService {
  constructor(
    @inject('AirCnC_SpotsRepository')
    private spotsRepository: ISpotsRepository,
  ) {}

  public async execute({ tech }: IProps): Promise<ISpot[] | undefined> {
    const spots = await this.spotsRepository.findByTech(tech);

    return spots;
  }
}
