import { User } from 'src/apis/users/entities/users.entity';

export interface IAuthService {
  email: string;
  password: string;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}
