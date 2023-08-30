import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule, //
  ],
  providers: [
    JwtAccessStrategy,
    AuthResolver, //
    AuthService,
    // UsersService, // 여기에 이렇게 쓸 필요가 없는게 users.module 에서 export 하고 있기에 위에 하나만 갖고오면됨
  ],
})
export class AuthModule {}
