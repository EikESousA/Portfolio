import { container } from 'tsyringe';

import IDevsRepository from '@modules/devradar/devs/repositories/IDevsRepository';
import DevsRepository from '@modules/devradar/devs/infra/mongoose/repositories/DevsRepository';

import IAPIRepository from '@modules/devradar/devs/repositories/IAPIRepository';
import APIRepository from '@modules/devradar/devs/infra/axios/repositories/APIRepository';

container.registerSingleton<IDevsRepository>(
  'DevRadar_DevsRepository',
  DevsRepository,
);

container.registerSingleton<IAPIRepository>(
  'DevRadar_APIRepository',
  APIRepository,
);
