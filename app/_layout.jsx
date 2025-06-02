import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import DataItemProvider from '../src/contexts/userDataContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DataItemProvider>
        <Slot />
      </DataItemProvider>
    </SafeAreaProvider>
  );
}
