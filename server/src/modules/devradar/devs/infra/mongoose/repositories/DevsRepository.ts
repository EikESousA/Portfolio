import IDevsRepository, {
  ISearchTechsLocation,
} from '@modules/devradar/devs/repositories/IDevsRepository';
import Dev, { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/devradar/devs/dtos/ICreateDevDTO';

export default class DevsRepository implements IDevsRepository {
  public async create({
    github_username,
    login,
    avatar_url,
    bio,
    techs,
    location,
  }: ICreateDevDTO): Promise<IDev> {
    const dev = await Dev.create({
      login,
      bio,
      avatar_url,
      github_username,
      techs,
      location,
    });
    return dev;
  }

  public async findByGithubUsername(
    github_username: string,
  ): Promise<IDev | undefined> {
    const dev = await Dev.findOne({ github_username });
    return dev || undefined;
  }

  public async findAllDevs(): Promise<IDev[]> {
    const devs = await Dev.find();
    return devs;
  }

  public async findByTechsLocation({
    latitude,
    longitude,
    techsArray,
  }: ISearchTechsLocation): Promise<IDev[]> {
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    return devs;
  }
}
