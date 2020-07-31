import connection from '@shared/infra/knex';

import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';
import ICreateIncidentDTO from '@modules/thebehero/incidents/dtos/ICreateIncidentDTO';
import IIncidentJoinOng from '@modules/thebehero/incidents/dtos/IIncidentJoinOng';

export default class IncidentsRepository implements IIncidentsRepository {
  public async create({
    title,
    description,
    value,
    ong_id,
  }: ICreateIncidentDTO): Promise<IIncidentDTO> {
    const [id] = await connection('thebehero_incident').insert({
      title,
      description,
      value,
      ong_id,
    });

    const incident = await connection('thebehero_incident')
      .where('id', id)
      .select('*')
      .first();

    return incident;
  }

  public async count(): Promise<number> {
    const [count] = await connection('thebehero_incident').count();
    return count['count(*)'];
  }

  public async findAllIncidentsWithPagesJoinOngs(
    page: number,
  ): Promise<IIncidentJoinOng[]> {
    const incidents = await connection('thebehero_incident')
      .join(
        'thebehero_ong',
        'thebehero_ong.id',
        '=',
        'thebehero_incident.ong_id',
      )
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'thebehero_incident.*',
        'thebehero_ong.name',
        'thebehero_ong.email',
        'thebehero_ong.whatsapp',
        'thebehero_ong.city',
        'thebehero_ong.uf',
      ]);

    return incidents;
  }

  public async findIncindentId(incident_id: string): Promise<IIncidentDTO> {
    const incident = await connection('thebehero_incident')
      .where('id', incident_id)
      .select('ong_id')
      .first();

    return incident;
  }

  public async delete(incident_id: string): Promise<void> {
    await connection('thebehero_incident').where('id', incident_id).delete();
  }

  public async findOngId(ong_id: string): Promise<IIncidentDTO[]> {
    const ong = await connection('thebehero_incident')
      .where('ong_id', ong_id)
      .select('*');

    return ong;
  }
}
