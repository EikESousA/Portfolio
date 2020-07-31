import FakeDevsRepository from '@modules/tindev/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIGithubProvider from '@modules/tindev/devs/providers/APIGithubProvider/fakes/FakeAPIGithubProvider';

import CreateDevService from '@modules/tindev/devs/services/CreateDevService';
import DislikeDevService from '@modules/tindev/devs/services/DislikeDevService';
import LikeDevService from '@modules/tindev/devs/services/LikeDevService';
import ShowDevsService from '@modules/tindev/devs/services/ShowDevsService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIGithubProvider: FakeAPIGithubProvider;
let createDevService: CreateDevService;
let dislikeDevService: DislikeDevService;
let likeDevService: LikeDevService;
let showDevsService: ShowDevsService;

describe('ShowDevsService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIGithubProvider = new FakeAPIGithubProvider();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIGithubProvider,
    );
    dislikeDevService = new DislikeDevService(fakeDevsRepository);
    likeDevService = new LikeDevService(fakeDevsRepository);
    showDevsService = new ShowDevsService(fakeDevsRepository);
  });

  it('should be able to show all developers without likes and dislikes!', async () => {
    fakeAPIGithubProvider.create('user_test_1');
    const user_1 = await createDevService.execute('user_test_1');

    fakeAPIGithubProvider.create('user_test_2');
    const user_2 = await createDevService.execute('user_test_2');

    fakeAPIGithubProvider.create('user_test_3');
    const user_3 = await createDevService.execute('user_test_3');

    fakeAPIGithubProvider.create('user_test_4');
    const user_4 = await createDevService.execute('user_test_4');

    await likeDevService.execute({ dev_id: user_1.id, user_id: user_2.id });

    await dislikeDevService.execute({ dev_id: user_1.id, user_id: user_3.id });

    const devs = await showDevsService.execute({ user_id: user_1.id });

    expect(devs).toEqual([user_4]);
  });

  it(`should not be able to show all the developers without liking or not why there is no user!`, async () => {
    await expect(
      await showDevsService.execute({ user_id: 'user_not_exist' }),
    ).toEqual([]);
  });
});
