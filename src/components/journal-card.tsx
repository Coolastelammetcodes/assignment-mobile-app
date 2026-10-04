import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import type { JournalEntry } from '@/types/journal';
import { formatJournalDate } from './journal-date';
import { journalStyles as styles } from './journal-styles';

type Props = {
  entry: JournalEntry;
};

export default function JournalCard({ entry }: Props) {
  const date = formatJournalDate(entry.createdAt);
  return (
    <Link href={{ pathname: '/history/[id]', params: { id: entry.id } }} asChild>
      <Pressable style={styles.card} accessibilityRole="button" accessibilityLabel={`Öppna inlägg från ${formatJournalDate(entry.createdAt)}`}>
        <Text style={styles.label}>{date}</Text>
        <Text style={styles.label}>Dagens betyg: {entry.rating}/10</Text>
        <Text style={styles.label}>Tankar för dagen</Text>
        {entry.notes.map((note, index) => (
          <Text key={index} style={styles.cardText}>• {note}</Text>
        ))}
        <Text style={styles.label}>Läs inlägget →</Text>
      </Pressable>
    </Link>
  );
}
