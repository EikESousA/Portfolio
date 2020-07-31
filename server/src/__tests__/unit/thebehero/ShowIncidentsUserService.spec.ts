import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';
import FakeIncidentsRepository from '@modules/thebehero/incidents/repositories/fakes/FakeIncidentsRepository';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';
import CreateIncidentService from '@modules/thebehero/incidents/services/CreateIncidentService';
import ShowIncidentsUserService from '@modules/thebehero/incidents/services/ShowIncidentsUserService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let fakeIncidentsRepository: FakeIncidentsRepository;

let createOngService: CreateOngService;
let createIncidentService: CreateIncidentService;
let showIncidentsUserService: ShowIncidentsUserService;

describe('ShowIncidentsUserService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    fakeIncidentsRepository = new FakeIncidentsRepository();

    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
    createIncidentService = new CreateIncidentService(fakeIncidentsRepository);
    showIncidentsUserService = new ShowIncidentsUserService(
      fakeIncidentsRepository,
    );
  });

  it('should be able to show all user incidents!', async () => {
    const ong_1 = await createOngService.execute({
      name: 'ong_test_1',
      email: 'email_test_1',
      whatsapp: '11222223333',
      city: 'city_test_1',
      uf: 'uf_test_1',
    });

    const ong_2 = await createOngService.execute({
      name: 'ong_test_2',
      email: 'email_test_2',
      whatsapp: '44555556666',
      city: 'city_test_2',
      uf: 'uf_test_2',
    });

    const incident_1 = await createIncidentService.execute({
      title: 'title_test_1',
      description: 'description_test_1',
      value: 11,
      ong_id: String(ong_1.id),
    });

    const incident_2 = await createIncidentService.execute({
      title: 'title_test_2',
      description: 'description_test_2',
      value: 22,
      ong_id: String(ong_1.id),
    });

    await createIncidentService.execute({
      title: 'title_test_3',
      description: 'description_test_3',
      value: 33,
      ong_id: String(ong_2.id),
    });

    const incidents = await showIncidentsUserService.execute({
      ong_id: String(ong_1.id),
    });

    expect(incidents).toEqual([incident_1, incident_2]);
  });
});
