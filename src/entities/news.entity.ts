import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachment } from './attachments.entity';

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

  @OneToOne(() => Attachment, (attachment) => attachment.news, { cascade: true },)
  @JoinColumn({ name: 'attachment_id', referencedColumnName: 'id' })
  attachment: Attachment;

  @ManyToOne(() => User, (user) => user.news)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
