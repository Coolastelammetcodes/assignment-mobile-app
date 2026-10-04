import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { journalStyles } from './journal-styles';

// The parent owns the draft; callbacks update it when thoughts are added or removed.
type Props = {
  text: string;
  items: string[];
  onChangeText: (text: string) => void;
  onChangeItems: (items: string[]) => void;
  disabled: boolean;
};

export default function InputPills({ text, items, onChangeText, onChangeItems, disabled }: Props) {
  function addItem() {
    // trim removes surrounding whitespace and prevents empty thoughts.
    const newThought = text.trim();
    if (disabled || newThought === '') {
      return;
    }
    // Spread copies the existing thoughts into a new array before adding the new one.
    const updatedThoughts = [...items, newThought];
    onChangeItems(updatedThoughts);
    // Clear the parent's text state so the controlled input is ready for another thought.
    onChangeText('');
  }

  function removeItem(index: number) {
    // filter keeps every other index, so identical thoughts can be removed separately.
    const remainingThoughts = items.filter((item, itemIndex) => itemIndex !== index);
    onChangeItems(remainingThoughts);
  }

  const addDisabled = disabled || text.trim() === '';
  return (
    <View style={styles.container}>
      <Text style={journalStyles.text}>Vad vill du minnas från dagen?</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={[journalStyles.input, styles.input]}
          placeholder="Skriv en tanke om dagen…"
          placeholderTextColor="#625775"
          accessibilityLabel="Anteckning om dagen"
          multiline
          value={text}
          onChangeText={onChangeText}
          editable={!disabled}
        />
        <Pressable
          style={[journalStyles.button, styles.addButton, addDisabled && journalStyles.disabled]}
          onPress={addItem}
          disabled={addDisabled}
          accessibilityRole="button"
          accessibilityState={{ disabled: addDisabled }}
        >
          <Text style={journalStyles.buttonText}>Lägg till tanke</Text>
        </Pressable>
      </View>
      <View style={styles.pillList}>
        {/* map creates one pill per thought and gives its remove button the matching index. */}
        {items.map((item, index) => (
          <View key={index} style={styles.pill}>
            <Text style={styles.pillText} numberOfLines={1} accessibilityLabel={item}>
              {item}
            </Text>
            <Pressable
              onPress={() => removeItem(index)}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={`Ta bort tanke ${index + 1}: ${item}`}
              style={styles.removeButton}
            >
              <Feather name="x" size={16} color="#F2EFF7" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  // Clip both children to one rounded outline so the input and button look connected.
  inputGroup: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E7E2EF',
  },
  input: {
    borderRadius: 0,
  },
  addButton: {
    borderRadius: 0,
  },
  // Percentage widths leave room for three pills; wrapping moves the rest to the next row.
  pillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40364F',
    borderRadius: 20,
    paddingLeft: 10,
  },
  // Show a short preview without changing the full thought saved in the draft.
  pillText: {
    flex: 1,
    color: '#E7E2EF',
    fontSize: 12,
    lineHeight: 18,
  },
  removeButton: {
    width: 32,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
