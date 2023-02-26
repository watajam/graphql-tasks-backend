import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  // ExecutionContextは実行request情報を取得したり実行リゾルバーの情報を取得したりする
  // AuthGuardで使われているgetRequestメソッドがRESTようなのでgraphqlで使えるようにオーバーライド
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs().signInInput;
    return request;
  }
}
