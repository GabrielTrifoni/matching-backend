import { Interest } from 'src/entities/interest.entity';
import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Donation } from './donation.entity';
import { ProjectSubject } from './project-subject.entity';
import { ProjectStatus } from 'src/enums/project-status.enum';
import { Attachment } from './attachments.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Column({ name: 'motivation', type: 'varchar', length: 255, nullable: false })
  motivation: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  description: string;

  @Column({ name: 'paeg', type: 'varchar', length: 64, nullable: false })
  paeg: string;

  
  @Column({ name: 'slots', type: 'int', nullable: false })
  slots: number;

  @Column({ name: 'workload', type: 'float', nullable: false })
  workload: number;
  
  @Column({ name: 'start_date', type: 'date', nullable: false })
  startDate: Date;
  
  @Column({ name: 'end_date', type: 'date', nullable: false })
  endDate: Date;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: ProjectStatus;
  
  @ManyToOne(() => User, (user) => user.projects, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supervisor', referencedColumnName: 'id' })
  supervisor: User;
  
  @OneToOne(() => Donation, (donation) => donation.project, { nullable: true })
  donation: Donation;

  @OneToMany(() => Interest, (interest) => interest.project)
  interests: Interest[];

  @OneToMany(() => ProjectSubject, (projectSubject) => projectSubject.project)
  subjects: ProjectSubject[];
  
  @OneToOne(() => Attachment, (attachment) => attachment.project, { cascade: true },)
  @JoinColumn({ name: 'attachment_id', referencedColumnName: 'id' })
  attachment: Attachment;
}
