import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import { ISpot } from '@modules/aircnc/spots/infra/mongoose/entities/Spot';
import ICreateSpotDTO from '@modules/aircnc/spots/dtos/ICreateSpotDTO';

import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';

@injectable()
export default class CreateSpotService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SpotsRepository')
    private spotsRepository: ISpotsRepository,
  ) {}

  public async execute(data: ICreateSpotDTO): Promise<ISpot> {
    const user = await this.usersRepository.findByUserId(data.user);

    if (!user) {
      throw new AppError("User doesn't exists!", 400);
    }

    const spot = await this.spotsRepository.create(data);

    return spot;
  }
}
