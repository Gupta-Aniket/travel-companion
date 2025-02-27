import { Stack } from "expo-router";
import { Slot } from "expo-router";
import {useFonts} from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import  DataItemProvider  from './contexts/userDataContext';
export default function RootLayout() {
  return (
    <DataItemProvider>
      <Slot/>
    </DataItemProvider>
  );
}
