import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService, PrismaService],
})
export class ExamsModule {}
