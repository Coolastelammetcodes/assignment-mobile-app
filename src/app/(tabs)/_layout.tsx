import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor:"blue" }}>
      <Tabs.Screen name="index" options={{ title:"Home" }} />
      <Tabs.Screen name="journal" options={{ title: "Journal" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
    </Tabs>
  );
}
