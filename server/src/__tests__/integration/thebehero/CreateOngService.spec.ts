import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

describe('CreateOngService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ong!', async () => {
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

    expect(create_ong).toHaveProperty('id');
  });
});
