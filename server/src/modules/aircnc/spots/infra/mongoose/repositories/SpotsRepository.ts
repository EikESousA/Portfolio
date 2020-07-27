import ISpotsRepository from '@modules/aircnc/spots/repositories/ISpotsRepository';
import Spot, {
  ISpot,
} from '@modules/aircnc/spots/infra/mongoose/entities/Spot';
import ICreateSpotDTO from '@modules/aircnc/spots/dtos/ICreateSpotDTO';

class UsersRepository implements ISpotsRepository {
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
    const spot = await Spot.findById(spot_id);
    return spot || undefined;
  }
}

export default UsersRepository;
