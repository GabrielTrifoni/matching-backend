import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectSubject } from './project-subject.entity';
import { UserSubject } from './user-subject.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'knowledge',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  knowledge: string;

  @Column({ name: 'subject', type: 'varchar', length: 255, nullable: false })
  subject: string;

  @OneToMany(() => ProjectSubject, (projectSubject) => projectSubject.subject)
  projectSubject: ProjectSubject[];

  @OneToMany(() => UserSubject, (userSubject) => userSubject.subject)
  userSubject: UserSubject[];
}
