import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev, { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';

describe('DislikeDevService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to give a developer dislike!', async () => {
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

    const request_dislike_dev = await request(server)
      .post(`/tindev/devs/${create_dev_2._id}/dislikes`)
      .set({ user_id: create_dev_1._id })
      .expect(200);

    const dislike_dev = request_dislike_dev.body as IDev;

    const findDislike = dislike_dev.dislikes.includes(create_dev_2._id);

    expect(findDislike).toBeTruthy();

    await Dev.deleteMany({});
  }, 30000);

  it(`shouldn't be able to dislike a developer because there is no user!`, async () => {
    const request_create_dev = await request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikesousa',
      })
      .expect(200);

    const create_dev = request_create_dev.body as IDev;

    request(server)
      .post(`/tindev/devs/${create_dev._id}/dislikes`)
      .set({ user_id: 'user_not_exist' })
      .expect(400);

    await Dev.deleteMany({});
  }, 30000);

  it(`shouldn't be able to dislike a developer because there is no developer!`, async () => {
    const request_create_dev = await request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikesousa',
      })
      .expect(200);

    const create_dev = request_create_dev.body as IDev;

    await request(server)
      .post(`/tindev/devs/dev_not_exist/dislikes`)
      .set({ user_id: create_dev._id })
      .expect(400);

    await Dev.deleteMany({});
  }, 30000);
});
