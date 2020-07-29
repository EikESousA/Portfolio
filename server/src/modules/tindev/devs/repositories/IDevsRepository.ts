import { IDev } from '@modules/tindev/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/tindev/devs/dtos/ICreateDevDTO';

export default interface IDevRepository {
  create(data: ICreateDevDTO): Promise<IDev>;
  save(dev: IDev): Promise<IDev>;
  findById(dev_id: string): Promise<IDev | undefined>;
  findByUser(user: string): Promise<IDev | undefined>;
  findAllDevsByUser(user_id: string, loggedDev: IDev): Promise<IDev[]>;
}
