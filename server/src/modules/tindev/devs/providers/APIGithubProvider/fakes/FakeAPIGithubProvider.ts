import IAPIGithubProvider, {
  IAPIResponse,
} from '@modules/tindev/devs/providers/APIGithubProvider/models/IAPIGithubProvider';

export default class FakeAPIRepository implements IAPIGithubProvider {
  private githubs_fake: IAPIResponse[] = [];

  public create(github_username: string): IAPIResponse {
    const github: IAPIResponse = {
      name: `name_${github_username}`,
      bio: `bio_${github_username}`,
      avatar_url: `avatar_url_${github_username}`,
      login: github_username.toLowerCase(),
    };

    this.githubs_fake.push(github);
    return github;
  }

  public async get(github_username: string): Promise<IAPIResponse | undefined> {
    const github = this.githubs_fake.find(
      findGithub => String(findGithub.login) === github_username,
    );
    return github || undefined;
  }
}
