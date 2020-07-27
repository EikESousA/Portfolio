import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';
import User, {
  IUser,
} from '@modules/aircnc/users/infra/mongoose/entities/User';

class UsersRepository implements IUsersRepository {
  public async create(email: string): Promise<IUser> {
    const user = await User.create({ email });
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await User.findOne({ email });
    return user || undefined;
  }

  public async findByUserId(user_id: string): Promise<IUser | undefined> {
    const user = await User.findById(user_id);
    return user || undefined;
  }
}

export default UsersRepository;