import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View} from "react-native";
import * as Haptics  from "expo-haptics"


type Props = {
  value: number;
  highestValue: number;
  step: number;
  textColor: string;
  sliderColor: string;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export default function RatingSlider({ value, highestValue, step, textColor, sliderColor, onChange, disabled }: Props) {
  // Keep these styles inside the component because the text color comes from props.
  const s = StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    emoji: {
      fontSize: 40,
    },
    rating: {
      color: textColor,
    },
    slider: {
      width: '90%',
    },
  });

  let emoji = '😁';
  if (value <= 3) {
    emoji = '😔';
  } else if (value <= 6) {
    emoji = '😐';
  }

  async function handleChange(newValue: number) {
    onChange(newValue);
    if (newValue === value) {
      return;
    }
    try {
      await Haptics.selectionAsync();
    } catch {
      // Some devices cannot vibrate. The rating has already been updated.
    }
  }

  return (
    <View style={s.root}>

        <Text style={s.emoji}>{emoji}</Text>
        <Text style={s.rating}>{value}/{highestValue}</Text>


      <View style={s.slider}>
        <Slider
          minimumValue={1}
          disabled={disabled}
          accessibilityLabel="Dagens betyg"
          maximumValue={highestValue}
          value={value}
          onValueChange={handleChange}
          step={step}
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
        />
      </View>
    </View>
  );
}
