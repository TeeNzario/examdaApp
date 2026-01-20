import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamsModule } from './exams/exams.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { PushTokensModule } from './push-tokens/push-tokens.module';

@Module({
  imports: [ExamsModule, PrismaModule, NotificationsModule, PushTokensModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
