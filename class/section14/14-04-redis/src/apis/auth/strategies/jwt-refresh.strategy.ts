import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

// import { KakaoStrategy } from 'passport-kakao'
// import { NaverStrategy } from 'passport-naver'
// import { GoggleStrategy } from 'passport-google'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log('==================');
        console.log('req:', req);
        console.log('==================');
        const cookie = req.headers.cookie; // refresh=asoldjlaksjdf 이런식으로 들어와있음
        console.log('cookie:', cookie);
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의리프레시비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: alskdjf (유저ID)}

    return {
      id: payload.sub,
    };
  }
}
