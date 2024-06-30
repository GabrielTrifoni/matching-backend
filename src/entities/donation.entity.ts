import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { DonationHistory } from './donation-history.entity';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'donated',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value.toString(),
      from: (value: string) => parseFloat(value),
    },
    nullable: false,
  })
  donated: number;

  @Column({
    name: 'expected',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value.toString(),
      from: (value: string) => parseFloat(value),
    },
    nullable: false,
  })
  expected: number;

  @Column({ name: 'opening', type: 'date', nullable: false })
  opening: Date;

  @Column({ name: 'closure', type: 'date', nullable: false })
  closure: Date;

  @OneToOne(() => Project, (project) => project.donation)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;

  @OneToMany(() => DonationHistory, (donations) => donations.donation)
  donations: DonationHistory[];
}
