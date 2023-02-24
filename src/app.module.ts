import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    // forRootはアプリケーションの全体に適応するメソッド
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // GraphQL　playgroundを使用するかどうか(apiをgui上でかんたんに実行できるもの)
      playground: true,
      //コードファーストでやる時の設定
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      //フロントからGraphQLサーバーにすべてのオリジンがアクセスできるようにする設定
      cors: {
        origin: '*',
      },
    }),
    TaskModule,
  ],
})
export class AppModule {}
