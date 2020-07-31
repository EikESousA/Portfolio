import AppError from '@shared/errors/AppError';

import FakeDevsRepository from '@modules/tindev/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIGithubProvider from '@modules/tindev/devs/providers/APIGithubProvider/fakes/FakeAPIGithubProvider';

import CreateDevService from '@modules/tindev/devs/services/CreateDevService';
import DislikeDevService from '@modules/tindev/devs/services/DislikeDevService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIGithubProvider: FakeAPIGithubProvider;
let createDevService: CreateDevService;
let dislikeDevService: DislikeDevService;

describe('DislikeDevService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIGithubProvider = new FakeAPIGithubProvider();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIGithubProvider,
    );
    dislikeDevService = new DislikeDevService(fakeDevsRepository);
  });

  it('should be able to give a developer dislike!', async () => {
    fakeAPIGithubProvider.create('user_test_1');
    const user_1 = await createDevService.execute('user_test_1');

    fakeAPIGithubProvider.create('user_test_2');
    const user_2 = await createDevService.execute('user_test_2');

    await dislikeDevService.execute({ dev_id: user_2.id, user_id: user_1.id });

    expect(String(user_1.dislikes[0])).toEqual(String(user_2.id));
  });

  it(`shouldn't be able to dislike a developer because there is no user!`, async () => {
    fakeAPIGithubProvider.create('user_test');
    const user = await createDevService.execute('user_test');

    await expect(
      dislikeDevService.execute({ dev_id: user.id, user_id: 'user_not_exist' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`shouldn't be able to dislike a developer because there is no developer!`, async () => {
    fakeAPIGithubProvider.create('user_test');
    const user = await createDevService.execute('user_test');

    await expect(
      dislikeDevService.execute({ dev_id: 'dev_not_exist', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
