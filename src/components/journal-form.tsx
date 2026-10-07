import { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import InputPills from "./input-pills";
import JournalDescription from "./journal-description";
import RatingSlider from "./rating-slider";
import { useJournal } from "./journal-provider";
import * as Haptics from "expo-haptics"

export default function JournalForm() {
  const [rating, setRating] = useState(10);
  const [items, setItems] = useState<string[]>([]);
  const { saveEntry } = useJournal();
  const scrollViewref = useRef<ScrollView>(null);

  async function handleSave() {
  await saveEntry(rating, items);
  
  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );

  setItems([]);

  Alert.alert("Sparat!")

  scrollViewref.current?.scrollTo({
    y:0,
    animated:true
  });
}

  return (
    <ScrollView ref={scrollViewref} >
      <View style={[s.root, s.surface]}>
        <Text style={s.text}>Ge dagen ett betyg mellan 1-10</Text>
        <View>
          <RatingSlider
            value={rating}
            highestValue={10}
            step={1}
            sliderColor="#6D438D"
            onChange={setRating}
          />
        </View>

        <Text style={s.text}>Skriv enstaka ord för att beskriva dagen</Text>
        <InputPills disabled={false}  items={items} setItems={setItems} />
        <Text style={s.text}>
          Finns det något du hade velat beskriva mer utförligt i meningar?
        </Text>
        <JournalDescription />
        <Pressable onPress={handleSave} style={s.button}>
          <Text style={s.buttonText}>Spara</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    gap: 16,
  },
  text: {
    display: "flex",
    color: "#1B0B4B",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6D438D",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    minHeight: 48,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  surface: {
    backgroundColor: "#AAA0C8",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 12,
  },
});
