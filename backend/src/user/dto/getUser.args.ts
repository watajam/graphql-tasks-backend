import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

// queryの場合はInputTypeじゃなくてArgsType
@ArgsType()
export class GetUserArgs {
  @Field()
  @IsEmail()
  email: string;
}
