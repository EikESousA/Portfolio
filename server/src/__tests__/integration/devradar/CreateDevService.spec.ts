import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev, { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';

describe('CreateDevService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a new dev!', async () => {
    const request_create_dev = await request(server)
      .post('/devradar/devs')
      .send({
        github_username: 'eikesousa',
        latitude: -10.9431239,
        longitude: -37.0630437,
        techs: 'Node.js, React',
      })
      .expect(200);

    const create_dev = request_create_dev.body as IDev;

    expect(create_dev).toHaveProperty('_id');

    await Dev.deleteMany({});
  }, 30000);

  it('should be able to authenticate an existing dev!', async () => {
    const request_create_dev_1 = await request(server)
      .post('/devradar/devs')
      .send({
        github_username: 'eikesousa',
        latitude: -10.9431239,
        longitude: -37.0630437,
        techs: 'Node.js, React',
      })
      .expect(200);

    const create_dev_1 = request_create_dev_1.body as IDev;

    const request_create_dev_2 = await request(server)
      .post('/devradar/devs')
      .send({
        github_username: 'eikesousa',
        latitude: -10.9431239,
        longitude: -37.0630437,
        techs: 'Node.js, React',
      })
      .expect(200);

    const create_dev_2 = request_create_dev_2.body as IDev;

    expect(create_dev_1.github_username).toEqual(create_dev_2.github_username);

    await Dev.deleteMany({});
  }, 30000);

  it(`shouldn't be able to create a dev that doesn't have a github!`, async () => {
    await request(server)
      .post('/devradar/devs')
      .send({
        github_username: 'github_not_exist',
      })
      .expect(400);
  }, 30000);
});
