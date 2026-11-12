import { Stack } from "expo-router"
import { ScrollView } from "react-native"

import { Text } from "@/components/ui/text"

export default function Terms() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="p-6"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Stack.Screen
        options={{
          title: "Terms of Service",
          headerShown: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>The Terms of Service are coming soon...</Text>
    </ScrollView>
  )
}
