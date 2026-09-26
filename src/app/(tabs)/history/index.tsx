import { Text, View, StyleSheet } from "react-native";

export default function History() {
  return (
    <View style={s.root}>
      <Text style={s.title}>History</Text>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'condensedBold',
    fontStyle: "italic"
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});