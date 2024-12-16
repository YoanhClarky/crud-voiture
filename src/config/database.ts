// src/config/database.ts
import { DataSource } from "typeorm"
import { Voiture } from "../models/Voiture" // Exemple d'entité

export const AppDataSource = new DataSource({
    type: "mysql", // ou "postgres", "sqlite", etc.
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ma_db",
    entities: [Voiture], // Listez toutes vos entités ici
    synchronize: true, // ⚠️ À utiliser uniquement en développement
    logging: true,
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
})

// Fonction d'initialisation
export const initializeDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Base de données connectée et synchronisée avec succès");
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données:", error);
        throw error;
    }
}