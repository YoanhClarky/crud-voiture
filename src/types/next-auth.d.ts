// src/types/next-auth.d.ts
import 'next-auth'

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Ajoutez l'ID
      email: string;
    };
  }

  interface User {
    id: string; // Ajoutez l'ID ici aussi
    email: string;
  }

  interface JWT {
    id: string;
    email: string;
  }
}
