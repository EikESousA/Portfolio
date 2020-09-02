import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPointsRepository from '@modules/ecoleta/points/repositories/IPointsRepository';
import IPointsDTO from '@modules/ecoleta/points/dtos/IPointsDTO';

interface IRequest {
  image: string;
  name: string;
  email: string;
  whatsapp: number;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: string;
}

@injectable()
export default class CreatePoint {
  constructor(
    @inject('Ecoleta_PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  }: IRequest): Promise<IPointsDTO> {
    const trx = this.pointsRepository.transaction();

    const point = await this.pointsRepository.create({
      trx,
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point.id,
        };
      });

    return incident;
  }
}
