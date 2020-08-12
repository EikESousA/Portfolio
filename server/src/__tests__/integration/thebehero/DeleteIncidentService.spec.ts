import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';

describe('DeleteIncidentService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to delete an incident!', async () => {
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

    await request(server)
      .del(`/thebehero/incidents/${create_incident.id}`)
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);
  });

  it('should not be able to delete an incident because you are not authenticated!', async () => {
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

    await request(server)
      .del(`/thebehero/incidents/${create_incident.id}`)
      .set({
        Authorization: 'ong-not-exist',
      })
      .expect(400);
  });

  it('should not be able to delete an incident because the incident does not exist!', async () => {
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

    await request(server)
      .del(`/thebehero/incidents/incident-not-exist`)
      .set({
        Authorization: create_ong.id,
      })
      .expect(400);
  });
});
