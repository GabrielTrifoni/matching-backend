import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projeto } from '../../projeto/entities/projeto.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Interesse {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'status', type: 'varchar', length: 30, nullable: false })
  status: string;

  @Column({ name: 'motivo', type: 'varchar', length: 255, nullable: false })
  motivo: string;

  @OneToMany(() => Usuario, (usuario) => usuario.interesses)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;

  @OneToMany(() => Projeto, (projeto) => projeto.interesses)
  @JoinColumn({ name: 'id_projeto', referencedColumnName: 'id' })
  projeto: Projeto;
}
