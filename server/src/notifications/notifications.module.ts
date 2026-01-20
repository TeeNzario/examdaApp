import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notifications.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PushTokensModule } from '../push-tokens/push-tokens.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, PushTokensModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationsModule {}
