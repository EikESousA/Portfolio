import AuthenticateUserService from '@modules/aircnc/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/aircnc/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user!', async () => {
    const user = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to authenticate an existing user!', async () => {
    await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    // fakeUsersRepository.LogUsers();

    const user = await authenticateUserService.execute({
      email: 'teste_1@example.com',
    });

    expect(user).toHaveProperty('id');
  });
});
