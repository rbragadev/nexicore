import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/prisma/prisma.service';
import { UserModule } from './core/user/user.module';
import { NlpModule } from './core/nlp/nlp.module';

@Module({
  imports: [UserModule, NlpModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
