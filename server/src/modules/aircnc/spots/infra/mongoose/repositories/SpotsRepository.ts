import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import Spot, {
  ISpot,
} from '@modules/aircnc/spots/infra/mongoose/entities/Spot';
import ICreateSpotDTO from '@modules/aircnc/spots/dtos/ICreateSpotDTO';

export default class UsersRepository implements ISpotsRepository {
  public async create(data: ICreateSpotDTO): Promise<ISpot> {
    const { user, thumbnail, company, techs, price } = data;
    const spot = await Spot.create({ user, thumbnail, company, techs, price });
    return spot;
  }

  public async findByTech(tech: string): Promise<ISpot[] | undefined> {
    const spots = await Spot.find({ techs: tech });
    return spots || undefined;
  }

  public async findByUserId(user_id: string): Promise<ISpot[] | undefined> {
    const spots = await Spot.find({ user: user_id });
    return spots || undefined;
  }

  public async findBySpotId(spot_id: string): Promise<ISpot | undefined> {
    try {
      const spot = await Spot.findOne({ _id: spot_id });
      return spot || undefined;
    } catch (err) {
      return undefined;
    }
  }
}
