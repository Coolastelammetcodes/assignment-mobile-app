import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function JournalDescription() {
  const [description, setDescription] = useState("");
    return (  
   <View style={s.inputGroup}>
      <TextInput
      style={[s.inputBase, s.input]}
      placeholder="Det har varit en toppen dag på..."
      placeholderTextColor="#625775"
      accessibilityLabel="Beskriv din dag"
      multiline
      value={description}
      onChangeText={setDescription}
      />
    </View>
  );
}

const s = StyleSheet.create({
  text: {
    color: '#F2EFF7',
    fontSize: 16,
    lineHeight: 24,
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
});
