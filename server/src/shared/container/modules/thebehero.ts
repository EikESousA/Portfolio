import { container } from 'tsyringe';

import IOngsRepository from '@modules/thebehero/ongs/repositories/IOngsRepository';
import OngsRepository from '@modules/thebehero/ongs/infra/knex/repositories/OngsRepository';

import IIncidentsRepository from '@modules/thebehero/incidents/repositories/IIncidentsRepository';
import IncidentsRepository from '@modules/thebehero/incidents/infra/knex/repositories/IncidentsRepository';

container.registerSingleton<IOngsRepository>(
  'TheBeHero_OngsRepository',
  OngsRepository,
);

container.registerSingleton<IIncidentsRepository>(
  'TheBeHero_IncidentsRepository',
  IncidentsRepository,
);
