import request from 'supertest';
import server from '@shared/infra/http/app';
import connection from '@shared/infra/knex';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG!', async () => {
    const response = await request(server).post('/thebehero/ongs').send({
      name: 'ong_eike',
      email: 'eike.sousa@hotmail.com',
      whatsapp: '79999794827',
      city: 'Aracaju',
      uf: 'SE',
    });

    expect(response.body).toHaveProperty('id');
  });
});
