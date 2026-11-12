import "@/styles/global.css"

import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
    </Stack>
  )
}
