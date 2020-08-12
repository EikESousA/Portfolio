import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';
import IIncidentDTO from '@modules/thebehero/incidents/dtos/IIncidentDTO';
import IIncidentJoinOng from '@modules/thebehero/incidents/dtos/IIncidentJoinOng';

describe('ShowIncidentsService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to show all incidents on the page!', async () => {
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
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_1',
        description: 'description_test_1',
        value: '11',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_2',
        description: 'description_test_2',
        value: '22',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_3',
        description: 'description_test_3',
        value: '33',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_4',
        description: 'description_test_4',
        value: '44',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_5',
        description: 'description_test_5',
        value: '55',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_6',
        description: 'description_test_6',
        value: '66',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    const response_show_incidents = await request(server)
      .get('/thebehero/incidents')
      .expect(200);

    const show_incidents = response_show_incidents.body as IIncidentJoinOng[];

    expect(show_incidents.length).toEqual(5);
  });

  it('should be able to show all incidents on the page 2!', async () => {
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
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_1',
        description: 'description_test_1',
        value: '11',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_2',
        description: 'description_test_2',
        value: '22',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_3',
        description: 'description_test_3',
        value: '33',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_4',
        description: 'description_test_4',
        value: '44',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_5',
        description: 'description_test_5',
        value: '55',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    const response_create_incident_6 = await request(server)
      .post('/thebehero/incidents')
      .send({
        title: 'incident_test_6',
        description: 'description_test_6',
        value: '66',
      })
      .set({
        Authorization: create_ong.id,
      })
      .expect(200);

    const create_incident_6 = response_create_incident_6.body as IIncidentDTO;

    const response_show_incidents = await request(server)
      .get('/thebehero/incidents')
      .query({ page: 2 })
      .expect(200);

    const show_incidents = response_show_incidents.body as IIncidentJoinOng[];

    expect(show_incidents[0].id).toEqual(create_incident_6.id);
  });
});
