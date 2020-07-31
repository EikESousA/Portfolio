import { container } from 'tsyringe';

import IAPIGithubProvider from '@modules/devradar/devs/providers/APIGithubProvider/models/IAPIGithubProvider';
import AxiosAPIGithubProvider from '@modules/devradar/devs/providers/APIGithubProvider/implementations/AxiosAPIGithubProvider';

container.registerSingleton<IAPIGithubProvider>(
  'DevRadar_APIGithubProvider',
  AxiosAPIGithubProvider,
);
