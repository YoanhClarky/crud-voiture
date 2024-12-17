'use client';

import { useSession, signOut } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Accès refusé. Veuillez vous connecter.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Bienvenue {session?.user?.email}</p>
      
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Dashboard;

