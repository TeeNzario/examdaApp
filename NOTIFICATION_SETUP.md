# Expo Push Notifications Setup

## Overview
This implements Expo Push Notifications for exam reminders without requiring a user module.

## How It Works

### Client-side Flow:
1. User creates an exam with a reminder time (30 seconds, 1 hour, or 1 day)
2. After exam creation, device push token is automatically registered with the server
3. Push token is stored per exam (not per user)
4. When notification arrives, app displays it and user can tap to navigate

### Server-side Flow:
1. Every 30 seconds, the notification service checks for reminders that should be sent
2. For each reminder that's ready, it fetches all registered push tokens
3. Sends push notifications via Expo Push API to all registered devices
4. Marks reminder as sent to avoid duplicates

## Database Schema

### New PushToken Table
```sql
CREATE TABLE `push_tokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` INT NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `device_id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  INDEX `idx_push_token_exam_id`(`exam_id`),
  INDEX `idx_push_token_token`(`token`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- `exam_id`: Links token to exam (foreign key to exams table)
- `token`: Device push token from Expo
- `device_id`: Device identifier for tracking
- `created_at`: When token was registered

## Files Added/Modified

### Client Files:
- **services/pushNotificationService.ts** (NEW) - Handles push token registration and notification listeners
- **app/exam/create.tsx** (MODIFIED) - Registers push token after exam creation
- **package.json** (ALREADY HAS) - expo-notifications already installed

### Server Files:
- **src/push-tokens/** (NEW FOLDER)
  - `push-tokens.service.ts` - Service to manage push tokens
  - `push-tokens.controller.ts` - API endpoint for token registration
  - `push-tokens.module.ts` - Module definition
  - `dto/create-push-token.dto.ts` - Validation DTO
- **src/notifications/notifications.service.ts** (MODIFIED) - Integrated Expo SDK to send real push notifications
- **src/notifications/notifications.module.ts** (MODIFIED) - Added PushTokensModule import
- **src/app.module.ts** (MODIFIED) - Added PushTokensModule and NotificationsModule
- **prisma/schema.prisma** (MODIFIED) - Added PushToken model and relationship to Exam
- **prisma/migrations/20260120_add_push_tokens/migration.sql** (NEW) - Database migration
- **package.json** (MODIFIED) - Added expo-server-sdk dependency

## API Endpoints

### Register Push Token
```
POST /push-tokens
Content-Type: application/json

{
  "examId": 1,
  "pushToken": "ExponentPushToken[xxxxx]",
  "deviceId": "device-123"
}
```

Response:
```json
{
  "id": 1,
  "examId": 1,
  "token": "ExponentPushToken[xxxxx]",
  "deviceId": "device-123",
  "createdAt": "2026-01-20T12:00:00Z"
}
```

## Testing Flow

1. Create an exam with "ก่อน 30 วินาที" (30 seconds) reminder
2. Push token is automatically registered
3. Server checks every 30 seconds
4. When 30 seconds before exam time: Notification is sent to device
5. Mobile app receives notification

## Implementation Details

### Cron Job
- Runs every 30 seconds
- Checks for unsent reminders
- Calculates reminder time based on: `exam.examDateTime - remindBeforeMinutes`
- Sends within 60-second window of target time

### Notification Payload
```json
{
  "to": "ExponentPushToken[xxxxx]",
  "sound": "default",
  "title": "Exam Reminder",
  "body": "[Exam Name] starts soon!",
  "data": { "examId": 1 },
  "badge": 1
}
```

### Error Handling
- If no push tokens found for exam, logs warning and skips
- Catches and logs Expo API errors
- Doesn't block other reminders if one fails

## Notes

- No user module created as requested
- Tokens are associated with exams, not users
- Multiple devices can register for same exam
- Works across iOS and Android via Expo
- Server can be behind firewall (doesn't receive callbacks)
