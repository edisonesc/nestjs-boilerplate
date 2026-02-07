import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  body: string;
}
