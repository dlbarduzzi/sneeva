import { Stack } from "expo-router"
import { ScrollView } from "react-native"

import { Text } from "@/components/ui/text"

export default function Privacy() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="p-6"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Stack.Screen
        options={{
          title: "Privacy Policy",
          headerShown: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>The Privacy Policy is coming soon...</Text>
    </ScrollView>
  )
}
