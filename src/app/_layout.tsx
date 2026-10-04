import { Stack } from "expo-router";
import JournalProvider from '@/components/journal-provider';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <JournalProvider>
      {/* Light status bar text stays readable against the app's dark background. */}
      <StatusBar style="light" />
      <Stack screenOptions={{headerShown:false}}/>
    </JournalProvider>
  );
}
