import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View} from "react-native";
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
    <SafeAreaView style={s.root}>
      
        <Text style={s.emoji}>😁</Text>
        <Text style={{color: textColor }}>{value}/{highestValue}</Text>
      
      
      <View style={s.slider}>
        <Slider
          minimumValue={0}
          maximumValue={highestValue}
          value={value}
          onValueChange={handleChange}
          step={step}
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    display:"flex",
    alignItems:"center",
  },
  emoji: {
    fontSize: 40,
  },
  slider: {
    width:"90%"
  }
})