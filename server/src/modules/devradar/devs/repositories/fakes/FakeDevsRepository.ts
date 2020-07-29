import IDevsRepository, {
  ISearchTechsLocation,
} from '@modules/devradar/devs/repositories/IDevsRepository';
import Dev, { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/devradar/devs/dtos/ICreateDevDTO';

export default class FakeDevsRepository implements IDevsRepository {
  private devs: IDev[] = [];

  public async create(data: ICreateDevDTO): Promise<IDev> {
    const dev = new Dev();
    Object.assign(dev, data);
    this.devs.push(dev);
    return dev;
  }

  public async findByGithubUsername(
    github_username: string,
  ): Promise<IDev | undefined> {
    const dev = this.devs.find(
      findDev => String(findDev.github_username) === github_username,
    );
    return dev || undefined;
  }

  public async findAllDevs(): Promise<IDev[]> {
    return this.devs;
  }

  public async findByTechsLocation(
    data: ISearchTechsLocation,
  ): Promise<IDev[]> {
    const { latitude, longitude, techsArray } = data;

    const devsTechs = this.includesArray(techsArray);

    const devsLocation = this.nearLocation(devsTechs, longitude, latitude);

    return devsLocation;
  }

  private includesArray(techsArray: string[]): IDev[] {
    let dev = 0;
    let devTech = 0;
    let tech = 0;
    const devsTechs: IDev[] = [];
    let find = false;

    for (dev = 0; dev < this.devs.length; dev += 1) {
      find = false;
      for (
        devTech = 0;
        devTech < this.devs[dev].techs.length && !find;
        devTech += 1
      ) {
        for (tech = 0; tech < techsArray.length && !find; tech += 1) {
          if (this.devs[dev].techs[devTech] === techsArray[tech]) {
            devsTechs.push(this.devs[dev]);
            find = true;
          }
        }
      }
    }
    return devsTechs;
  }

  private nearLocation(
    devsTechs: IDev[],
    longitude: number,
    latitude: number,
  ): IDev[] {
    let dev = 0;
    const devsLocation: IDev[] = [];

    for (dev = 0; dev < devsTechs.length; dev += 1) {
      if (
        (devsTechs[dev].location.coordinates[0] >= longitude - 5 ||
          devsTechs[dev].location.coordinates[0] <= longitude + 5) &&
        (devsTechs[dev].location.coordinates[1] >= latitude - 5 ||
          devsTechs[dev].location.coordinates[1] <= latitude + 5)
      ) {
        devsLocation.push(devsTechs[dev]);
      }
    }
    return devsLocation;
  }
}
