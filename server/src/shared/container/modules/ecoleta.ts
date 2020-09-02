import { container } from 'tsyringe';

import IItemsRepository from '@modules/ecoleta/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/ecoleta/items/infra/knex/repositories/ItemsRepository';

import IPointsRepository from '@modules/ecoleta/points/repositories/IPointsRepository';
import PointsRepository from '@modules/ecoleta/points/infra/knex/repositories/PointsRepository';

container.registerSingleton<IItemsRepository>(
  'TheBeHero_ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IPointsRepository>(
  'TheBeHero_PointsRepository',
  PointsRepository,
);
