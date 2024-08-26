import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class TypeORMUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
