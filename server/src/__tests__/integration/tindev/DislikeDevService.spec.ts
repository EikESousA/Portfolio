import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev from '@modules/tindev/devs/infra/mongoose/entities/Dev';

describe('DislikeDevService', () => {
  beforeEach(async () => {
    mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterEach(async () => {
    await Dev.deleteMany({});
    await mongoose.connection.close();
  });

  it('should be able to create a new dev!', async () => {
    const response = await request(server).post('/tindev/devs').send({
      username: 'eikesousa',
    });

    expect(response.body).toHaveProperty('_id');
  });
});
