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
    <div>
      <h1>Liste des Voitures</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {voitures.map((voiture) => (
          <li key={voiture.id}>
            {voiture.marque} {voiture.modele} ({voiture.annee})
          </li>
        ))}
      </ul>

      <h2>Ajouter une voiture</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="marque">Marque</label>
          <input
            type="text"
            id="marque"
            name="marque"
            value={nouvelleVoiture.marque}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="modele">Modèle</label>
          <input
            type="text"
            id="modele"
            name="modele"
            value={nouvelleVoiture.modele}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="annee">Année</label>
          <input
            type="number"
            id="annee"
            name="annee"
            value={nouvelleVoiture.annee}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
