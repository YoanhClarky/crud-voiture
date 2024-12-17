// src/config/database.ts
import { DataSource } from "typeorm"
import { Voiture } from "../models/Voiture" // Exemple d'entité
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: "mysql", // ou "postgres", "sqlite", etc.
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "testdb",
    password: process.env.DB_PASSWORD || "#LSO97fZdpHTcj7rLUfJ8",
    database: process.env.DB_NAME || "testdb",
    entities: [Voiture], // Listez toutes vos entités ici
    synchronize: true, // ⚠️ À utiliser uniquement en développement
    logging: false,
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