import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projeto } from '../../projeto/entities/projeto.entity';
import { Assunto } from './assunto.entity';

@Entity()
export class ProjetoAssunto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Projeto, (projeto) => projeto.assuntos)
  @JoinColumn({ name: 'id_projeto', referencedColumnName: 'id' })
  projeto: Projeto;

  @ManyToOne(() => Assunto, (assunto) => assunto.projAssuntos)
  @JoinColumn({ name: 'id_assunto', referencedColumnName: 'id' })
  assunto: Assunto;
}
