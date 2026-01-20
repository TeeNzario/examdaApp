import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { PushTokensService } from '../push-tokens/push-tokens.service';
import * as Expo from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private expoClient = new Expo.Expo();

  constructor(
    private prisma: PrismaService,
    private pushTokensService: PushTokensService,
  ) {}

  /**
   * Run every 30 seconds to check for upcoming exams
   */
  @Cron('*/30 * * * * *') // Every 30 seconds
  async checkAndSendReminders() {
    try {
      const now = new Date();
      console.log('🔔 [Notification Check] Running at', now.toISOString());

      // Get all unsent reminders
      const reminders = await this.prisma.examReminder.findMany({
        where: {
          isSent: false,
        },
        include: {
          exam: true,
        },
      });

      console.log(`📋 [Notification Check] Found ${reminders.length} unsent reminders`);

      for (const reminder of reminders) {
        // Calculate when the reminder should be sent
        const reminderTime = new Date(
          reminder.exam.examDateTime.getTime() - reminder.remindBeforeMinutes * 60 * 1000
        );

        console.log(
          `⏰ [Exam: ${reminder.exam.name}] Reminder time: ${reminderTime.toISOString()}, Current: ${now.toISOString()}, Minutes before: ${reminder.remindBeforeMinutes}`
        );

        // If it's time to send the reminder
        if (now >= reminderTime && now <= new Date(reminderTime.getTime() + 60 * 1000)) {
          console.log(`✅ [Exam: ${reminder.exam.name}] TIME TO SEND REMINDER!`);
          await this.sendReminder(reminder, reminder.exam);

          // Mark as sent
          await this.prisma.examReminder.update({
            where: { id: reminder.id },
            data: { isSent: true },
          });

          this.logger.log(
            `✉️ Reminder sent for exam: ${reminder.exam.name} (ID: ${reminder.exam.id})`
          );
        }
      }
    } catch (error) {
      this.logger.error('❌ Error checking reminders:', error);
    }
  }

  private async sendReminder(reminder: any, exam: any) {
    try {
      // Get push tokens for this exam
      const pushTokens = await this.pushTokensService.findByExamId(exam.id);

      console.log(`📲 [Exam: ${exam.name}] Found ${pushTokens.length} push tokens`);

      if (pushTokens.length === 0) {
        this.logger.warn(`No push tokens found for exam ${exam.id}`);
        return;
      }

      const messages = pushTokens.map((pt) => ({
        to: pt.token,
        sound: 'default' as const,
        title: 'Exam Reminder',
        body: `${exam.name} starts soon!`,
        data: { examId: exam.id },
        badge: 1,
      }));

      console.log(
        `📤 [Exam: ${exam.name}] Sending ${messages.length} notifications via Expo`,
        JSON.stringify(messages)
      );

      // Send notifications
      const tickets = await this.expoClient.sendPushNotificationsAsync(messages);

      console.log(`🎫 [Exam: ${exam.name}] Notification tickets:`, JSON.stringify(tickets));
      this.logger.log(`✉️ Notifications sent for exam: ${exam.name}`);
    } catch (error) {
      this.logger.error('Error sending notification:', error);
      console.error('❌ Failed to send notification:', error);
    }
  }
}

