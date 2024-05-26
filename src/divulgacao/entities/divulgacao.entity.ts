import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Divulgacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'titulo', type: 'varchar', nullable: false })
  titulo: string;

  @Column({ name: 'descricao', type: 'text', nullable: false })
  descricao: string;

  @Column({
    name: 'data_escrita',
    type: 'timestamp',
    nullable: false,
  })
  dataEscrita: Date = new Date();

  @Column({
    name: 'data_modificada',
    type: 'timestamp',
    nullable: false,
  })
  dataModificada: Date = new Date();

  @Column({ name: 'anexos', type: 'varchar', length: 512, nullable: true })
  anexos: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.divulgacoes)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;
}
