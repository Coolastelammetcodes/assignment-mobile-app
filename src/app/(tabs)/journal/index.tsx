import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JournalDate from '@/components/journal-date';
import JournalForm from '@/components/journal-form';
import { journalStyles as styles } from '@/components/journal-styles';

export default function Journal() {
  let keyboardBehavior: 'height' | 'padding' = 'height';
  if (Platform.OS === 'ios') {
    keyboardBehavior = 'padding';
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      {/* Keep the form reachable when the keyboard covers the bottom of the screen. */}
      <KeyboardAvoidingView style={styles.fill} behavior={keyboardBehavior}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Journal</Text>
          <JournalDate />
          <JournalForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
