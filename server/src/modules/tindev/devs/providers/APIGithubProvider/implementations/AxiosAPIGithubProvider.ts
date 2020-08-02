import axios from 'axios';

import IAPIGithubProvider, {
  IAPIResponse,
} from '@modules/tindev/devs/providers/APIGithubProvider/models/IAPIGithubProvider';

export default class AxiosAPIGithubProvider implements IAPIGithubProvider {
  public async get(github_username: string): Promise<IAPIResponse | undefined> {
    try {
      const apiResponse = await axios.get<IAPIResponse>(
        `http://api.github.com/users/${github_username.toLowerCase()}`,
      );
      const api: IAPIResponse = {
        name: apiResponse.data.name,
        avatar_url: apiResponse.data.avatar_url,
        bio: apiResponse.data.bio,
        login: apiResponse.data.login,
      };
      return api;
    } catch (err) {
      return undefined;
    }
  }
}
