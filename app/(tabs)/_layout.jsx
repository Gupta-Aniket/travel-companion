import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function TabLayout() {
  return (
    <GestureHandlerRootView>

        <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
          <Tabs.Screen
            name="analytics"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
          />
          <Tabs.Screen
            name="tickets"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
          />
        </Tabs>

    </GestureHandlerRootView>
  );
}
