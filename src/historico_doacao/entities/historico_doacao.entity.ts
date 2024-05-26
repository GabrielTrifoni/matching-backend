import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doacao } from '../../doacao/entities/doacao.entity';

@Entity()
export class HistoricoDoacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'transacao', type: 'varchar', nullable: false })
  transacao: string;

  @Column({
    name: 'data_transacao',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  dataTransacao: number;

  @ManyToOne(() => Usuario, (usuario) => usuario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;

  @ManyToOne(() => Doacao, (doacao) => doacao.doacoes)
  @JoinColumn({ name: 'id_doacao', referencedColumnName: 'id' })
  doacao: Doacao;
}
