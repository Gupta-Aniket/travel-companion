import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "../components/CustomBottomSheet";
import { useDataItem } from "../contexts/userDataContext";

export default function TabLayout() {
  const { itemId, closeBottomSheet } = useDataItem();
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>

      
        <Tabs screenOptions={{
          tabBarActiveTintColor: "blue",
          headerShown: false,
        }}>
          <Tabs.Screen
            name="analytics"
            options={{
              title: "Analytics",
              tabBarIcon: ({ focused, color }) =>
                <Icon name={focused ? "pie-chart" : "pie-chart-outline"}
                  type="ionicon"
                  size={focused ? 28 : 24}
                  color={color} />
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, focused }) =>
                <Icon name={focused ? "earth" : "earth-outline"}
                  type="ionicon"
                  size={focused ? 28 : 24}
                  color={color} />
            }}
          />
          <Tabs.Screen
            name="tickets"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) =>
                <Icon name={focused ? "ticket" : "ticket-outline"}
                  type="ionicon"
                  size={focused ? 30 : 24}
                  color={color} />
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "History",
              tabBarIcon: ({ color, focused }) =>
                <Icon name={focused ? "receipt" : "receipt-outline"}
                  type="ionicon"
                  size={focused ? 28 : 24}
                  color={color} />
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) =>
                <Icon name={focused ? "person" : "person-outline"}
                  type="ionicon"
                  size={focused ? 28 : 24}
                  color={color} />
            }}
          />
        </Tabs>
        
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
