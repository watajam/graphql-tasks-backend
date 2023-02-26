import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signIn.input';
import { SignInResponse } from './dto/signInResponse';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(
    // request.body = ctx.getArgs().signInInputのsignInInputの同じ名前に合わせないといけない;
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: any,
  ) {
    // context.userにはLocalStrategyのreturnしたuserの値が入る
    return await this.authService.signIn(context.user);
  }
}
