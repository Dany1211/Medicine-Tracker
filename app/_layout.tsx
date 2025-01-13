import { Stack } from "expo-router";
import '@/globals.css'
import { Modal } from "react-native";

export default function RootLayout() {
  return (
     <Stack screenOptions={
       {
        headerShown : false
       }
     }>
      <Stack.Screen name="(tabs)"></Stack.Screen>
      <Stack.Screen name="login"></Stack.Screen>
      <Stack.Screen name="add-new-medication"></Stack.Screen>
      <Stack.Screen name="action-modal" options={
        {
          presentation:'modal'
        }
      }></Stack.Screen>
     </Stack>
  )
}