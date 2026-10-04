import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import InputPills from './input-pills';
import RatingSlider from './rating-slider';
import { useJournal } from './journal-provider';
import { journalStyles as styles } from './journal-styles';

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
    <View style={styles.form}>
      <Text style={styles.text}>Ge dagen ett betyg mellan 1–10</Text>
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
      {journal.loading && <Text style={styles.text}>Läser journalen…</Text>}
      {journal.error !== '' && (
        <View style={styles.form}>
          <Text style={styles.text}>{journal.error}</Text>
          <Pressable style={styles.button} onPress={journal.reload} accessibilityRole="button">
            <Text style={styles.buttonText}>Försök igen</Text>
          </Pressable>
        </View>
      )}
      {saveError !== '' && (
        <Text style={styles.text} accessibilityRole="alert">{saveError}</Text>
      )}
      <Pressable
        style={[styles.button, saveDisabled && styles.disabled]}
        accessibilityRole="button"
        disabled={saveDisabled}
        onPress={saveJournal}
      >
        <Text style={styles.buttonText}>{saveButtonText}</Text>
      </Pressable>
    </View>
  );
}
