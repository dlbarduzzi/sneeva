import { View } from "react-native"
import { Link, Stack } from "expo-router"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background p-6">
      <Stack.Screen options={{ title: "Sneeva" }} />
      <Text>Welcome to Sneeva!</Text>
      <Link href="/design-system" asChild>
        <Button variant="secondary">
          <Text>Design System</Text>
        </Button>
      </Link>
    </View>
  )
}
