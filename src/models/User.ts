import { Entity, PrimaryColumn, Column } from 'typeorm';
import cuid from 'cuid';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 25 })
  id: string = cuid();

  @Column()
  email: string;

  @Column()
  password: string;

  // Ajoutez d'autres colonnes si nécessaire
}
