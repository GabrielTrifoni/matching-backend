import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class HistoricoDoacao {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'id_transacao', type: 'string', nullable: false })
  id_transacao: string;

  @Column({ name: 'valor', type: 'float', nullable: false })
  valor: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.doacoes)
  usuario: Usuario;

  @ManyToOne(() => Projeto, (projeto) => projeto.doacoes)
  projeto: Projeto;
}
