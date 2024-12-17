'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Accès refusé. Veuillez vous connecter.</div>;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Bienvenue {session?.user?.email}</p>
      
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:bg-red-300 disabled:cursor-not-allowed"
      >
        {isLoggingOut ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Déconnexion...
          </span>
        ) : (
          'Se déconnecter'
        )}
      </button>
    </div>
  );
};

export default Dashboard;

