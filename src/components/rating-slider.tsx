import Slider from "@react-native-community/slider";
import { StyleSheet, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics  from "expo-haptics"


export type props = {
  value: number;
  highestValue: number;
  step: number;
  textColor: string;
  sliderColor: string;
  onChange: (value: number) => void;
};

export default function RatingSlider({ value, highestValue, step, textColor, sliderColor, onChange }: props) {
  const handleChange = (newValue: number) => {
    Haptics.selectionAsync();
    onChange(newValue)
  }

  return (
    <SafeAreaView>
      <Text style={s.emoji}>😁</Text>
      <Text style={{color: textColor }}>{value}/{highestValue}</Text>
      <Slider
        minimumValue={0}
        maximumValue={highestValue}
        value={value}
        onValueChange={handleChange}
        step={step}
        thumbTintColor={sliderColor}
        minimumTrackTintColor={sliderColor}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  emoji: {
    display:"flex",
    fontSize: 30,
    justifyContent:"center",
    alignContent:"center",
  }
})