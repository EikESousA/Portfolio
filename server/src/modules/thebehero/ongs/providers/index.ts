import { container } from 'tsyringe';

import IGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/models/IGenerateUniqueIdProvider';
import CryptoGenerateUniqueIDProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/implementations/CryptoGenerateUniqueIDProvider';

container.registerSingleton<IGenerateUniqueIdProvider>(
  'TheBeHero_GenerateUniqueIdProvider',
  CryptoGenerateUniqueIDProvider,
);
