import { HistoricoDoacao } from 'src/historico_doacao/entities/historico_doacao.entity';
import { Interesse } from 'src/interesse/entities/interesse.entity';
import { Noticia } from 'src/noticia/entities/noticia.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import {
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'email', type: 'string', nullable: false })
  email: string;

  @Column({ name: 'nome_completo', type: 'string', nullable: false })
  nome_completo: string;

  @Column({ name: 'cpf', type: 'int', nullable: false, length: 11 })
  cpf: number;

  @Column({ name: 'tipo', type: 'string', nullable: false })
  tipo: string;

  @Column({ name: 'telefone', type: 'string', nullable: false, length: 9 })
  telefone: number;

  @Column({ name: 'documento', type: 'int', nullable: false })
  documento: number;

  @Column({ name: 'pFisica', type: 'boolean', nullable: false })
  pFisica: boolean;

  @OneToMany(() => Noticia, (noticia) => noticia.usuario)
  noticias: Noticia[];

  @OneToMany(() => HistoricoDoacao, (doacao) => doacao.usuario)
  doacoes: HistoricoDoacao[];

  @ManyToMany(() => Projeto, (projeto) => projeto.usuarios)
  @JoinTable()
  projetos: Projeto[];

  @ManyToMany(() => Interesse, (interesse) => interesse.usuarios)
  @JoinTable()
  interesses: Interesse[];
}
