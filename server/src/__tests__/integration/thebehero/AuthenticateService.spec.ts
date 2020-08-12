import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

describe('AuthenticateService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to authenticate the ong!', async () => {
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

    const response_authenticate_ong = await request(server)
      .post('/thebehero/ongs/sessions')
      .send({ id: create_ong.id })
      .expect(200);

    const authenticate_ong = response_authenticate_ong.body.name as string;

    expect(authenticate_ong).toEqual(String(create_ong.name));
  });

  it('should not be able to authenticate because there is no ong!', async () => {
    await request(server)
      .post('/thebehero/ongs/sessions')
      .send({ id: 'ong-not-exist' })
      .expect(400);
  });
});
