import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';
import FakeIncidentsRepository from '@modules/thebehero/incidents/repositories/fakes/FakeIncidentsRepository';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';
import CreateIncidentService from '@modules/thebehero/incidents/services/CreateIncidentService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let fakeIncidentsRepository: FakeIncidentsRepository;

let createOngService: CreateOngService;
let createIncidentService: CreateIncidentService;

describe('CreateIncidentService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    fakeIncidentsRepository = new FakeIncidentsRepository();

    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
    createIncidentService = new CreateIncidentService(fakeIncidentsRepository);
  });

  it('should be able to create a new incident!', async () => {
    const ong = await createOngService.execute({
      name: 'ong_test',
      email: 'email_test',
      whatsapp: '11222223333',
      city: 'city_test',
      uf: 'uf_test',
    });

    const incident = await createIncidentService.execute({
      title: 'title_test',
      description: 'description_test',
      value: 11,
      ong_id: String(ong.id),
    });

    expect(incident).toHaveProperty('id');
  });
});
