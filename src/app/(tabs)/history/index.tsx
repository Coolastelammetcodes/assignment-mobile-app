import { Link } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JournalCard from '@/components/journal-card';
import { useJournal } from '@/components/journal-provider';
import { journalStyles as styles } from '@/components/journal-styles';

export default function History() {
  const journal = useJournal();
  let emptyMessage = 'Inga inlägg ännu. Börja med några tankar om din dag.';

  if (journal.loading) {
    emptyMessage = 'Läser historiken…';
  } else if (journal.error !== '') {
    emptyMessage = journal.error;
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      {/* FlatList creates cards as needed, so a long history still scrolls smoothly. */}
      <FlatList
        data={journal.entries}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => <JournalCard entry={item} />}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.heading}>
            <Text style={styles.title}>Historik</Text>
            <Text style={styles.text}>Dina sparade tankar, med det senaste inlägget först.</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.card}>
            <Text style={styles.cardText}>{emptyMessage}</Text>
            {journal.error !== '' && (
              <Pressable style={styles.button} onPress={journal.reload} accessibilityRole="button">
                <Text style={styles.buttonText}>Försök igen</Text>
              </Pressable>
            )}
            {!journal.loading && journal.error === '' && (
              <Link href="/journal" style={styles.label}>Skriv ditt första inlägg →</Link>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}
