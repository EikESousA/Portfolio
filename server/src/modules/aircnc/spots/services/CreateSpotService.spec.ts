import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/aircnc/users/repositories/fakes/FakeUsersRepository';
import FakeSpotsRepository from '@modules/aircnc/spots/repositories/fakes/FakeSpotsRepository';

import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';
import CreateSpotService from '@modules/aircnc/spots/services/CreateSpotService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSpotsRepository: FakeSpotsRepository;

let authenticateUserService: AuthenticateUserService;
let createSpotService: CreateSpotService;

describe('CreateSpotService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpotsRepository = new FakeSpotsRepository();

    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
    createSpotService = new CreateSpotService(
      fakeUsersRepository,
      fakeSpotsRepository,
    );
  });

  it('must be able to create a new spot!', async () => {
    const user = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    const spot = await createSpotService.execute({
      user: user.id,
      thumbnail: 'teste_imagem_1',
      company: 'teste_company_1',
      techs: ['tech_1_1', 'tech_1_2'],
      price: 1,
    });

    expect(String(spot.user)).toEqual(String(user.id));
  });

  it('must not be able to create a new spot because the user does not exist!', async () => {
    await expect(
      createSpotService.execute({
        user: 'not-exist-user',
        thumbnail: 'teste_imagem_1',
        company: 'teste_company_1',
        techs: ['tech_1_1', 'tech_1_2'],
        price: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
