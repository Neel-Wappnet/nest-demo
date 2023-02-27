import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';
import { ForbiddenException } from './exception/forbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll();
    } catch (err) {
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'custom error message',
      //   },
      //   HttpStatus.FORBIDDEN,
      //   {
      //     cause: err,
      //   },
      // );
      throw new ForbiddenException();
    }
  }
}
