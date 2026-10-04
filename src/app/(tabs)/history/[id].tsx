import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '@/components/journal-provider';
import { formatJournalDate } from '@/components/journal-date';

export default function JournalDetails() {
  // The history card sends an ID in the URL. Find the entry with that ID.
  const parameters = useLocalSearchParams<{ id: string }>();
  const journal = useJournal();
  const entry = journal.entries.find((item) => item.id === parameters.id);

  const [message, setMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  let deleteButtonText = 'Ja, ta bort';
  if (deleting) {
    deleteButtonText = 'Tar bort…';
  }

  let missingMessage = 'Inlägget kunde inte hittas.';
  if (journal.loading) {
    missingMessage = 'Läser inlägget…';
  } else if (journal.error !== '') {
    missingMessage = journal.error;
  }

  async function removeEntry() {
    if (!entry || deleting) {
      return;
    }

    setDeleting(true);
    setMessage('');
    try {
      // Return to History only after the change is saved on the phone.
      await journal.deleteEntry(entry.id);
      router.replace('/history');
    } catch {
      setMessage('Kunde inte ta bort inlägget. Försök igen.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <SafeAreaView style={journalStyles.root} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={journalStyles.content}>
        <Link href="/history" style={journalStyles.text} >← Till historiken</Link>

        {!entry && <Text style={journalStyles.text}>{missingMessage}</Text>}

        {entry && (
          <View style={journalStyles.form}>
            <Text style={journalStyles.title}>{formatJournalDate(entry.createdAt)}</Text>
            <View style={journalStyles.card}>
              <Text style={journalStyles.label}>Dagens betyg: {entry.rating}/10</Text>
              <Text style={journalStyles.label}>Tankar för dagen</Text>
              {/* map creates one line for each thought. */}
              {entry.notes.map((note, index) => (
                <Text key={index} style={journalStyles.cardText}>• {note}</Text>
              ))}
            </View>

            {!confirmDelete && (
              <Pressable
                style={[journalStyles.button, journalStyles.deleteButton]}
                accessibilityRole="button"
                onPress={() => setConfirmDelete(true)}
              >
                <Text style={journalStyles.buttonText}>Ta bort inlägg</Text>
              </Pressable>
            )}

            {/* This state shows the confirmation before anything is deleted. */}
            {confirmDelete && (
              <View style={journalStyles.card}>
                <Text style={journalStyles.cardText}>Vill du ta bort inlägget? Det går inte att ångra.</Text>
                <Pressable
                  style={[journalStyles.button, journalStyles.deleteButton]}
                  accessibilityRole="button"
                  disabled={deleting}
                  onPress={removeEntry}
                >
                  <Text style={journalStyles.buttonText}>{deleteButtonText}</Text>
                </Pressable>
                <Pressable
                  style={journalStyles.button}
                  accessibilityRole="button"
                  disabled={deleting}
                  onPress={() => setConfirmDelete(false)}
                >
                  <Text style={journalStyles.buttonText}>Avbryt</Text>
                </Pressable>
              </View>
            )}
            {message !== '' && (
              <Text style={journalStyles.text} accessibilityLiveRegion="polite">{message}</Text>
            )}
          </View>
        )}

        {journal.error !== '' && (
          <Pressable style={journalStyles.button} accessibilityRole="button" onPress={journal.reload}>
            <Text style={journalStyles.buttonText}>Försök igen</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const journalStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#120239',
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  text: {
    color: '#F2EFF7',
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#F2EFF7',
  },
  card: {
    backgroundColor: '#E7E2EF',
    padding: 18,
    borderRadius: 16,
    gap: 10,
  },
  label: {
    color: '#120239',
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    color: '#120239',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#6D438D',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    minHeight: 48,
  },
  deleteButton: {
    backgroundColor: '#923D50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
