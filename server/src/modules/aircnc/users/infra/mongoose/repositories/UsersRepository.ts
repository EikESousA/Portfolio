import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';
import User, {
  IUser,
} from '@modules/aircnc/users/infra/mongoose/entities/User';

export default class UsersRepository implements IUsersRepository {
  public async create(email: string): Promise<IUser> {
    const user = await User.create({ email });
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await User.findOne({ email });
    return user || undefined;
  }

  public async findByUserId(user_id: string): Promise<IUser | undefined> {
    try {
      const user = await User.findOne({ _id: user_id });
      return user || undefined;
    } catch (err) {
      return undefined;
    }
  }
}
