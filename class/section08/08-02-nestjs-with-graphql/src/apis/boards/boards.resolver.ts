import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

// @Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  // @Get()
  // String 이 있어도되고 없어도 되고
  @Query(() => String, { nullable: true })
  getHello(): string {
    return this.boardsService.getHello();
  }
}
