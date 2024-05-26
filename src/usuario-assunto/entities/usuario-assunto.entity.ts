import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Assunto } from '../../assunto/entities/assunto.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class UsuarioAssunto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.assuntos)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;

  @ManyToOne(() => Assunto, (assunto) => assunto.userAssuntos)
  @JoinColumn({ name: 'id_assunto', referencedColumnName: 'id' })
  assunto: Assunto;
}
