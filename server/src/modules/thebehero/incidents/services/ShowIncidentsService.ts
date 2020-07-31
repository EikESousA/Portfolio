import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';
import IIncidentJoinOng from '../dtos/IIncidentJoinOng';

interface IShowIncident {
  count: number;
  incidents: IIncidentJoinOng[];
}

interface IProps {
  page: number;
}

@injectable()
export default class ShowIncidentsService {
  constructor(
    @inject('TheBeHero_IncidentsRepository')
    private incidentsRepository: IIncidentsRepository,
  ) {}

  public async execute({ page }: IProps): Promise<IShowIncident> {
    const count = await this.incidentsRepository.count();

    const incidents = await this.incidentsRepository.findAllIncidentsWithPagesJoinOngs(
      page,
    );

    return { count, incidents };
  }
}
