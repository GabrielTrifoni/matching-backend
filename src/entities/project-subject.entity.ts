import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { Subject } from './subject.entity';

@Entity()
export class ProjectSubject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Project, (project) => project.subjects)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;

  @ManyToOne(() => Subject, (subject) => subject.projectSubject)
  @JoinColumn({ name: 'id_Subject', referencedColumnName: 'id' })
  subject: Subject;
}
