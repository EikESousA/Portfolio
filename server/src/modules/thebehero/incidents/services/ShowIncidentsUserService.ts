import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';

import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';

interface IProps {
  ong_id: string;
}

@injectable()
export default class ShowIncidentsUserService {
  constructor(
    @inject('TheBeHero_IncidentsRepository')
    private incidentsRepository: IIncidentsRepository,
  ) {}

  public async execute({ ong_id }: IProps): Promise<IIncidentDTO[]> {
    const incidents = await this.incidentsRepository.findOngId(ong_id);

    return incidents;
  }
}
