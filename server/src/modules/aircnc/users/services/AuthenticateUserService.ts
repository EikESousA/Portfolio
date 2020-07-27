import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/aircnc/users/repositories/IUsersRepository';
import { IUser } from '@modules/aircnc/users/infra/mongoose/entities/User';

interface IRequestDTO {
  email: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<IUser> {
    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      user = await this.usersRepository.create(email);
    }

    return user;
  }
}
