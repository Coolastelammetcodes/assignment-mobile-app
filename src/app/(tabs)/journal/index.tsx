import RatingSlider from "@/components/rating-slider";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Journal() {
  const [value, setValue] = useState(10);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.surface}>
        <Text style={[s.title, s.text]}>Journal</Text>
      </View>
      
      <View style={s.surface}>
        <Text style={s.text}>Ge dagen ett betyg mellan 1-10</Text>
      </View>
      
      <RatingSlider value={value} highestValue={10} step={1} textColor="#E7E2EF" sliderColor="#A865B5" onChange={setValue} />
      
      <TextInput style={[s.surface, s.input]} placeholder="Skriv något" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'condensedBold',
    fontStyle: "italic",
  },
  input: {
    backgroundColor:"#E7E2EF"
  },
  text: {
    color:"#F2EFF7",
  },
  surface: {
    backgroundColor:"#AAA0C8",
    marginHorizontal:16,
    paddingHorizontal:10,
    borderRadius:12,
    marginTop:8
  },
  root: {
    flex: 1,
    backgroundColor:"#120239",
    gap:8,
  },
});