import { Injectable, Scope } from '@nestjs/common';

// injection scope, 승글톤 (new 한번)으로 할래?
//                   Request Scope (매 요청마다 new)으로 할래?
//                   Transient Scope (매 주입마다 new) 로 할래?

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  getHello(): string {
    return 'Hello World!';
  }
}
