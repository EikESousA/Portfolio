import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import Dev, { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/tindev/devs/dtos/ICreateDevDTO';

export default class FakeDevsRepository implements IDevsRepository {
  private devs: IDev[] = [];

  public async create(data: ICreateDevDTO): Promise<IDev> {
    const dev = new Dev();
    Object.assign(dev, data);
    this.devs.push(dev);
    return dev;
  }

  public async save(dev: IDev): Promise<IDev> {
    const findIndex = this.devs.findIndex(findDev => findDev.id === dev.id);
    this.devs[findIndex] = dev;
    return dev;
  }

  public async findById(dev_id: string): Promise<IDev | undefined> {
    const dev = this.devs.find(findDev => String(findDev.id) === dev_id);
    return dev || undefined;
  }

  public async findByUser(user: string): Promise<IDev | undefined> {
    const dev = this.devs.find(findDev => String(findDev.user) === user);
    return dev || undefined;
  }

  public async findAllDevsByUser(
    user_id: string,
    _loggedDev: IDev,
  ): Promise<IDev[]> {
    const devsAll = this.devs.filter(
      findDevs => String(findDevs.id) !== user_id,
    );
    const devsLikes = devsAll.filter(
      findDevs => !findDevs.likes.includes(user_id),
    );
    const devs = devsLikes.filter(
      findDevs => !findDevs.dislikes.includes(user_id),
    );
    return devs;
  }
}
