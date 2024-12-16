import { ensureDatabaseInitialized } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Assurez-vous que la base de données est initialisée
    await ensureDatabaseInitialized();

    return NextResponse.json({ status: 'connected' });
  } catch (error) {
    // Vérifiez si l'erreur est une instance de `Error`
    if (error instanceof Error) {
      console.error("Erreur lors de la connexion à la base de données:", error.message);
      return NextResponse.json({ status: 'not connected', error: error.message });
    }

    // Gérer les autres types d'erreur (par exemple, une chaîne ou un objet brut)
    console.error("Erreur inconnue:", error);
    return NextResponse.json({ status: 'not connected', error: 'Une erreur inconnue est survenue' });
  }
}