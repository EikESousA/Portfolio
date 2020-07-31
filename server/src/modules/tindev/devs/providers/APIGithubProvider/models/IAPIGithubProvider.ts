export interface IAPIResponse {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
}

export default interface IAPIGithubProvider {
  get(github_username: string): Promise<IAPIResponse | undefined>;
}
