import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Interesse {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'nome', type: 'string', nullable: false })
  nome: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.interesses)
  usuarios: Usuario[];

  @ManyToMany(() => Projeto, (projeto) => projeto.interesses)
  projetos: Projeto[];
}
