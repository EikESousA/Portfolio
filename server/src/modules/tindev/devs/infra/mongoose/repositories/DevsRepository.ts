import IDevsRepository from '@modules/tindev/devs/repositories/IDevsRepository';
import Dev, { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/tindev/devs/dtos/ICreateDevDTO';

export default class DevsRepository implements IDevsRepository {
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

  public async findById(dev_id: string): Promise<IDev | undefined> {
    const dev = await Dev.findById(dev_id);
    return dev || undefined;
  }

  public async findByUser(user: string): Promise<IDev | undefined> {
    const userFind = await Dev.findOne({ user });
    return userFind || undefined;
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
}
