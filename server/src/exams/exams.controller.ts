import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  // GET /exams?userId=1
  @Get()
  findAll(@Query('userId') userId: string) {
    return this.examsService.findAll(Number(userId));
  }

  // POST /exams?userId=1
  @Post()
  create(
    @Query('userId') userId: string,
    @Body() dto: CreateExamDto,
  ) {
    return this.examsService.create(Number(userId), dto);
  }

  // PUT /exams/:id?userId=1
  @Put(':id')
  update(
    @Query('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateExamDto,
  ) {
    return this.examsService.update(Number(userId), Number(id), dto);
  }

  // PATCH /exams/:id/finish?userId=1
  @Patch(':id/finish')
  finish(
    @Query('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.examsService.finish(Number(userId), Number(id));
  }
}
