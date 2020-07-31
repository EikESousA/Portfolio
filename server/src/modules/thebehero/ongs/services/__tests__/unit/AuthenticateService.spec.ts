import AppError from '@shared/errors/AppError';

import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';
import AuthenticateService from '@modules/thebehero/ongs/services/AuthenticateService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let createOngService: CreateOngService;
let authenticateService: AuthenticateService;

describe('AuthenticateService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
    authenticateService = new AuthenticateService(fakeOngsRepository);
  });

  it('should be able to authenticate the ong!', async () => {
    const ong = await createOngService.execute({
      name: 'ong_test',
      email: 'email_test',
      whatsapp: '11222223333',
      city: 'city_test',
      uf: 'uf_test',
    });

    const auth = await authenticateService.execute({ id: String(ong.id) });

    expect(auth).toEqual(ong);
  });

  it('should not be able to authenticate because there is no ong!', async () => {
    await expect(
      authenticateService.execute({ id: String('ong_id-not-exist') }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
