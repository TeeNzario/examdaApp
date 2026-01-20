import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Run every 30 seconds to check for upcoming exams
   */
  @Cron('*/30 * * * * *') // Every 30 seconds
  async checkAndSendReminders() {
    try {
      const now = new Date();

      // Get all unsent reminders
      const reminders = await this.prisma.examReminder.findMany({
        where: {
          isSent: false,
        },
        include: {
          exam: true,
        },
      });

      for (const reminder of reminders) {
        // Calculate when the reminder should be sent
        const reminderTime = new Date(
          reminder.exam.examDateTime.getTime() - reminder.remindBeforeMinutes * 60 * 1000
        );

        // If it's time to send the reminder
        if (now >= reminderTime && now <= new Date(reminderTime.getTime() + 60 * 1000)) {
          await this.sendReminder(reminder, reminder.exam);

          // Mark as sent
          await this.prisma.examReminder.update({
            where: { id: reminder.id },
            data: { isSent: true },
          });

          this.logger.log(
            `Reminder sent for exam: ${reminder.exam.name} (ID: ${reminder.exam.id})`
          );
        }
      }
    } catch (error) {
      this.logger.error('Error checking reminders:', error);
    }
  }

  private async sendReminder(reminder: any, exam: any) {
    // TODO: Integrate with your notification system (Firebase Cloud Messaging, email, SMS, etc.)
    this.logger.log(
      `Sending reminder: "${exam.name}" starts at ${exam.examDateTime}`
    );
    
    // Example: Send to a webhook, push notification service, etc.
    // await this.notificationProvider.send({
    //   userId: exam.userId,
    //   title: 'Exam Reminder',
    //   body: `${exam.name} starts at ${exam.examDateTime.toLocaleTimeString()}`,
    //   data: { examId: exam.id },
    // });
  }
}
