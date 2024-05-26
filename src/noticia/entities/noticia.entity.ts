import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Noticia {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'titulo', type: 'string', nullable: false })
  titulo: string;

  @Column({ name: 'data', type: 'date', nullable: false })
  data: Date;

  @Column({ name: 'descricao', type: 'text', nullable: false })
  descricao: string;

  @Column({ name: 'imagens', type: 'string', nullable: true })
  imagens: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.noticias)
  usuario: Usuario;
}
