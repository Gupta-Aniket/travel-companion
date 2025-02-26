import { Stack } from "expo-router";
import {useFonts} from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { DataItemProvider } from '../contexts/dataItemContext';
export default function RootLayout() {
  return (
    <DataItemProvider>
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="auth"/>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </DataItemProvider>
  );
}
