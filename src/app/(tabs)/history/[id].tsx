import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '@/components/journal-provider';
import { formatJournalDate } from '@/components/journal-date';
import { journalStyles as styles } from '@/components/journal-styles';

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
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/history" style={styles.text} >← Till historiken</Link>

        {!entry && <Text style={styles.text}>{missingMessage}</Text>}

        {entry && (
          <View style={styles.form}>
            <Text style={styles.title}>{formatJournalDate(entry.createdAt)}</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Dagens betyg: {entry.rating}/10</Text>
              <Text style={styles.label}>Tankar för dagen</Text>
              {/* map creates one line for each thought. */}
              {entry.notes.map((note, index) => (
                <Text key={index} style={styles.cardText}>• {note}</Text>
              ))}
            </View>

            {!confirmDelete && (
              <Pressable
                style={[styles.button, styles.deleteButton]}
                accessibilityRole="button"
                onPress={() => setConfirmDelete(true)}
              >
                <Text style={styles.buttonText}>Ta bort inlägg</Text>
              </Pressable>
            )}

            {/* This state shows the confirmation before anything is deleted. */}
            {confirmDelete && (
              <View style={styles.card}>
                <Text style={styles.cardText}>Vill du ta bort inlägget? Det går inte att ångra.</Text>
                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  accessibilityRole="button"
                  disabled={deleting}
                  onPress={removeEntry}
                >
                  <Text style={styles.buttonText}>{deleteButtonText}</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  accessibilityRole="button"
                  disabled={deleting}
                  onPress={() => setConfirmDelete(false)}
                >
                  <Text style={styles.buttonText}>Avbryt</Text>
                </Pressable>
              </View>
            )}
            {message !== '' && (
              <Text style={styles.text} accessibilityLiveRegion="polite">{message}</Text>
            )}
          </View>
        )}

        {journal.error !== '' && (
          <Pressable style={styles.button} accessibilityRole="button" onPress={journal.reload}>
            <Text style={styles.buttonText}>Försök igen</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
