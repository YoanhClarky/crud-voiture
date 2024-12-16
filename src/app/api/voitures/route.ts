import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "../../../config/database";
import { Voiture } from "../../../models/Voiture";
import cuid from "cuid";

// Récupérer toutes les voitures
export async function GET() {
  try {
    // Initialisation de la base de données
    await initializeDatabase();

    const voitureRepository = AppDataSource.getRepository(Voiture);
    const voitures = await voitureRepository.find();
    return NextResponse.json(voitures);
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des voitures" },
      { status: 500 }
    );
  }
}

// Créer une nouvelle voiture
export async function POST(request: Request) {
  try {
    // Initialisation de la base de données
    await initializeDatabase();

    const voitureRepository = AppDataSource.getRepository(Voiture);
    const data = await request.json();
    const nouvelleVoiture = voitureRepository.create({
      ...data,
      id: cuid(),  // Générer un id cuid
    });
    const voitureEnregistree = await voitureRepository.save(nouvelleVoiture);
    return NextResponse.json(voitureEnregistree, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la voiture:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la voiture" },
      { status: 500 }
    );
  }
}

// Mettre à jour une voiture
export async function PUT(request: Request) {
  try {
    const voitureRepository = AppDataSource.getRepository(Voiture);
    const data = await request.json();
    const { id, ...champs } = data;

    const voiture = await voitureRepository.findOneBy({ id });
    if (!voiture) {
      return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 });
    }

    Object.assign(voiture, champs);
    const voitureMiseAJour = await voitureRepository.save(voiture);
    return NextResponse.json(voitureMiseAJour);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la voiture:", error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la voiture' }, { status: 500 });
  }
}

// Supprimer une voiture
export async function DELETE(request: Request) {
  try {
    const voitureRepository = AppDataSource.getRepository(Voiture);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID de la voiture non fourni' }, { status: 400 });
    }

    const voiture = await voitureRepository.findOneBy({ id });
    if (!voiture) {
      return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 });
    }

    await voitureRepository.remove(voiture);
    return NextResponse.json({ message: 'Voiture supprimée avec succès' });
  } catch (error) {
    console.error("Erreur lors de la suppression de la voiture:", error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de la voiture' }, { status: 500 });
  }
}
