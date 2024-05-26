import { Interesse } from 'src/interesse/entities/interesse.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doacao } from '../../doacao/entities/doacao.entity';
import { ProjetoAssunto } from '../../assunto/entities/projeto-assunto.entity';

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'titulo', type: 'varchar', nullable: false })
  titulo: string;

  @Column({ name: 'motivacao', type: 'varchar', length: 255, nullable: false })
  motivacao: string;

  @Column({
    name: 'descricao',
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  descricao: string;

  @Column({ name: 'paeg', type: 'varchar', length: 64, nullable: false })
  paeg: string;

  @Column({ name: 'anexos', type: 'varchar', length: 512, nullable: true })
  anexos: string;

  @Column({ name: 'num_vagas', type: 'int', nullable: false })
  numVagas: number;

  @Column({ name: 'carga_horaria', type: 'float', nullable: false })
  cargaHoraria: number;

  @Column({ name: 'data_inicio', type: 'date', nullable: false })
  dataInicio: Date = new Date();

  @Column({ name: 'data_fim', type: 'date', nullable: false })
  dataFim: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.projetos)
  @JoinColumn({ name: 'responsavel', referencedColumnName: 'id' })
  responsavel: Usuario;

  @OneToOne(() => Doacao, (doacao) => doacao.projeto, { nullable: true })
  doacao: Doacao;

  @ManyToOne(() => Interesse, (interesse) => interesse.projeto)
  interesses: Interesse[];

  @OneToMany(() => ProjetoAssunto, (projAssunto) => projAssunto.projeto)
  assuntos: ProjetoAssunto[];
}
