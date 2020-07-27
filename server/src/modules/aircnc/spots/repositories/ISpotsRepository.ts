import { ISpot } from '@modules/aircnc/spots/infra/mongoose/entities/Spot';
import ICreateSpotDTO from '@modules/aircnc/spots/dtos/ICreateSpotDTO';

export default interface IUsersRepository {
  create(data: ICreateSpotDTO): Promise<ISpot>;
  findByTech(tech: string): Promise<ISpot[] | undefined>;
  findByUserId(user_id: string): Promise<ISpot[] | undefined>;
  findBySpotId(spot_id: string): Promise<ISpot | undefined>;
}
