import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import { ISpot } from '@modules/aircnc/spots/infra/mongoose/entities/Spot';

@injectable()
export default class ShowDashboardService {
  constructor(
    @inject('SpotsRepository')
    private spotsRepository: ISpotsRepository,
  ) {}

  public async execute(user_id: string): Promise<ISpot[] | undefined> {
    const spots = await this.spotsRepository.findByUserId(user_id);

    return spots;
  }
}
