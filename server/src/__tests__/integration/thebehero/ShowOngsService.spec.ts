import request from 'supertest';

import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

describe('ShowOngsService', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to show all ongs!', async () => {
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
        name: 'ong_test_2',
        email: 'email_test_2@email.com',
        whatsapp: '22222222222',
        city: 'city_test',
        uf: 'TS',
      })
      .expect(200);

    const create_ong_2 = response_create_ong_2.body as IOngDTO;

    const response_show_ongs = await request(server)
      .get('/thebehero/ongs')
      .expect(200);

    const show_ongs = response_show_ongs.body as IOngDTO[];

    expect(show_ongs).toEqual([create_ong_1, create_ong_2]);
  });
});
