import { container } from 'tsyringe';

import IAPIGithubProvider from '@modules/tindev/devs/providers/APIGithubProvider/models/IAPIGithubProvider';
import AxiosAPIGithubProvider from '@modules/tindev/devs/providers/APIGithubProvider/implementations/AxiosAPIGithubProvider';

container.registerSingleton<IAPIGithubProvider>(
  'TinDev_APIGithubProvider',
  AxiosAPIGithubProvider,
);
