import AppError from '@shared/errors/AppError';

import FakeDevsRepository from '@modules/tindev/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIRepository from '@modules/tindev/devs/repositories/fakes/FakeAPIRepository';
import CreateDevService from '@modules/tindev/devs/services/CreateDevService';
import LikeDevService from '@modules/tindev/devs/services/LikeDevService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIRepository: FakeAPIRepository;
let createDevService: CreateDevService;
let likeDevService: LikeDevService;

describe('LikeDevService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIRepository = new FakeAPIRepository();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIRepository,
    );
    likeDevService = new LikeDevService(fakeDevsRepository);
  });

  it('should be able to give a developer like!', async () => {
    fakeAPIRepository.create('user_test_1');
    const user_1 = await createDevService.execute('user_test_1');

    fakeAPIRepository.create('user_test_2');
    const user_2 = await createDevService.execute('user_test_2');

    await likeDevService.execute(user_2.id, user_1.id);

    expect(String(user_1.likes[0])).toEqual(String(user_2.id));
  });

  it(`shouldn't be able to like a developer because there is no user!`, async () => {
    fakeAPIRepository.create('user_test');
    const user = await createDevService.execute('user_test');

    await expect(
      likeDevService.execute('user_not_exist', user.id),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`shouldn't be able to like a developer because there is no developer!`, async () => {
    fakeAPIRepository.create('user_test');
    const user = await createDevService.execute('user_test');

    await expect(
      likeDevService.execute(user.id, 'user_not_exist'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
