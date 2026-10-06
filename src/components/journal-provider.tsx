import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { randomUUID } from 'expo-crypto';
import Storage from '@/utils/journal-storage';
import type { JournalEntry } from '@/types/journal';

type JournalContextValue = {
  entries: JournalEntry[];
  loading: boolean;
  error: string;
  saveEntry: (rating: number, notes: string[]) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
};

const JournalContext = createContext<JournalContextValue | null>(null);

const storageKey = 'journal-entries';

type Props = {
  children: ReactNode;
};

export default function JournalProvider({ children }: Props) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadEntries() {
    try {
      setLoading(true);

      const saved = await Storage.getItem(storageKey);

      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        setEntries([]);
      }
    } catch {
      setError('Kunde inte läsa journalerna.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function saveEntry(rating: number, notes: string[]) {
    const entry: JournalEntry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      rating,
      notes,
    };

    const updatedEntries = [entry, ...entries];

    await Storage.setItem(
      storageKey,
      JSON.stringify(updatedEntries)
    );

    setEntries(updatedEntries);
  }

  async function deleteEntry(id: string) {
    const updatedEntries = entries.filter(
      (entry) => entry.id !== id
    );

    await Storage.setItem(
      storageKey,
      JSON.stringify(updatedEntries)
    );

    setEntries(updatedEntries);
  }

  return (
    <JournalContext.Provider
      value={{
        entries,
        loading,
        error,
        saveEntry,
        deleteEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);

  if (!context) {
    throw new Error('useJournal måste användas med JournalProvider');
  }

  return context;
}