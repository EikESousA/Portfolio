import ICreateIncidentDTO from '@modules/thebehero/incidents/dtos/ICreateIncidentDTO';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';
import IIncidentJoinOng from '@modules/thebehero/incidents/dtos/IIncidentJoinOng';

export default interface IIncidentsRepository {
  create({
    title,
    description,
    value,
    ong_id,
  }: ICreateIncidentDTO): Promise<IIncidentDTO>;
  count(): Promise<number>;
  findAllIncidentsWithPagesJoinOngs(page: number): Promise<IIncidentJoinOng[]>;
  findIncindentId(incident_id: string): Promise<IIncidentDTO | undefined>;
  delete(incident_id: string): Promise<void>;
  findOngId(ong_id: string): Promise<IIncidentDTO[]>;
}
