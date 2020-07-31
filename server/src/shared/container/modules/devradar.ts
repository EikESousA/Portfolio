import { container } from 'tsyringe';

import IDevsRepository from '@modules/devradar/devs/repositories/IDevsRepository';
import DevsRepository from '@modules/devradar/devs/infra/mongoose/repositories/DevsRepository';

container.registerSingleton<IDevsRepository>(
  'DevRadar_DevsRepository',
  DevsRepository,
);
