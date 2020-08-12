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

import Booking, {
  IBooking,
} from '@modules/aircnc/bookings/infra/mongoose/entities/Booking';

describe('CreateSpotService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a new booking!', async () => {
    const request_create_user = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user = request_create_user.body as IUser;

    const request_create_spot = await request(server)
      .post('/aircnc/spots')
      .set({ user_id: create_user._id })
      .attach('thumbnail', path.resolve('tmp', '__tests__', 'test.jpg'))
      .field('company', 'rocketseat')
      .field('price', '10')
      .field('techs', 'React, Node')
      .expect(200);

    const create_spot = request_create_spot.body as ISpot;

    const request_create_booking = await request(server)
      .post(`/aircnc/bookings/${create_spot._id}/creates`)
      .set({ user_id: create_user._id })
      .send({
        date: '24 de outubro',
      })
      .expect(200);

    const create_booking = request_create_booking.body as IBooking;

    expect(String(create_booking.user)).toEqual(String(create_user._id));
    expect(String(create_booking.spot)).toEqual(String(create_spot._id));

    await Booking.deleteMany({});
    await Spot.deleteMany({});
    await User.deleteMany({});
  }, 30000);

  it('should not be able to create a new booking because there is no user!', async () => {
    const request_create_user = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user = request_create_user.body as IUser;

    const request_create_spot = await request(server)
      .post('/aircnc/spots')
      .set({ user_id: create_user._id })
      .attach('thumbnail', path.resolve('tmp', '__tests__', 'test.jpg'))
      .field('company', 'rocketseat')
      .field('price', '10')
      .field('techs', 'React, Node')
      .expect(200);

    const create_spot = request_create_spot.body as ISpot;

    await request(server)
      .post(`/aircnc/bookings/${create_spot._id}/creates`)
      .set({ user_id: 'user-not-exist' })
      .send({
        date: '24 de outubro',
      })
      .expect(400);

    await Booking.deleteMany({});
    await Spot.deleteMany({});
    await User.deleteMany({});
  }, 30000);

  it('should not be able to create a new booking because there is no spot!', async () => {
    const request_create_user = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user = request_create_user.body as IUser;

    await request(server)
      .post(`/aircnc/bookings/spot-not-exist/creates`)
      .set({ user_id: create_user._id })
      .send({
        date: '24 de outubro',
      })
      .expect(400);

    await Booking.deleteMany({});
    await Spot.deleteMany({});
    await User.deleteMany({});
  }, 30000);
});
