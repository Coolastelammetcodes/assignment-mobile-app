import Slider from "@react-native-community/slider";
import { Text, View } from "react-native";

export type props = {
  value: number;
  highestValue: number;
  step: number;
  onChange: (value: number) => void;
};

export default function RatingSlider({ value, highestValue, step, onChange }: props) {
  return (
    <View>
      <Text style={{color: "#F2EFF7"}}>{value}/{highestValue}</Text>
      <Slider
        minimumValue={0}
        maximumValue={highestValue}
        value={value}
        onValueChange={onChange}
        step={step}
      />
    </View>
  );
}
