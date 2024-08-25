import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';
import { TodoRepository } from '@core/todo/ports/repository';
import { TypeORMTodoRepository } from './typeorm/repositories';
import { ConfigService } from '@nestjs/config';
import { TypeORMTodoEntity } from './typeorm/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([TypeORMTodoEntity]),
  ],
  providers: [
    {
      provide: TodoRepository,
      useClass: TypeORMTodoRepository,
    },
  ],
  exports: [TodoRepository],
})
export class DatabaseModule {}
