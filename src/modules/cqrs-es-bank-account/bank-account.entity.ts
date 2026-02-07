import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankAccount {
  //   @PrimaryGeneratedColumn()
  //   id: number;

  @PrimaryColumn()
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @Column()
  status: string; // open, closes
}
