import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';
import { ForbiddenException } from './exception/forbidden.exception';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Controller('cats')
// @UseGuards(RolesGuard)
// @SetMetadata('roles', ['admin'])
@UseInterceptors(LoggingInterceptor)
@Roles('admin')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
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
