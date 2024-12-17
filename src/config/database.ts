// src/config/database.ts
import "reflect-metadata";
import { DataSource } from "typeorm"
import { Voiture } from "../models/Voiture"
import { User } from "../models/User"
import "dotenv/config";

// Configuration de la base de données
export const dbConfig = {
    type: "mysql" as const, // le "as const" est important ici
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "testdb",
    password: process.env.DB_PASSWORD || "#LSO97fZdpHTcj7rLUfJ8",
    database: process.env.DB_NAME || "testdb",
    entities: [Voiture, User],
    synchronize: true,
    logging: true,
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
}

// Instance DataSource pour l'application
export const AppDataSource = new DataSource(dbConfig);

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