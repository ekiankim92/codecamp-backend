import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// 하나로 두개 사용 가능. 재활용
export const gqlAuthGuard = (name: string) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
  };
};

// 밑에 처럼 accessToken 이랑 refreshToken 을 두개로 놔누는것이 아닌 하나로 통합해서 사용

// export class GqlAuthAccessGuard extends AuthGuard('access') {
//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }
// }

// export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }
// }
