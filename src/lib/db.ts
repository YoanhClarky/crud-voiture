// src/lib/db.ts
import { initializeDatabase } from '../config/database'

let initialized = false

export async function ensureDatabaseInitialized() {
    if (
        !initialized && 
        process.env.NODE_ENV === 'development' && 
        typeof window === 'undefined'  // Vérifie qu'on est côté serveur
    ) {
        try {
            await initializeDatabase()
            initialized = true
            console.log('Database initialized successfully')
        } catch (error) {
            console.error('Failed to initialize database:', error)
            throw error
        }
    }
}