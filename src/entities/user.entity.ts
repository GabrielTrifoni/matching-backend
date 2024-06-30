import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { Interest } from './interest.entity';
import { News } from './news.entity';
import { DonationHistory } from './donation-history.entity';
import { UserSubject } from './user-subject.entity';
import { UserRole } from 'src/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ unique: true, name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'fullname', type: 'varchar', nullable: false })
  fullname: string;

  @Column({
    unique: true,
    name: 'cpf',
    type: 'char',
    nullable: false,
    length: 11,
  })
  cpf: string;

  @Column({ name: 'role', type: 'varchar', nullable: false, length: 30 })
  role: UserRole;

  @Column({
    unique: true,
    name: 'phone',
    type: 'char',
    nullable: false,
    length: 11,
  })
  phone: string;

  @Column({
    name: 'bio',
    type: 'varchar',
    nullable: false,
    length: 1024,
  })
  bio: string;

  @OneToMany(() => Project, (project) => project.supervisor)
  projects: Project[];

  @OneToMany(() => Interest, (interest) => interest.user)
  interests: Interest[];

  @OneToMany(() => News, (news) => news.user)
  news: News[];

  @OneToMany(() => DonationHistory, (donation) => donation)
  donations: DonationHistory[];

  @OneToMany(() => UserSubject, (userSubject) => userSubject.user)
  subjects: UserSubject[];
}
