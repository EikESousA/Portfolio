import FakeUsersRepository from '@modules/aircnc/users/repositories/fakes/FakeUsersRepository';
import FakeSpotsRepository from '@modules/aircnc/spots/repositories/fakes/FakeSpotsRepository';

import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';
import CreateSpotService from '@modules/aircnc/spots/services/CreateSpotService';
import ShowSpotsService from '@modules/aircnc/spots/services/ShowSpotsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSpotsRepository: FakeSpotsRepository;

let authenticateUserService: AuthenticateUserService;
let createSpotService: CreateSpotService;
let showSpotsService: ShowSpotsService;

describe('ShowSpotsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpotsRepository = new FakeSpotsRepository();

    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
    createSpotService = new CreateSpotService(
      fakeUsersRepository,
      fakeSpotsRepository,
    );
    showSpotsService = new ShowSpotsService(fakeSpotsRepository);
  });

  it('should show all the spots of the researched technology!', async () => {
    const user_1 = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    await createSpotService.execute({
      user: user_1.id,
      thumbnail: 'teste_imagem_1',
      company: 'teste_company_1',
      techs: ['tech_1_1', 'tech_1_2'],
      price: 1,
    });

    const spot_2 = await createSpotService.execute({
      user: user_1.id,
      thumbnail: 'teste_imagem_2',
      company: 'teste_company_2',
      techs: ['tech_2_1', 'tech_2_2'],
      price: 68,
    });

    const spot_3 = await createSpotService.execute({
      user: user_1.id,
      thumbnail: 'teste_imagem_2',
      company: 'teste_company_2',
      techs: ['tech_2_1'],
      price: 68,
    });

    const spots = await showSpotsService.execute({ tech: 'tech_2_1' });

    expect(spots).toEqual([spot_2, spot_3]);
  });
});
