export interface IAPIResponse {
  login: string;
  bio: string;
  avatar_url: string;
}

export default interface IAPIRepository {
  get(github_username: string): Promise<IAPIResponse | undefined>;
}
