import { BoardService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String, { nullable: true })
  async fetchBoards(): Promise<string> {
    // 1. 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('board');
    console.log('mycache:', mycache);

    // 2. 조회완료 메시지 전달
    return '캐시에서 조회 완료';

    // 레디스 연습을 위해서 잠시 주석 걸기!!!
    // return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습. 0은 영구적
    await this.cacheManager.set('board', createBoardInput, 30000);

    // 2. 등록완료 메세지 전달
    return '캐시에 등록 완료';

    // 레디스 연습을 위해서 잠시 주석 걸기!!!
    // return this.boardService.create({ createBoardInput });
  }
}
