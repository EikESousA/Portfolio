import IOngsRepository from '@modules/thebehero/ongs/repositories/IOngsRepository';
import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

import connection from '@shared/infra/knex';

export default class OngsRepository implements IOngsRepository {
  public async create({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  }: IOngDTO): Promise<IOngDTO> {
    await connection('thebehero_ong').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    const ong = await connection('thebehero_ong')
      .where('id', id)
      .select('*')
      .first();

    return ong;
  }

  public async showAllOngs(): Promise<IOngDTO[]> {
    const ongs = await connection('thebehero_ong').select('*');

    return ongs;
  }

  public async findOngByIdFirst(id: string): Promise<IOngDTO | undefined> {
    const ong = await connection('thebehero_ong')
      .where('id', id)
      .select('name')
      .first();

    return ong;
  }
}
