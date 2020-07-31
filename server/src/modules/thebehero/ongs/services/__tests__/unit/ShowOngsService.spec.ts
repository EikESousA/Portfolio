import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';
import ShowOngsService from '@modules/thebehero/ongs/services/ShowOngsService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let createOngService: CreateOngService;
let showOngsService: ShowOngsService;

describe('ShowOngsService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
    showOngsService = new ShowOngsService(fakeOngsRepository);
  });

  it('should be able to show all ongs!', async () => {
    const ong_1 = await createOngService.execute({
      name: 'ong_test_1',
      email: 'email_test_1',
      whatsapp: 11222223333,
      city: 'city_test_1',
      uf: 'uf_test_1',
    });

    const ong_2 = await createOngService.execute({
      name: 'ong_test_2',
      email: 'email_test_2',
      whatsapp: 44555556666,
      city: 'city_test_2',
      uf: 'uf_test_2',
    });

    const ongs = await showOngsService.execute();

    expect(ongs).toEqual([ong_1, ong_2]);
  });
});
