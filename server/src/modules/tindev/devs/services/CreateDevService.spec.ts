import AppError from '@shared/errors/AppError';

import FakeDevsRepository from '@modules/tindev/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIRepository from '@modules/tindev/devs/repositories/fakes/FakeAPIRepository';

import CreateDevService from '@modules/tindev/devs/services/CreateDevService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIRepository: FakeAPIRepository;
let createDevService: CreateDevService;

describe('CreateDevService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIRepository = new FakeAPIRepository();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIRepository,
    );
  });

  it('should be able to create a new dev!', async () => {
    fakeAPIRepository.create('user_test');

    const user = await createDevService.execute('user_test');

    expect(user).toHaveProperty('id');
  });

  it('should be able to authenticate an existing dev!', async () => {
    fakeAPIRepository.create('user_test');
    const user_1 = await createDevService.execute('user_test');

    const user_2 = await createDevService.execute('user_test');

    expect(String(user_2.id)).toEqual(String(user_1.id));
  });

  it(`shouldn't be able to create a dev that doesn't have a github!`, async () => {
    await expect(
      createDevService.execute('github_not_exist'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
