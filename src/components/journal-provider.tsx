import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { randomUUID } from 'expo-crypto';
import Storage from '@/utils/journal-storage';
import type { JournalEntry } from '@/types/journal';

type JournalContextValue = {
  entries: JournalEntry[];
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
  saveEntry: (rating: number, notes: string[]) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
};
// Context lets Journal and History use the same entries and functions.
const JournalContext = createContext<JournalContextValue | null>(null);
const storageKey = 'journal-entries';

type Props = {
  children: ReactNode;
};

export default function JournalProvider({ children }: Props) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // This lock prevents saving and deleting from changing storage at the same time.
  const storageBusy = useRef(false);

  async function reload() {
    setLoading(true);
    setError('');
    try {
      const saved = await Storage.getItem(storageKey);
      // Storage returns text; JSON.parse turns it back into the array used by the screens.
      if (saved === null) {
        setEntries([]);
      } else {
        const savedEntries: JournalEntry[] = JSON.parse(saved);
        setEntries(savedEntries);
      }
    } catch {
      setError('Kunde inte läsa historiken. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  // An empty dependency array loads saved entries when the provider first mounts.
  useEffect(() => {
    reload();
  }, []);

  async function saveEntry(rating: number, notes: string[]) {
    if (loading || error !== '' || storageBusy.current) {
      throw new Error('Journal is not ready');
    }
    storageBusy.current = true;
    try {
      // A unique ID lets the detail screen find the entry through a route parameter.
      const entry: JournalEntry = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        rating: rating,
        notes: notes,
      };
      // Put the new entry first and copy the older entries without changing the original array.
      const updated = [entry, ...entries];
      // Update the screen only after storage succeeds, so failed saves keep the draft.
      // JSON.stringify converts the array into text for key-value storage.
      const savedText = JSON.stringify(updated);
      await Storage.setItem(storageKey, savedText);
      setEntries(updated);
    } finally {
      storageBusy.current = false;
    }
  }

  async function deleteEntry(id: string) {
    if (loading || error !== '' || storageBusy.current) {
      throw new Error('Journal is not ready');
    }
    storageBusy.current = true;
    try {
      // Keep every entry except the one with the selected ID.
      const remaining = entries.filter((entry) => entry.id !== id);
      // Save first. If storage fails, the entry stays on screen so the user can try again.
      const savedText = JSON.stringify(remaining);
      await Storage.setItem(storageKey, savedText);
      setEntries(remaining);
    } finally {
      storageBusy.current = false;
    }
  }

  const journal = {
    entries: entries,
    loading: loading,
    error: error,
    reload: reload,
    saveEntry: saveEntry,
    deleteEntry: deleteEntry,
  };

  return (
    <JournalContext.Provider value={journal}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === null) {
    throw new Error('useJournal needs JournalProvider');
  }
  return context;
}
