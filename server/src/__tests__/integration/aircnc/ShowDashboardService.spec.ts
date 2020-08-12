import request from 'supertest';
import mongoose from 'mongoose';
import path from 'path';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import User, {
  IUser,
} from '@modules/aircnc/users/infra/mongoose/entities/User';

import Spot, {
  ISpot,
} from '@modules/aircnc/spots/infra/mongoose/entities/Spot';

describe('CreateSpotService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should show all user spots!', async () => {
    const request_create_user_1 = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user_1 = request_create_user_1.body as IUser;

    const request_create_user_2 = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@gmail.com',
      })
      .expect(200);

    const create_user_2 = request_create_user_2.body as IUser;

    await request(server)
      .post('/aircnc/spots')
      .set({ user_id: create_user_1._id })
      .attach('thumbnail', path.resolve('tmp', '__tests__', 'test.jpg'))
      .field('company', 'rocketseat')
      .field('price', '10')
      .field('techs', 'React, Node')
      .expect(200);

    const request_create_spot_2 = await request(server)
      .post('/aircnc/spots')
      .set({ user_id: create_user_2._id })
      .attach('thumbnail', path.resolve('tmp', '__tests__', 'test.jpg'))
      .field('company', 'rocketseat2')
      .field('price', '20')
      .field('techs', 'React')
      .expect(200);

    const create_spot_2 = request_create_spot_2.body as ISpot;

    const request_show_dashboard = await request(server)
      .get('/aircnc/spots/dashboard')
      .set({ user_id: create_user_2._id })
      .expect(200);

    const show_dashboard = request_show_dashboard.body as ISpot[];

    expect(show_dashboard).toEqual([create_spot_2]);

    await Spot.deleteMany({});
    await User.deleteMany({});
  }, 30000);
});
