import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'status', type: 'varchar', length: 30, nullable: false })
  status: string;

  @Column({ name: 'reason', type: 'varchar', length: 255, nullable: false })
  reason: string;

  @ManyToOne(() => User, (user) => user.interests)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Project, (project) => project.interests)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;
}
