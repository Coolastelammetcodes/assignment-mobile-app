import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={s.root}> 
      <View style={s.surface}>
        <Text style={[s.title, s.text]}>Hem</Text>
      </View>
      <View style={s.surface}>
        <Text style={s.text}>Få ner dagen i skrift och planera framtiden. Allt på samma plats</Text>
      </View>
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
