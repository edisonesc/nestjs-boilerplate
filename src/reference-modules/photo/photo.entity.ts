import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  views: string;

  @Column()
  isPublished: boolean;
}
