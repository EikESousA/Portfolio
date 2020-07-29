import FakeDevsRepository from '@modules/devradar/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIRepository from '@modules/devradar/devs/repositories/fakes/FakeAPIRepository';

import CreateDevService from '@modules/devradar/devs/services/CreateDevService';
import SearchDevService from '@modules/devradar/devs/services/SearchDevService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIRepository: FakeAPIRepository;
let createDevService: CreateDevService;
let searchDevService: SearchDevService;

describe('SearchDevService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIRepository = new FakeAPIRepository();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIRepository,
    );
    searchDevService = new SearchDevService(fakeDevsRepository);
  });

  it('should be able to show all the developers nearby and with the technology!', async () => {
    fakeAPIRepository.create('user_test_1');
    const user_1 = await createDevService.execute({
      github_username: 'user_test_1',
      techs: 'tech_test_1, tech_test_2',
      latitude: 10.0,
      longitude: 10.0,
    });

    fakeAPIRepository.create('user_test_2');
    const user_2 = await createDevService.execute({
      github_username: 'user_test_2',
      techs: 'tech_test_1',
      latitude: 12.0,
      longitude: 12.0,
    });

    fakeAPIRepository.create('user_test_3');
    await createDevService.execute({
      github_username: 'user_test_3',
      techs: 'tech_test_2',
      latitude: 50.0,
      longitude: 10.0,
    });

    const devs = await searchDevService.execute({
      latitude: 11.0,
      longitude: 11.0,
      techs: 'tech_test_1',
    });

    expect(devs).toEqual([user_1, user_2]);
  });
});
