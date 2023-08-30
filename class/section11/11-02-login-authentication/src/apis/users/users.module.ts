import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  // rest api 방식은
  // controllers: [] 가 있어야하는 이건 graphql 이라 없어도됨.
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    UsersResolver, //
    UsersService,
  ],
  exports: [
    UsersService, //
  ],
})
export class UsersModule {}
