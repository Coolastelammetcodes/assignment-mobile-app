import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import InputPills from './input-pills';
import RatingSlider from './rating-slider';
import { useJournal } from './journal-provider';

export default function JournalForm() {
  const [rating, setRating] = useState(10);
  const [text, setText] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const journal = useJournal();

  // A ref remembers a value without waiting for the screen to update.
  // This stops two quick taps from saving the same draft twice.
  const submitting = useRef(false);

  const emptyDraft = notes.length === 0 && text.trim() === '';
  const saveDisabled = journal.loading || journal.error !== '' || saving || emptyDraft;

  let saveButtonText = 'Spara inlägg';
  if (saving) {
    saveButtonText = 'Sparar…';
  }

  async function saveJournal() {
    if (saveDisabled || submitting.current) {
      return;
    }

    // Copy the thoughts so we do not change React state directly.
    const allNotes = [...notes];
    const lastThought = text.trim();
    if (lastThought !== '') {
      allNotes.push(lastThought);
    }

    submitting.current = true;
    setSaving(true);
    setSaveError('');

    try {
      // await waits for storage. Only clear the draft after saving succeeds.
      await journal.saveEntry(rating, allNotes);
      setNotes([]);
      setText('');
      setRating(10);
      router.navigate('/history');
    } catch {
      setSaveError('Kunde inte spara inlägget. Din text finns kvar, försök igen.');
    } finally {
      // finally runs whether saving succeeds or fails.
      submitting.current = false;
      setSaving(false);
    }
  }

  return (
    <View style={s.form}>
      <Text style={s.text}>Ge dagen ett betyg mellan 1–10</Text>
      <RatingSlider
        value={rating}
        highestValue={10}
        step={1}
        textColor="#E7E2EF"
        sliderColor="#AAA0C8"
        onChange={setRating}
        disabled={saving}
      />
      <InputPills
        text={text}
        items={notes}
        onChangeText={setText}
        onChangeItems={setNotes}
        disabled={saving}
      />
      {/* && shows the message only when the condition is true. */}
      {journal.loading && <Text style={s.text}>Läser journalen…</Text>}
      {journal.error !== '' && (
        <View style={s.form}>
          <Text style={s.text}>{journal.error}</Text>
          <Pressable style={s.button} onPress={journal.reload} accessibilityRole="button">
            <Text style={s.buttonText}>Försök igen</Text>
          </Pressable>
        </View>
      )}
      {saveError !== '' && (
        <Text style={s.text} accessibilityRole="alert">{saveError}</Text>
      )}
      <Pressable
        style={[s.button, saveDisabled && s.disabled]}
        accessibilityRole="button"
        disabled={saveDisabled}
        onPress={saveJournal}
      >
        <Text style={s.buttonText}>{saveButtonText}</Text>
      </Pressable>
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
});
