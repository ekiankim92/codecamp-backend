import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { KakaoStrategy } from 'passport-kakao'
// import { NaverStrategy } from 'passport-naver'
// import { GoggleStrategy } from 'passport-google'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.Authorization; // Bearer 어쩌고저쩌고
      //     const accessToken = temp.toLowerCase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  validate(payload) {
    console.log(payload);

    return {
      id: payload.sub,
    };
  }
}
