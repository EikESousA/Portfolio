import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import Spot, {
  ISpot,
} from '@modules/aircnc/spots/infra/mongoose/entities/Spot';
import ICreateSpotDTO from '@modules/aircnc/spots/dtos/ICreateSpotDTO';

export default class FakeSpotsRepository implements ISpotsRepository {
  private spots: ISpot[] = [];

  public async create(data: ICreateSpotDTO): Promise<ISpot> {
    const spot = new Spot();
    Object.assign(spot, data);
    this.spots.push(spot);
    return spot;
  }

  public async findByTech(tech: string): Promise<ISpot[] | undefined> {
    const spotsTech = this.spots.filter(findSpot =>
      findSpot.techs.includes(tech),
    );
    return spotsTech;
  }

  public async findByUserId(user_id: string): Promise<ISpot[] | undefined> {
    const spotsUser = this.spots.filter(
      findSpot => String(findSpot.user) === user_id,
    );
    return spotsUser || undefined;
  }

  public async findBySpotId(spot_id: string): Promise<ISpot | undefined> {
    const spot = await this.spots.find(
      findSpot => String(findSpot.id) === spot_id,
    );
    return spot || undefined;
  }
}
