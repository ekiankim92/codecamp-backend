import { Args, Int, Resolver, Mutation, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql.auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // lifeCycle 으로 인하여 가드로 인가를 뚫어야함
  // rest 와 gql UseGuards 는 살짝 다름. 이걸 변경해주는게 GqlAuthAccessGuard 으로 gql 로 바꿔치기 함
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @Context() context: IContext, //
  ): string {
    console.log('==================');
    console.log(context.req.user);
    console.log('==================');
    return '인가에 성공하였습니다';
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}
