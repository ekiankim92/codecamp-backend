import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import * as bcrpyt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // prettier-ignore
  async create({ email, password, name, age }: IUsersServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({email})

    if (user) throw new ConflictException('이미 등록된 이메일입니다.')

    const hashedPassword = await bcrpyt.hash(password, 10)

    return this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
