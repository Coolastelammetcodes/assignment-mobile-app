import { Link } from 'expo-router';
import { StyleSheet, Pressable, Text } from 'react-native';
import type { JournalEntry } from '@/types/journal';
import { formatJournalDate } from './journal-date';

type Props = {
  entry: JournalEntry;
};

export default function HistoryCard({ entry }: Props) {
  const date = formatJournalDate(entry.createdAt);
  return (
    <Link href={{ pathname: '/history/[id]', params: { id: entry.id } }} asChild>
      <Pressable style={s.card} accessibilityRole="button" accessibilityLabel={`Öppna inlägg från ${formatJournalDate(entry.createdAt)}`}>
        <Text style={[s.label, s.cardTitle]}>{date}</Text>
        <Text style={s.label}>Dagens betyg: {entry.rating}/10</Text>
        <Text style={s.label}>Tankar för dagen</Text>
        {entry.notes.map((note, index) => (
          <Text key={index} style={s.cardText}>• {note}</Text>
        ))}
        <Text style={s.label}>Läs inlägget →</Text>
      </Pressable>
    </Link>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#E7E2EF',
    padding: 18,
    borderRadius: 16,
    gap: 10,
  },
  label: {
    color: '#120239',
    fontSize: 18,
    fontWeight: '400',
  },
  cardTitle:{
    fontSize:25,
    fontWeight:"bold"
  },
  cardText: {
    color: '#120239',
    fontSize: 16,
    lineHeight: 24,
    fontStyle:"italic"
  },
});
