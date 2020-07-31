import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';
import ICreateIncidentDTO from '@modules/thebehero/incidents/dtos/ICreateIncidentDTO';
import IIncidentJoinOng from '@modules/thebehero/incidents/dtos/IIncidentJoinOng';

export default class FakeIncidentsRepository implements IIncidentsRepository {
  private incidents: IIncidentDTO[] = [];

  public async create({
    title,
    description,
    value,
    ong_id,
  }: ICreateIncidentDTO): Promise<IIncidentDTO> {
    const incident: IIncidentDTO = {
      id: String(this.incidents.length),
      title,
      description,
      value,
      ong_id,
    };
    this.incidents.push(incident);
    return incident;
  }

  public async count(): Promise<number> {
    return this.incidents.length;
  }

  public async findAllIncidentsWithPagesJoinOngs(
    page: number,
  ): Promise<IIncidentJoinOng[]> {
    const incidents: IIncidentJoinOng[] = [];
    let i = (page - 1) * 5;
    for (i; i < page * 5; i += 1) {
      incidents.push({
        id: this.incidents[i].id,
        title: this.incidents[i].title,
        description: this.incidents[i].description,
        value: this.incidents[i].value,
        ong_id: this.incidents[i].ong_id,
        name: `name_${this.incidents[i].title}`,
        email: `email_${this.incidents[i].title}`,
        whatsapp: `whatsapp_${this.incidents[i].title}`,
        city: `city_${this.incidents[i].title}`,
        uf: `uf_${this.incidents[i].title}`,
      });
      if (i + 1 === this.incidents.length) {
        break;
      }
    }
    return incidents;
  }

  public async findIncindentId(
    incident_id: string,
  ): Promise<IIncidentDTO | undefined> {
    const incident = this.incidents.find(
      findIncident => findIncident.id === incident_id,
    );
    return incident || undefined;
  }

  public async delete(incident_id: string): Promise<void> {
    const findIndex = this.incidents.findIndex(
      incidentIndex => incidentIndex.id === incident_id,
    );

    this.incidents.splice(findIndex, 1);
  }

  public async findOngId(ong_id: string): Promise<IIncidentDTO[]> {
    const incidents = this.incidents.filter(
      findIncidents => findIncidents.ong_id === ong_id,
    );
    return incidents;
  }
}
