import { IDev } from '@modules/devradar/devs/infra/mongoose/entities/Dev';
import ICreateDevDTO from '@modules/devradar/devs/dtos/ICreateDevDTO';

export interface ISearchTechsLocation {
  latitude: number;
  longitude: number;
  techsArray: string[];
}

export default interface IDevRepository {
  create(data: ICreateDevDTO): Promise<IDev>;
  findByGithubUsername(github_username: string): Promise<IDev | undefined>;
  findAllDevs(): Promise<IDev[]>;
  findByTechsLocation(data: ISearchTechsLocation): Promise<IDev[]>;
}
