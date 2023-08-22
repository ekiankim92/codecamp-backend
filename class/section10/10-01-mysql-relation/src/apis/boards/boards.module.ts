import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';

// 모듈은 import, resolver, injectable 을 하나로 합쳐준다
@Module({
  imports: [],
  providers: [
    BoardsService, //
    BoardsResolver, //
  ],
})
export class BoardsModule {}
