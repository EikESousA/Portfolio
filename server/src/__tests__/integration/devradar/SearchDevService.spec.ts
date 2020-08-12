import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import Dev, { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';

describe('SearchDevService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to show all developers!', async () => {
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
        github_username: 'eikeufs',
        latitude: -10.9431239,
        longitude: -37.0630437,
        techs: 'React',
      })
      .expect(200);

    const create_dev_2 = request_create_dev_2.body as IDev;

    await request(server)
      .post('/devradar/devs')
      .send({
        github_username: 'diego3g',
        latitude: -27.2107953,
        longitude: -49.6462439,
        techs: 'Node.js',
      })
      .expect(200);

    const request_search_dev = await request(server)
      .get('/devradar/devs/search')
      .query({ latitude: -10.9453516, longitude: -37.0722295, techs: 'React' })
      .expect(200);

    const search_dev = request_search_dev.body as IDev[];

    expect(search_dev).toEqual([create_dev_1, create_dev_2]);

    await Dev.deleteMany({});
  }, 30000);
});
