import { container } from 'tsyringe';

import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import DevsRepository from '@modules/tindev/devs/infra/mongoose/repositories/DevsRepository';

import IAPIRepository from '@modules/tindev/devs/repositories/IAPIRepository';
import APIRepository from '@modules/tindev/devs/infra/axios/repositories/APIRepository';

container.registerSingleton<IDevsRepository>(
  'TinDev_DevsRepository',
  DevsRepository,
);

container.registerSingleton<IAPIRepository>(
  'TinDev_APIRepository',
  APIRepository,
);
