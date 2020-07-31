import IOngsRepository from '@modules/thebehero/ongs/repositories/IOngsRepository';
import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

export default class FakeOngsRepository implements IOngsRepository {
  private ongs: IOngDTO[] = [];

  public async create({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  }: IOngDTO): Promise<IOngDTO> {
    const ong: IOngDTO = {
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    this.ongs.push(ong);
    return ong;
  }

  public async showAllOngs(): Promise<IOngDTO[]> {
    return this.ongs;
  }

  public async findOngById(id: string): Promise<IOngDTO | undefined> {
    const ong = this.ongs.find(findOng => findOng.id === id);
    return ong || undefined;
  }
}
