import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { InterestStatus } from 'src/enums/interest-status.enum';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: InterestStatus;

  @Column({ name: 'reason', type: 'varchar', length: 255, nullable: false })
  reason: string;

  @ManyToOne(() => User, (user) => user.interests)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Project, (project) => project.interests)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;
}
