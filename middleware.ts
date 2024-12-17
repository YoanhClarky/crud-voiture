import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Vérifier si l'utilisateur est sur une page d'authentification
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/')

  if (isAuthPage) {
    if (token) {
      // Si l'utilisateur est connecté et essaie d'accéder à une page d'authentification,
      // le rediriger vers le dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    // Pour les autres pages, vous pouvez ajouter une logique de protection si nécessaire
    // Par exemple, rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Si aucune redirection n'est nécessaire, continuer normalement
  return NextResponse.next()
}

// Configurer sur quels chemins le middleware doit s'exécuter
export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
}

