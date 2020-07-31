import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';
import ICreateIncidentDTO from '../dtos/ICreateIncidentDTO';

@injectable()
export default class CreateIncidentService {
  constructor(
    @inject('TheBeHero_IncidentsRepository')
    private incidentsRepository: IIncidentsRepository,
  ) {}

  public async execute({
    title,
    description,
    value,
    ong_id,
  }: ICreateIncidentDTO): Promise<IIncidentDTO> {
    const incident = await this.incidentsRepository.create({
      title,
      description,
      value,
      ong_id,
    });

    return incident;
  }
}
