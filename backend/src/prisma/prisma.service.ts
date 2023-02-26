import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  //データベースのコネクションを貼るメソッド
  async onModuleInit() {
    await this.$connect();
  }

  //データベースの接続をきるタイミングでNestJSのアプリも落とすようにしている
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
