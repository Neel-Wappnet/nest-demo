import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { loggerMiddleware } from './cats/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { HttpExceptionFilter } from './cats/filter/http-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './cats/guard/roles.guard';

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes(CatsController);
  }
}
