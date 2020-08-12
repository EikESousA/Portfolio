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

describe('ShowSpotsService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should show all the spots of the researched technology!', async () => {
    const request_create_user = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user = request_create_user.body as IUser;

    const request_create_spot_1 = await request(server)
      .post('/aircnc/spots')
      .set({ user_id: create_user._id })
      .attach('thumbnail', path.resolve('tmp', '__tests__', 'test.jpg'))
      .field('company', 'rocketseat')
      .field('price', '10')
      .field('techs', 'React, Node')
      .expect(200);

    const create_spot_1 = request_create_spot_1.body as ISpot;

    await request(server)
      .post('/aircnc/spots')
      .set({ user_id: create_user._id })
      .attach('thumbnail', path.resolve('tmp', '__tests__', 'test.jpg'))
      .field('company', 'rocketseat2')
      .field('price', '20')
      .field('techs', 'React')
      .expect(200);

    const request_show_spots = await request(server)
      .get('/aircnc/spots')
      .query({ tech: 'Node' })
      .expect(200);

    const show_spots = request_show_spots.body as ISpot[];

    expect(show_spots).toEqual([create_spot_1]);

    await Spot.deleteMany({});
    await User.deleteMany({});
  }, 30000);
});
