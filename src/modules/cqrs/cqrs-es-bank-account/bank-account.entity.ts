import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank-account')
export class BankAccountEntity {
  //   @PrimaryGeneratedColumn()
  //   id: number;

  @PrimaryColumn()
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @Column()
  status: string; // open, closes
}
