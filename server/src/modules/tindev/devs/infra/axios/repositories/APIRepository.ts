import IAPIRepository, {
  IAPIResponse,
} from '@modules/tindev/devs/repositories/IAPIRepository';
import axios from 'axios';

export default class APIRepository implements IAPIRepository {
  public async get(github_username: string): Promise<IAPIResponse | undefined> {
    try {
      const apiResponse = await axios.get<IAPIResponse>(
        `http://api.github.com/users/${github_username.toLowerCase()}`,
      );
      const api: IAPIResponse = {
        name: apiResponse.data.name,
        avatar_url: apiResponse.data.avatar_url,
        bio: apiResponse.data.avatar_url,
        login: apiResponse.data.bio,
      };
      return api;
    } catch (err) {
      return undefined;
    }
  }
}
