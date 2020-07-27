import FakeUsersRepository from '@modules/aircnc/users/repositories/fakes/FakeUsersRepository';
import FakeSpotsRepository from '@modules/aircnc/spots/repositories/fakes/FakeSpotsRepository';

import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';
import CreateSpotService from '@modules/aircnc/spots/services/CreateSpotService';
import ShowDashboardService from '@modules/aircnc/spots/services/ShowDashboardService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSpotsRepository: FakeSpotsRepository;

let authenticateUserService: AuthenticateUserService;
let createSpotService: CreateSpotService;
let showDashboardService: ShowDashboardService;

describe('ShowDashboardService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpotsRepository = new FakeSpotsRepository();

    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
    createSpotService = new CreateSpotService(
      fakeUsersRepository,
      fakeSpotsRepository,
    );
    showDashboardService = new ShowDashboardService(fakeSpotsRepository);
  });

  it('must show all user spots!', async () => {
    const user = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    const spot_1 = await createSpotService.execute({
      user: user.id,
      thumbnail: 'teste_imagem_1',
      company: 'teste_company_1',
      techs: ['tech_1_1', 'tech_1_2'],
      price: 1,
    });

    const spot_2 = await createSpotService.execute({
      user: user.id,
      thumbnail: 'teste_imagem_2',
      company: 'teste_company_2',
      techs: ['tech_2_1', 'tech_2_2'],
      price: 68,
    });

    const dashboard = await showDashboardService.execute(user.id);

    expect(dashboard).toEqual([spot_1, spot_2]);
  });
});
