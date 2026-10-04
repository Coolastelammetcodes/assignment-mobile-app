import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

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
  return <Text style={s.text}>{formatJournalDate(today)}</Text>;
}

const s = StyleSheet.create({
  text: {
    color: '#F2EFF7',
    fontSize: 16,
    lineHeight: 24,
  },
});
