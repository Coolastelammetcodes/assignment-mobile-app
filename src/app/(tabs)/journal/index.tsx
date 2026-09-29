import { Text, View, StyleSheet, TextInput } from "react-native";

export default function Journal() {
  return (
    <View style={s.root}>
      <View style={s.surface}>
        <Text style={s.title}>Journal</Text>
      </View>
      <View style={s.surface}>
        <Text>Ge dagen ett betyg mellan 1-10</Text>
      </View>
      <TextInput style={[s.surface, s.input]} placeholder="Skriv något" />
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'condensedBold',
    fontStyle: "italic",
    marginTop:8,
  },
  input: {
    backgroundColor:"#E7E2EF"
  },
  surface: {
    backgroundColor:"#F2EFF7",
    marginHorizontal:16,
    paddingHorizontal:10,
    borderRadius:12,
    marginTop:8
  },
  root: {
    flex: 1,
    backgroundColor:"#252A41",
    gap:8,
  },
});