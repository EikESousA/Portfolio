import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev from '@modules/tindev/devs/infra/mongoose/entities/Dev';

describe('ShowDevService', () => {
  beforeEach(async () => {
    mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterEach(async () => {
    await Dev.deleteMany({});
    await mongoose.connection.close();
  });

  it('should be able to show all devs!', async () => {
    jest.setTimeout(30000);
    const response_create_1 = await request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikesousa',
      })
      .then();

    const response_create_2 = await request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikeufs',
      })
      .then();

    const response_show = await request(server)
      .get('/tindev/devs')
      .set('user_id', String(response_create_1.body._id))
      .then();

    expect(response_show.body).toEqual([response_create_2.body]);
  });
});
