import IOngDTO from '@modules/thebehero/ongs/dtos/IOngDTO';

export default interface IOngsRepository {
  create(data: IOngDTO): Promise<IOngDTO>;
  showAllOngs(): Promise<IOngDTO[]>;
  findOngById(id: string): Promise<IOngDTO | undefined>;
}
