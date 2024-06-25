import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  fileName: string;

  @Column({ nullable: false })
  length: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  url: string;

  @OneToOne(() => News, news => news.attachment)
  news: News;
}