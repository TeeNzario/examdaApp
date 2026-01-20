import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './notifications/notifications.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-notification')
  async testNotification(@Body() body: { examId: number }) {
    console.log('🧪 Testing notification for exam:', body.examId);
    // This will manually trigger the notification check
    await this.notificationService.checkAndSendReminders();
    return { message: 'Test notification triggered' };
  }
}
