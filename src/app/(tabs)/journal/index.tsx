import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JournalDate from '@/components/journal-date';
import JournalForm from '@/components/journal-form';

export default function Journal() {
  let keyboardBehavior: 'height' | 'padding' = 'height';
  if (Platform.OS === 'ios') {
    keyboardBehavior = 'padding';
  }

  return (
    <SafeAreaView style={journalStyles.root} edges={['top', 'left', 'right']}>
      {/* Keep the form reachable when the keyboard covers the bottom of the screen. */}
      <KeyboardAvoidingView style={journalStyles.fill} behavior={keyboardBehavior}>
        <ScrollView contentContainerStyle={journalStyles.content} keyboardShouldPersistTaps="handled">
          <Text style={journalStyles.title}>Journal</Text>
          <JournalDate />
          <JournalForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const journalStyles = StyleSheet.create({
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
