import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import InputPills from './input-pills';
import RatingSlider from './rating-slider';
import { useJournal } from './journal-provider';
import JournalDescription from './journal-description';

export default function JournalForm() {
  const [rating, setRating] = useState(10);
  const [items, setItems] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const journal = useJournal();

  const emptyDraft =
    items.length === 0 &&
    description.trim() === '';

  const saveDisabled =
    journal.loading ||
    journal.error !== '' ||
    saving ||
    emptyDraft;

  async function saveJournal() {
    if (saveDisabled) {
      return;
    }

    setSaving(true);
    setSaveError('');

    try {
      await journal.saveEntry(
        rating,
        items,
        description.trim()
      );

      setItems([]);
      setDescription('');
      setRating(10);

      router.navigate('/history');
    } catch {
      setSaveError(
        'Kunde inte spara inlägget. Din text finns kvar, försök igen.'
      );
    } finally {
      setSaving(false);
    }
  }

  return(
    <View style={s.form}>
      <RatingSlider value={rating} highestValue={10} step={1} sliderColor='#6D438D' onChange={setRating} />
      <Text style={s.text}>Skriv enstaka ord för att beskriva dagen</Text>
      <InputPills disabled={false} />
      <JournalDescription />
    </View>
  );
}

const s = StyleSheet.create({
  form: {
    gap: 16,
  },
  text: {
    color: '#F2EFF7',
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
  disabled: {
    opacity: 0.5,
  },
  inputGroup: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E7E2EF',
  },
  input: {
    borderRadius: 0,
  },
  inputBase: {
    backgroundColor: '#E7E2EF',
    color: '#120239',
    padding: 14,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  // #1B0B4B → #2D176E → #8B7BFF → #D9D5FF
});
