'use client';

import { useEffect, useState } from 'react';

interface Voiture {
  id: number;
  marque: string;
  modele: string;
  annee: number;
}

export default function VoituresPage() {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [nouvelleVoiture, setNouvelleVoiture] = useState<Voiture>({
    id: 0,
    marque: '',
    modele: '',
    annee: 2024,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Ajout de l'état loading

  useEffect(() => {
    fetchVoitures();
  }, []);

  const fetchVoitures = async () => {
    try {
      const response = await fetch('/api/voitures');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des voitures');
      }
      const data: Voiture[] = await response.json();
      setVoitures(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Erreur: ${err.message}`);
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setLoading(false); // Une fois les données récupérées ou en cas d'erreur, on désactive le loading
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNouvelleVoiture({
      ...nouvelleVoiture,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/voitures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouvelleVoiture),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la voiture');
      }
      const voiture: Voiture = await response.json();
      setVoitures((prev) => [...prev, voiture]);
      setNouvelleVoiture({
        id: 0,
        marque: '',
        modele: '',
        annee: 2024,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Erreur: ${err.message}`);
      } else {
        setError('Erreur inconnue');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Liste des Voitures</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <ul className="space-y-4 mb-8">
        {loading ? (
          // Skeleton loader pendant le chargement
          <div className="space-y-4">
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ) : (
          // Liste des voitures lorsque les données sont chargées
          voitures.map((voiture) => (
            <li
              key={voiture.id}
              className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg hover:bg-indigo-50 transition"
            >
              <span className="text-lg font-semibold">{voiture.marque} {voiture.modele}</span>
              <span className="text-sm text-gray-500">({voiture.annee})</span>
            </li>
          ))
        )}
      </ul>

      <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Ajouter une voiture</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="marque" className="block text-sm font-medium text-gray-700">Marque</label>
          <input
            type="text"
            id="marque"
            name="marque"
            value={nouvelleVoiture.marque}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="modele" className="block text-sm font-medium text-gray-700">Modèle</label>
          <input
            type="text"
            id="modele"
            name="modele"
            value={nouvelleVoiture.modele}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="annee" className="block text-sm font-medium text-gray-700">Année</label>
          <input
            type="number"
            id="annee"
            name="annee"
            value={nouvelleVoiture.annee}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
