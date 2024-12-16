import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import cuid from "cuid";  // Importer le générateur de cuid

@Entity() // Marque cette classe comme une entité TypeORM
export class Voiture {
  @PrimaryGeneratedColumn("uuid")
  id: string = cuid();  // Utiliser cuid comme identifiant unique

  @Column()
  marque?: string;

  @Column()
  modele?: string;

  @Column()
  annee?: number;
}
