import { Feather, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor:"white", tabBarStyle: journalStyles.tabBar }}>
      <Tabs.Screen name="index" options={{ title:"Home", headerShown: false ,tabBarIcon: (props) => <Feather name="home" {...props} /> }} />
      <Tabs.Screen name="journal" options={{ title: "Journal", headerShown: false ,tabBarIcon: (props) => <FontAwesome name="pencil-square-o" {...props} />}} />
      <Tabs.Screen name="history" options={{ title: "History", headerShown: false ,tabBarIcon: (props) => <Feather name="book-open" {...props} />}} />
    </Tabs>
  );
}

const journalStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#8176A3',
  },
});
