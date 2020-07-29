import FakeDevsRepository from '@modules/devradar/devs/repositories/fakes/FakeDevsRepository';
import FakeAPIRepository from '@modules/devradar/devs/repositories/fakes/FakeAPIRepository';

import CreateDevService from '@modules/devradar/devs/services/CreateDevService';
import ShowDevsService from '@modules/devradar/devs/services/ShowDevsService';

let fakeDevsRepository: FakeDevsRepository;
let fakeAPIRepository: FakeAPIRepository;
let createDevService: CreateDevService;
let showDevsService: ShowDevsService;

describe('ShowDevsService', () => {
  beforeEach(() => {
    fakeDevsRepository = new FakeDevsRepository();
    fakeAPIRepository = new FakeAPIRepository();
    createDevService = new CreateDevService(
      fakeDevsRepository,
      fakeAPIRepository,
    );
    showDevsService = new ShowDevsService(fakeDevsRepository);
  });

  it('should be able to show all developers!', async () => {
    fakeAPIRepository.create('user_test_1');
    const user_1 = await createDevService.execute({
      github_username: 'user_test_1',
      techs: 'tech_test_1, tech_test_2',
      latitude: -10.0,
      longitude: -10.0,
    });

    fakeAPIRepository.create('user_test_2');
    const user_2 = await createDevService.execute({
      github_username: 'user_test_2',
      techs: 'tech_test_1',
      latitude: -11.0,
      longitude: -11.0,
    });

    fakeAPIRepository.create('user_test_3');
    const user_3 = await createDevService.execute({
      github_username: 'user_test_3',
      techs: 'tech_test_2',
      latitude: -50.0,
      longitude: -10.0,
    });

    const devs = await showDevsService.execute();

    expect(devs).toEqual([user_1, user_2, user_3]);
  });
});
