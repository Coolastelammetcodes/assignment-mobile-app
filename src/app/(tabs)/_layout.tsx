import { Feather, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor:"blue" }}>
      <Tabs.Screen name="index" options={{ title:"Home", tabBarIcon: (props) => <Feather name="home" {...props} /> }} />
      <Tabs.Screen name="journal" options={{ title: "Journal", tabBarIcon: (props) => <FontAwesome name="pencil-square-o" {...props} />}} />
      <Tabs.Screen name="history" options={{ title: "History", tabBarIcon: (props) => <Feather name="book-open" {...props} />}} />
    </Tabs>
  );
}
