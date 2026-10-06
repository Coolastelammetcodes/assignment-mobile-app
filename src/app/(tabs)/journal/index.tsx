import { StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JournalDate from '@/components/journal-date';
import JournalForm from '@/components/journal-form';

export default function Journal() {
  return (
    <SafeAreaView style={s.root} edges={['top', 'left', 'right']}>
      {/* Keep the form reachable when the keyboard covers the bottom of the screen. */}
        <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
          <Text style={s.title}>Journal</Text>
          <JournalDate />
          <JournalForm />
        </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#120239',
  },
  fill: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#F2EFF7',
  },
});
