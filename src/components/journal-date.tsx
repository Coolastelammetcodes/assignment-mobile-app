import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { journalStyles as styles } from './journal-styles';

export function formatJournalDate(date: string | Date) {
  const journalDate = new Date(date);
  return journalDate.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function JournalDate() {
  const [today, setToday] = useState(new Date());
  useEffect(() => {
    // Refresh the date if the journal stays open across midnight.
    const timer = setInterval(() => {
      setToday(new Date());
    }, 30000);
    // Stop the timer when this component unmounts to avoid leaving background work running.
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <Text style={styles.text}>{formatJournalDate(today)}</Text>;
}
