import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';
import FakeIncidentsRepository from '@modules/thebehero/incidents/repositories/fakes/FakeIncidentsRepository';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';
import CreateIncidentService from '@modules/thebehero/incidents/services/CreateIncidentService';
import ShowIncidentsService from '@modules/thebehero/incidents/services/ShowIncidentsService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let fakeIncidentsRepository: FakeIncidentsRepository;

let createOngService: CreateOngService;
let createIncidentService: CreateIncidentService;
let showIncidentsService: ShowIncidentsService;

describe('ShowIncidentsService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    fakeIncidentsRepository = new FakeIncidentsRepository();

    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
    createIncidentService = new CreateIncidentService(fakeIncidentsRepository);
    showIncidentsService = new ShowIncidentsService(fakeIncidentsRepository);
  });

  it('should be able to show all incidents on the page!', async () => {
    const ong = await createOngService.execute({
      name: 'ong_test',
      email: 'email_test',
      whatsapp: '11222223333',
      city: 'city_test',
      uf: 'uf_test',
    });

    await createIncidentService.execute({
      title: 'title_test_1',
      description: 'description_test_1',
      value: 11,
      ong_id: String(ong.id),
    });

    await createIncidentService.execute({
      title: 'title_test_2',
      description: 'description_test_2',
      value: 22,
      ong_id: String(ong.id),
    });

    await createIncidentService.execute({
      title: 'title_test_3',
      description: 'description_test_3',
      value: 33,
      ong_id: String(ong.id),
    });

    await createIncidentService.execute({
      title: 'title_test_4',
      description: 'description_test_4',
      value: 44,
      ong_id: String(ong.id),
    });

    await createIncidentService.execute({
      title: 'title_test_5',
      description: 'description_test_5',
      value: 55,
      ong_id: String(ong.id),
    });

    const incident_6 = await createIncidentService.execute({
      title: 'title_test_6',
      description: 'description_test_6',
      value: 66,
      ong_id: String(ong.id),
    });

    const incident_6_join = {
      id: incident_6.id,
      title: incident_6.title,
      description: incident_6.description,
      value: incident_6.value,
      ong_id: incident_6.ong_id,
      name: `name_${incident_6.title}`,
      email: `email_${incident_6.title}`,
      whatsapp: `whatsapp_${incident_6.title}`,
      city: `city_${incident_6.title}`,
      uf: `uf_${incident_6.title}`,
    };

    const { incidents } = await showIncidentsService.execute({ page: 2 });

    expect(incidents).toEqual([incident_6_join]);
  });
});
