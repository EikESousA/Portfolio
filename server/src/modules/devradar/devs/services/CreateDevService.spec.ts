import AppError from '@shared/errors/AppError';

import FakeDevsRepository from '@modules/devradar/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIRepository from '@modules/devradar/devs/repositories/fakes/FakeAPIRepository';

import CreateDevService from '@modules/devradar/devs/services/CreateDevService';

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

    const user = await createDevService.execute({
      github_username: 'user_test',
      techs: 'tech_test_1, tech_test_2',
      latitude: -10.0,
      longitude: -10.0,
    });
    expect(user).toHaveProperty('id');
  });

  it('should be able to authenticate an existing dev!', async () => {
    fakeAPIRepository.create('user_test_1');
    const user_1 = await createDevService.execute({
      github_username: 'user_test_1',
      techs: 'tech_test_1, tech_test_2',
      latitude: -10.0,
      longitude: -10.0,
    });

    fakeAPIRepository.create('user_test_1');
    const user_2 = await createDevService.execute({
      github_username: 'user_test_1',
      techs: 'tech_test_1, tech_test_2',
      latitude: -10.0,
      longitude: -10.0,
    });

    expect(String(user_2.avatar_url)).toEqual(String(user_1.avatar_url));
  });

  it(`shouldn't be able to create a dev that doesn't have a github!`, async () => {
    await expect(
      createDevService.execute({
        github_username: 'dev_not_exist',
        techs: 'tech_test_1, tech_test_2',
        latitude: -10.0,
        longitude: -10.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
