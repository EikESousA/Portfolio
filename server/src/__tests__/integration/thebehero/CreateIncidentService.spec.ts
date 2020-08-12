import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';

describe('CreateIncidentService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new incident!', async () => {
    const response_create_ong = await request(server)
      .post('/thebehero/ongs')
      .send({
        name: 'ong_test',
        email: 'email_test@email.com',
        whatsapp: '11111111111',
        city: 'city_test',
        uf: 'TS',
      })
      .expect(200);

    const create_ong = response_create_ong.body as IOngDTO;

    const response_create_incident = await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test',
        description: 'description_test',
        value: '11',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    const create_incident = response_create_incident.body as IIncidentDTO;

    expect(String(create_incident.ong_id)).toEqual(String(create_ong.id));
  });
});
