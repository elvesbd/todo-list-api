import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { TypeORMTodosListEntity } from './todos-list.entity';

@Entity('todos')
export class TypeORMTodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('boolean', {
    nullable: false,
  })
  status: boolean;

  @ManyToOne(() => TypeORMTodosListEntity, (todosList) => todosList.todos)
  todosList?: TypeORMTodosListEntity[];

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
