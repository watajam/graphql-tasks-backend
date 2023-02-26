import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.models';

// レスポンスには特にきまったデコレーターない
@ObjectType()
export class SignInResponse {
  @Field()
  accessToken: string;

  //graphqlのユーザーモデルを返す
  //Field(() => User) はgraphqlがユーザー型を認識させる為
  //サービス側でprismaをつかっていないのでgraphqlのユーザーモデルを返す
  @Field(() => User)
  user: User;
}
