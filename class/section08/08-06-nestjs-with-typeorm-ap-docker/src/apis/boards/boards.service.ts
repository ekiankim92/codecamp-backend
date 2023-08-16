import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardServiceCreate } from './interfaces/boards-service.interface';

// injection scope, 승글톤 (new 한번)으로 할래?
//                   Request Scope (매 요청마다 new)으로 할래?
//                   Transient Scope (매 주입마다 new) 로 할래?

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
    const result = [
      {
        number: 1,
        writer: 'Paul',
        title: 'This is title',
        contents: 'This is the contents for Paul',
      },
      {
        number: 2,
        writer: 'Chris',
        title: 'This is Chris',
        contents: 'This is the contents for Chris',
      },
      {
        number: 3,
        writer: 'Matt',
        title: 'This is Matt',
        contents: 'This is the contents for Matt',
      },
    ];

    // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기

    return result;
  }

  create({ createBoardInput }: IBoardServiceCreate): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기

    return '계시물 등록에 성공하였습니다';
  }
}
