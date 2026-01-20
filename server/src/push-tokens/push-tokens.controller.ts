import { Controller, Post, Body } from '@nestjs/common';
import { PushTokensService } from './push-tokens.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';

@Controller('push-tokens')
export class PushTokensController {
  constructor(private readonly pushTokensService: PushTokensService) {}

  @Post()
  create(@Body() dto: CreatePushTokenDto) {
    return this.pushTokensService.create(dto);
  }
}
