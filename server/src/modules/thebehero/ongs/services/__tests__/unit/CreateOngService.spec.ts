import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let createOngService: CreateOngService;

describe('CreateOngService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
  });

  it('should be able to create a new ong!', async () => {
    const ong = await createOngService.execute({
      name: 'ong_test',
      email: 'email_test',
      whatsapp: 11222223333,
      city: 'city_test',
      uf: 'uf_test',
    });

    expect(ong).toHaveProperty('id');
  });
});
