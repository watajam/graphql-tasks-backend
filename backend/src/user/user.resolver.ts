import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/createUser.input';
import { User as UserModel } from './models/user.models';
import { UserService } from './user.service';
import { GetUserArgs } from './dto/getUser.args';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  //登録されていないメールアドレスは が来たときnullを返す設定{ nullable: true }
  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  //@ArgsTypeの場合は@Args()に引数を入れない
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }
}
