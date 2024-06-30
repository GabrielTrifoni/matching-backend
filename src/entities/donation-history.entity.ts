import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Donation } from './donation.entity';
import { User } from './user.entity';

@Entity()
export class DonationHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value.toString(),
      from: (value: string) => parseFloat(value),
    },
    nullable: false,
  })
  amount: number;

  @Column({ name: 'transaction', type: 'varchar', nullable: false })
  transaction: string;

  @Column({
    name: 'transaction_date',
    type: 'timestamp',
    nullable: false,
  })
  transactionDate: Date;

  @ManyToOne(() => User, (user) => user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Donation, (donation) => donation.donations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'donation_id', referencedColumnName: 'id' })
  donation: Donation;
}
