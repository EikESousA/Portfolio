import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import Dev, { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/tindev/devs/dtos/ICreateDevDTO';

class DevsRepository implements IDevsRepository {
  public async findById(dev_id: string): Promise<IDev | undefined> {
    const dev = await Dev.findById(dev_id);
    return dev || undefined;
  }

  public async findAllDevsByUser(
    user_id: string,
    loggedDev: IDev,
  ): Promise<IDev[]> {
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user_id } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    }).sort({ _id: -1 });
    return users;
  }

  public async findUser(username: string): Promise<IDev | undefined> {
    const user = await Dev.findOne({ user: username });
    return user || undefined;
  }

  public async create(data: ICreateDevDTO): Promise<IDev> {
    const { name, user, bio, avatar } = data;
    const dev = await Dev.create({
      name,
      user,
      bio,
      avatar,
    });
    return dev;
  }

  public async save(dev: IDev): Promise<IDev> {
    await dev.save();
    return dev;
  }
}

export default DevsRepository;
