import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev from '@modules/tindev/devs/infra/mongoose/entities/Dev';

describe('LikeDevService', () => {
  beforeEach(async () => {
    mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterEach(async () => {
    await Dev.deleteMany({});
    await mongoose.connection.close();
  });

  it('should be able to create a new dev!', async () => {
    const response_create_1 = await request(server).post('/tindev/devs').send({
      username: 'eikesousa',
    });

    const response_create_2 = await request(server).post('/tindev/devs').send({
      username: 'eikeufs',
    });

    const response_show = await request(server)
      .get('/tindev/devs')
      .set({ user_id: response_create_1.body.id })
      .send({
        dev_id: response_create_2.body.id,
      });

    console.log(response_show.body);

    // expect(response_show.body[0]).toHaveProperty(response_create_2.body.id);
  });
});
