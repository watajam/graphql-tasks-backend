import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

//モデルからGraphqlのスキーマを生成する為に@ObjectTypeのデコレータをつける
@ObjectType()
export class Task {
  //typeScriptのフィールドをGraphqlのスキーマフィールドに変更する為に@Fieldをつける
  //numberがデフォルトだとFloat型になる為、Int型を付与する
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  dueDate: string;

  //変更⭕
  @Field()
  status: Status;

  //nullを許容する場合 = nullable: true
  @Field({ nullable: true })
  description: string;

  //変更⭕
  @Field()
  createdAt: Date;

  //変更⭕
  @Field()
  updatedAt: Date;
}
