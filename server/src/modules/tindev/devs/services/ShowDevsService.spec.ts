import FakeDevsRepository from '@modules/tindev/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIRepository from '@modules/tindev/devs/repositories/fakes/FakeAPIRepository';
import CreateDevService from '@modules/tindev/devs/services/CreateDevService';
import DislikeDevService from '@modules/tindev/devs/services/DislikeDevService';
import LikeDevService from '@modules/tindev/devs/services/LikeDevService';
import ShowDevsService from '@modules/tindev/devs/services/ShowDevsService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIRepository: FakeAPIRepository;
let createDevService: CreateDevService;
let dislikeDevService: DislikeDevService;
let likeDevService: LikeDevService;
let showDevsService: ShowDevsService;

describe('LikeDevService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIRepository = new FakeAPIRepository();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIRepository,
    );
    dislikeDevService = new DislikeDevService(fakeDevsRepository);
    likeDevService = new LikeDevService(fakeDevsRepository);
    showDevsService = new ShowDevsService(fakeDevsRepository);
  });

  it('should be able to show all developers without likes and dislikes!', async () => {
    fakeAPIRepository.create('user_test_1');
    const user_1 = await createDevService.execute('user_test_1');

    fakeAPIRepository.create('user_test_2');
    const user_2 = await createDevService.execute('user_test_2');

    fakeAPIRepository.create('user_test_3');
    const user_3 = await createDevService.execute('user_test_3');

    fakeAPIRepository.create('user_test_4');
    const user_4 = await createDevService.execute('user_test_4');

    await likeDevService.execute(user_1.id, user_2.id);

    await dislikeDevService.execute(user_1.id, user_3.id);

    const devs = await showDevsService.execute(user_1.id);

    expect(devs).toEqual([user_4]);
  });

  it(`should not be able to show all the developers without liking or not why there is no user!`, async () => {
    await expect(await showDevsService.execute('user_not_exist')).toEqual([]);
  });
});
