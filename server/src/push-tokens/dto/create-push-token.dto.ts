import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePushTokenDto {
  @IsNumber()
  @IsNotEmpty()
  examId: number;

  @IsString()
  @IsNotEmpty()
  pushToken: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
