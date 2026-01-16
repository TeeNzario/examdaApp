import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.exam.findMany({
      where: { userId },
      include: { reminders: true },
      orderBy: { examDateTime: 'asc' },
    });
  }

  async create(userId: number, dto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        userId,
        name: dto.name,
        description: dto.description,
        examDateTime: new Date(dto.examDateTime),
        reminders: {
          create: {
            remindBeforeMinutes: dto.remindBeforeMinutes,
          },
        },
      },
    });
  }

  async update(userId: number, id: number, dto: UpdateExamDto) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new NotFoundException('Exam not found');
    if (exam.userId !== userId || exam.isDone)
      throw new ForbiddenException('Cannot edit this exam'); //what this means?

    return this.prisma.exam.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        examDateTime: dto.examDateTime
          ? new Date(dto.examDateTime) //what this means?
          : undefined,
      },
    });
  }

  async finish(userId: number, id: number) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new NotFoundException('Exam not found');
    if (exam.userId !== userId)
      throw new ForbiddenException('Access denied');

    return this.prisma.exam.update({
      where: { id },
      data: { isDone: true },
    });
  }
}
