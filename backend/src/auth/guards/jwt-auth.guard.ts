import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  // ExecutionContextは実行request情報を取得したり実行リゾルバーの情報を取得したりする
  // AuthGuardで使われているgetRequestメソッドがRESTようなのでgraphqlで使えるようにオーバーライド
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
