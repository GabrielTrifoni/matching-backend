import { HistoricoDoacao } from 'src/historico_doacao/entities/historico_doacao.entity';
import { Interesse } from 'src/interesse/entities/interesse.entity';
import { Divulgacao } from 'src/divulgacao/entities/divulgacao.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioAssunto } from '../../usuario-assunto/entities/usuario-assunto.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'senha', type: 'varchar', nullable: false })
  senha: string;

  @Column({ name: 'nome_completo', type: 'varchar', nullable: false })
  nomeCompleto: string;

  @Column({
    unique: true,
    name: 'cpf',
    type: 'char',
    nullable: false,
    length: 11,
  })
  cpf: string;

  @Column({ name: 'papel', type: 'varchar', nullable: false, length: 30 })
  papel: string;

  @Column({ name: 'telefone', type: 'char', nullable: false, length: 9 })
  telefone: string;

  @Column({
    name: 'curriculo',
    type: 'varchar',
    nullable: false,
    length: 1024,
  })
  curriculo: string;

  @OneToMany(() => Projeto, (projeto) => projeto.responsavel)
  projetos: Projeto[];

  @ManyToOne(() => Interesse, (interesse) => interesse.usuario)
  interesses: Interesse[];

  @OneToMany(() => Divulgacao, (divulgacao) => divulgacao.usuario)
  divulgacoes: Divulgacao[];

  @OneToMany(() => HistoricoDoacao, (doacao) => doacao.usuario)
  doacoes: HistoricoDoacao[];

  @OneToMany(() => UsuarioAssunto, (userAssunto) => userAssunto.usuario)
  assuntos: UsuarioAssunto[];
}
