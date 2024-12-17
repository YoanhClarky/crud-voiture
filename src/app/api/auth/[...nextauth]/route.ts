import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { TypeORMAdapter } from "@auth/typeorm-adapter"
import { dbConfig, AppDataSource } from '../../../../config/database'
import { User } from '../../../../models/User'
import bcrypt from "bcryptjs";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set");
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          // Vérifier si la connexion est déjà initialisée
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }

          const user = await AppDataSource.getRepository(User).findOne({
            where: { email: credentials.email },
          });

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return { id: user.id.toString(), email: user.email };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Autres configurations...
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

