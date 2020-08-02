import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev from '@modules/tindev/devs/infra/mongoose/entities/Dev';

describe('CreateDevService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterEach(async () => {
    await Dev.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a new dev!', async () => {
    return request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikesousa',
      })
      .then(data => {
        expect(data.body).toHaveProperty('_id');
      });
  });

  it('should be able to authenticate an existing dev!', async () => {
    return request(server)
      .post('/tindev/devs')
      .send({
        username: 'eikesousa',
      })
      .then(data_1 => {
        return request(server)
          .post('/tindev/devs')
          .send({
            username: 'eikesousa',
          })
          .then(data_2 => {
            expect(data_1.body._id).toEqual(data_2.body._id);
          });
      });
  });

  it(`shouldn't be able to create a dev that doesn't have a github!`, async () => {
    return request(server)
      .post('/tindev/devs')
      .send({
        username: 'github_not_exist',
      })
      .then(_data => {
        expect(400);
      });
  });
});
