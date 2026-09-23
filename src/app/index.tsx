import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={s.root}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
