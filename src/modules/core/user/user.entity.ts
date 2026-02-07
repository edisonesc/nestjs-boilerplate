import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import { AuthSessionEntity } from '../auth/entities/auth-session.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'text',
  })
  password: string;

  @Exclude()
  @Column({
    type: 'integer',
    nullable: true,
  })
  role_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => AuthSessionEntity, (session) => session.user)
  auth_sessions: AuthSessionEntity[];

  // @ManyToOne(())

  toJSON() {
    return instanceToPlain(this);
  }
}
