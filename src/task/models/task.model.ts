import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  //statusは後ほど、データベースのenumをつかって書き換える
  @Field()
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  //nullを許容する場合 = nullable: true
  @Field({ nullable: true })
  description: string;
}
