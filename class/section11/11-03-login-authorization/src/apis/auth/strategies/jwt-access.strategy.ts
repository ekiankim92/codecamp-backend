import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 밑에 꺼는 카카오 소셜 로그인에 strategy 로 바꿔 낄수 있음
// import { KakaoStrategy } from "passport-kakao"
// import { NaverStrategy } from "passport-naver"
// import { GoogleStrategy } from "passport-google"

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  // 자식이 부모 constructor 로 넘겨주고 싶을때 super 을 슴
  constructor() {
    super({
      // 내가 만든 함수
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.Authorization; // Bearer elYlskjlkadsf
      //     const accessToken = temp.toLowerCase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  // 성공하면 validate 실행, 실패하면 에러
  validate(payload) {
    console.log('payload:', payload); // {sub: alskdjf(유저 ID)}

    return {
      id: payload.sub,
    };
  }
}
