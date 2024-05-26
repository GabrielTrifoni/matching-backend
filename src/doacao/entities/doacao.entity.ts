import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projeto } from '../../projeto/entities/projeto.entity';
import { HistoricoDoacao } from '../../historico_doacao/entities/historico_doacao.entity';

@Entity()
export class Doacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'valor_doado', type: 'decimal', nullable: false })
  valorDoado: number = 0;

  @Column({ name: 'valor_esperado', type: 'decimal', nullable: false })
  valorEsperado: number;

  @Column({ name: 'abertura', type: 'date', nullable: false })
  abertura: Date = new Date();

  @Column({ name: 'fechamento', type: 'date', nullable: false })
  fechamento: Date;

  @OneToOne(() => Projeto, (projeto) => projeto.doacao)
  @JoinColumn({ name: 'id_projeto', referencedColumnName: 'id' })
  projeto: Projeto;

  @OneToMany(() => HistoricoDoacao, (doacoes) => doacoes.doacao)
  doacoes: HistoricoDoacao[];
}
