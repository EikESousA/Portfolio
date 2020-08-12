import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';

describe('ShowIncidentsUserService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to show all user incidents!', async () => {
    const response_create_ong_1 = await request(server)
      .post('/thebehero/ongs')
      .send({
        name: 'ong_test_1',
        email: 'email_test_1@email.com',
        whatsapp: '11111111111',
        city: 'city_test',
        uf: 'TS',
      })
      .expect(200);

    const create_ong_1 = response_create_ong_1.body as IOngDTO;

    const response_create_ong_2 = await request(server)
      .post('/thebehero/ongs')
      .send({
        name: 'ong_test_21',
        email: 'email_test_2@email.com',
        whatsapp: '22222222222',
        city: 'city_test',
        uf: 'TS',
      })
      .expect(200);

    const create_ong_2 = response_create_ong_2.body as IOngDTO;

    const response_create_incident_1 = await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_1',
        description: 'description_test_1',
        value: '11',
      })
      .set({
        Authorization: create_ong_1.id,
      })
      .expect(200);

    const create_incident_1 = response_create_incident_1.body as IIncidentDTO;

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_2',
        description: 'description_test_2',
        value: '22',
      })
      .set({
        Authorization: create_ong_2.id,
      })
      .expect(200);

    const response_show_incidents = await request(server)
      .get('/thebehero/incidents/profile')
      .set({
        Authorization: create_ong_1.id,
      })
      .expect(200);

    const show_incidents = response_show_incidents.body as IIncidentDTO[];

    expect(show_incidents[0].id).toEqual(create_incident_1.id);
  });
});
