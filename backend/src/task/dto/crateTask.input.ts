import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

//クラスをミューテーションの引数とするときはInputType
@InputType()
export class CreateTaskInput {
  @Field()
  //空なし
  @IsNotEmpty()
  name: string;

  @Field()
  //日付形式の文字列にしたい
  @IsDateString()
  dueDate: string;

  @Field({ nullable: true })
  description?: string;

  //追加 ⭕
  @Field(() => Int)
  userId: number;
}
