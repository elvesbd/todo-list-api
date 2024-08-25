import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeORMTodoEntity } from './todo.entity';

@Entity('todos-list')
export class TypeORMTodosListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
  })
  color: string;

  @OneToMany(() => TypeORMTodoEntity, (todo) => todo.todosList)
  todos: TypeORMTodoEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
