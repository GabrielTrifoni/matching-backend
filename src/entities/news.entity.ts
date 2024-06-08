import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({
    name: 'written_date',
    type: 'timestamp',
    nullable: false,
  })
  writtenDate: Date;

  @Column({
    name: 'modified_date',
    type: 'timestamp',
    nullable: false,
  })
  modifiedDate: Date;

  @Column({ name: 'attachments', type: 'varchar', length: 512, nullable: true })
  attachments: string;

  @ManyToOne(() => User, (user) => user.news)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
