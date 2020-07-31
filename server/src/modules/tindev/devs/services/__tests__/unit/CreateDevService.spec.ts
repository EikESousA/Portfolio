import AppError from '@shared/errors/AppError';

import FakeDevsRepository from '@modules/tindev/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIGithubProvider from '@modules/tindev/devs/providers/APIGithubProvider/fakes/FakeAPIGithubProvider';

import CreateDevService from '@modules/tindev/devs/services/CreateDevService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIGithubProvider: FakeAPIGithubProvider;
let createDevService: CreateDevService;

describe('CreateDevService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIGithubProvider = new FakeAPIGithubProvider();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIGithubProvider,
    );
  });

  it('should be able to create a new dev!', async () => {
    fakeAPIGithubProvider.create('user_test');

    const user = await createDevService.execute('user_test');

    expect(user).toHaveProperty('id');
  });

  it('should be able to authenticate an existing dev!', async () => {
    fakeAPIGithubProvider.create('user_test');
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
