import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev, { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';

describe('ShowDevService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to show all developers without likes and dislikes!', async () => {
    const request_create_dev_1 = await request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikesousa',
      })
      .expect(200);

    const create_dev_1 = request_create_dev_1.body as IDev;

    const request_create_dev_2 = await request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikeufs',
      })
      .expect(200);

    const create_dev_2 = request_create_dev_2.body as IDev;

    const request_show_devs = await request(server)
      .get('/tindev/devs')
      .set('user_id', String(create_dev_2._id))
      .expect(200);

    const show_devs = request_show_devs.body as IDev[];

    expect(show_devs).toEqual([create_dev_1]);

    await Dev.deleteMany({});
  }, 30000);

  it(`should not be able to show all the developers without liking or not why there is no user!`, async () => {
    const show_devs = await request(server)
      .get('/tindev/devs')
      .set('user_id', 'user_not_exist')
      .expect(200);

    const devs = show_devs.body as IDev[];

    expect(devs).toEqual([]);
  }, 30000);
});
