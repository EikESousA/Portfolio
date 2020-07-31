import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';

interface IProps {
  incident_id: string;
  ong_id: string;
}

@injectable()
export default class DeleteIncidentService {
  constructor(
    @inject('TheBeHero_IncidentsRepository')
    private incidentsRepository: IIncidentsRepository,
  ) {}

  public async execute({ incident_id, ong_id }: IProps): Promise<void> {
    const incident = await this.incidentsRepository.findIncindentId(
      incident_id,
    );

    if (incident) {
      if (incident.ong_id !== ong_id) {
        throw new AppError('User not authenticate!', 400);
      }

      await this.incidentsRepository.delete(incident_id);
    } else {
      throw new AppError('Incident not exist!', 400);
    }
  }
}
