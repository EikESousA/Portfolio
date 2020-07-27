import { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/tindev/devs/dtos/ICreateDevDTO';

export default interface IDevRepository {
  findById(dev_id: string): Promise<IDev | undefined>;
  findAllDevsByUser(user_id: string, loggedDev: IDev): Promise<IDev[]>;
  findUser(user: string): Promise<IDev | undefined>;
  create(data: ICreateDevDTO): Promise<IDev>;
  save(dev: IDev): Promise<IDev>;
}
