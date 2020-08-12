import request from 'supertest';
import mongoose from 'mongoose';

import server from '@shared/infra/http/app';
import mongooseConfig from '@config/mongoose';

import User, {
  IUser,
} from '@modules/aircnc/users/infra/mongoose/entities/User';

describe('CreateSpotService', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.uri_test, mongooseConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a new user!', async () => {
    const request_create_user = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user = request_create_user.body as IUser;

    expect(create_user).toHaveProperty('_id');

    await User.deleteMany({});
  }, 30000);

  it('should be able to authenticate an existing user!', async () => {
    await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const request_create_user_2 = await request(server)
      .post('/aircnc/sessions')
      .send({
        email: 'eike.sousa@hotmail.com',
      })
      .expect(200);

    const create_user_2 = request_create_user_2.body as IUser;

    expect(create_user_2).toHaveProperty('_id');

    await User.deleteMany({});
  }, 30000);
});
