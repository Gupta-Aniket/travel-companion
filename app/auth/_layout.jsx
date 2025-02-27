import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AuthLayout() {
  return (
    <GestureHandlerRootView>

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="otp" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="forgotPass" />
        </Stack>

    </GestureHandlerRootView> 
  );
}
