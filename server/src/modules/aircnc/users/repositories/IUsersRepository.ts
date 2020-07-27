import { IUser } from '@modules/aircnc/users/infra/mongoose/entities/User';

export default interface IUsersRepository {
  create(email: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findByUserId(user_id: string): Promise<IUser | undefined>;
}
