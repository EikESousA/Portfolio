import { container } from 'tsyringe';

import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import DevsRepository from '@modules/tindev/devs/infra/mongoose/repositories/DevsRepository';

container.registerSingleton<IDevsRepository>('DevsRepository', DevsRepository);
