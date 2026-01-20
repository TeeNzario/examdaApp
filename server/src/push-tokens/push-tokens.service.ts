import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';

@Injectable()
export class PushTokensService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePushTokenDto) {
    return this.prisma.pushToken.create({
      data: {
        examId: dto.examId,
        token: dto.pushToken,
        deviceId: dto.deviceId,
      },
    });
  }

  async findByExamId(examId: number) {
    return this.prisma.pushToken.findMany({
      where: { examId },
    });
  }

  async deleteByExamId(examId: number) {
    return this.prisma.pushToken.deleteMany({
      where: { examId },
    });
  }
}
