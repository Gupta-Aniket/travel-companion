import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataItemProvider } from "../../contexts/dataItemContext";

export default function TabLayout() {
  return (
    <GestureHandlerRootView>
      <DataItemProvider>
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: true }}>
          <Tabs.Screen
            name="../index" 
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="map" 
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
          />
        </Tabs>
      </DataItemProvider>
    </GestureHandlerRootView>
  );
}
