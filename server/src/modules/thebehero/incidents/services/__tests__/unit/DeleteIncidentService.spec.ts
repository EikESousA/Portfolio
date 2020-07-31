import AppError from '@shared/errors/AppError';

import FakeOngsRepository from '@modules/thebehero/ongs/repositories/fakes/FakeOngsRepository';
import FakeGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/fakes/FakeGenerateUniqueIdProvider';
import FakeIncidentsRepository from '@modules/thebehero/incidents/repositories/fakes/FakeIncidentsRepository';

import CreateOngService from '@modules/thebehero/ongs/services/CreateOngService';
import CreateIncidentService from '@modules/thebehero/incidents/services/CreateIncidentService';
import DeleteIncidentService from '@modules/thebehero/incidents/services/DeleteIncidentService';
import ShowIncidentsUserService from '@modules/thebehero/incidents/services/ShowIncidentsUserService';

let fakeOngsRepository: FakeOngsRepository;
let fakeGenerateUniqueIdProvider: FakeGenerateUniqueIdProvider;
let fakeIncidentsRepository: FakeIncidentsRepository;

let createOngService: CreateOngService;
let createIncidentService: CreateIncidentService;
let deleteIncidentService: DeleteIncidentService;
let showIncidentsUserService: ShowIncidentsUserService;

describe('DeleteIncidentUserService', () => {
  beforeEach(() => {
    fakeOngsRepository = new FakeOngsRepository();
    fakeGenerateUniqueIdProvider = new FakeGenerateUniqueIdProvider();
    fakeIncidentsRepository = new FakeIncidentsRepository();

    createOngService = new CreateOngService(
      fakeOngsRepository,
      fakeGenerateUniqueIdProvider,
    );
    createIncidentService = new CreateIncidentService(fakeIncidentsRepository);
    deleteIncidentService = new DeleteIncidentService(fakeIncidentsRepository);
    showIncidentsUserService = new ShowIncidentsUserService(
      fakeIncidentsRepository,
    );
  });

  it('should be able to delete an incident!', async () => {
    const ong = await createOngService.execute({
      name: 'ong_test',
      email: 'email_test',
      whatsapp: 11222223333,
      city: 'city_test',
      uf: 'uf_test',
    });

    const incident_1 = await createIncidentService.execute({
      title: 'title_test_1',
      description: 'description_test_1',
      value: 11,
      ong_id: String(ong.id),
    });

    const incident_2 = await createIncidentService.execute({
      title: 'title_test_2',
      description: 'description_test_2',
      value: 22,
      ong_id: String(ong.id),
    });

    await deleteIncidentService.execute({
      incident_id: incident_1.id,
      ong_id: String(ong.id),
    });

    const incidents = await showIncidentsUserService.execute({
      ong_id: String(ong.id),
    });

    expect(incidents).toEqual([incident_2]);
  });

  it('should not be able to delete an incident because you are not authenticated!', async () => {
    const ong = await createOngService.execute({
      name: 'ong_test',
      email: 'email_test',
      whatsapp: 11222223333,
      city: 'city_test',
      uf: 'uf_test',
    });

    const incident = await createIncidentService.execute({
      title: 'title_test',
      description: 'description_test',
      value: 11,
      ong_id: String(ong.id),
    });

    await expect(
      deleteIncidentService.execute({
        incident_id: incident.id,
        ong_id: 'ong-not-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete an incident because the incident does not exist!', async () => {
    await expect(
      deleteIncidentService.execute({
        incident_id: 'incident-not-exist',
        ong_id: 'ong-not-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
