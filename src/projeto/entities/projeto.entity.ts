import { HistoricoDoacao } from 'src/historico_doacao/entities/historico_doacao.entity';
import { Interesse } from 'src/interesse/entities/interesse.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Projeto {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'titulo', type: 'string', nullable: false })
  titulo: string;

  @Column({ name: 'motivacao', type: 'text', nullable: false })
  motivacao: string;

  @Column({ name: 'descricao', type: 'text', nullable: false })
  descricao: string;

  @Column({ name: 'paeg', type: 'string', nullable: false })
  paeg: string;

  @Column({ name: 'anexos', type: 'string', nullable: false })
  anexos: string;

  @OneToMany(() => HistoricoDoacao, (doacao) => doacao.projeto)
  doacoes: HistoricoDoacao[];

  @ManyToMany(() => Usuario, (usuario) => usuario.projetos)
  usuarios: Usuario[];

  @ManyToMany(() => Interesse, (interesse) => interesse.projetos)
  @JoinTable()
  interesses: Interesse[];
}
