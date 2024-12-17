// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { AppDataSource } from '../../../../config/database';
import { User } from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    // Attendre que la connexion soit établie si nécessaire
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { email, password } = await req.json();

    const existingUser = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email déjà utilisé' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;

    await AppDataSource.getRepository(User).save(newUser);

    return NextResponse.json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l inscription:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l inscription' },
      { status: 500 }
    );
  }
}