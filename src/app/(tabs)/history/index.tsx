import { Link } from 'expo-router';
import { StyleSheet, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JournalCard from '@/components/history-card';
import { useJournal } from '@/components/journal-provider';

export default function History() {
  const journal = useJournal();
  let emptyMessage = 'Inga inlägg ännu. Börja med några tankar om din dag.';

  if (journal.loading) {
    emptyMessage = 'Läser historiken…';
  } else if (journal.error !== '') {
    emptyMessage = journal.error;
  }

  return (
    <SafeAreaView style={s.root} edges={['top', 'left', 'right']}>
      {/* FlatList creates cards as needed, so a long history still scrolls smoothly. */}
      <FlatList
        data={journal.entries}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => <JournalCard entry={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={
          <View style={s.heading}>
            <Text style={s.title}>Historik</Text>
            <Text style={s.text}>Dina sparade tankar, med det senaste inlägget först.</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={s.card}>
            <Text style={s.cardText}>{emptyMessage}</Text>
            {journal.error !== '' && (
              <Pressable style={s.button} onPress={journal.Reload} accessibilityRole="button">
                <Text style={s.buttonText}>Försök igen</Text>
              </Pressable>
            )}
            {!journal.loading && journal.error === '' && (
              <Link href="/journal" style={s.label}>Skriv ditt första inlägg →</Link>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#120239',
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  heading: {
    gap: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#F2EFF7',
  },
  text: {
    color: '#F2EFF7',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#E7E2EF',
    padding: 18,
    borderRadius: 16,
    gap: 10,
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
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  label: {
    color: '#120239',
    fontSize: 18,
    fontWeight: '600',
  },
});
