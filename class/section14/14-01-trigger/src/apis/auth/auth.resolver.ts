import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { gqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    context.req;
    return this.authService.login({ email, password, context });
  }

  @Mutation(() => String)
  // 1. refreshToken 인가
  // 2. 인가 성공 하면 accessToken 재발급
  @UseGuards(gqlAuthGuard('refresh'))
  restoreAccessToken(
    @Context() context: IContext, // user 가 context 안에 있음
  ): string {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
