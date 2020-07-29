import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';
import User, {
  IUser,
} from '@modules/aircnc/users/infra/mongoose/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async create(email: string): Promise<IUser> {
    const user = new User();
    Object.assign(user, { email });
    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(findUser => String(findUser.email) === email);
    return user || undefined;
  }

  public async findByUserId(user_id: string): Promise<IUser | undefined> {
    const user = this.users.find(findUser => String(findUser.id) === user_id);
    return user || undefined;
  }
}
