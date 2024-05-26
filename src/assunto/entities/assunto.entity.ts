import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjetoAssunto } from './projeto-assunto.entity';
import { UsuarioAssunto } from '../../usuario-assunto/entities/usuario-assunto.entity';

@Entity()
export class Assunto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'area_conhecimento',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  areaConhecimento: string;

  @Column({ name: 'assunto', type: 'varchar', length: 255, nullable: false })
  assunto: string;

  @OneToMany(() => ProjetoAssunto, (projAssuntos) => projAssuntos.assunto)
  projAssuntos: ProjetoAssunto[];

  @OneToMany(() => UsuarioAssunto, (userAssunto) => userAssunto.assunto)
  userAssuntos: UsuarioAssunto[];
}
