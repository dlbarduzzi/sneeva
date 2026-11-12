import { View } from "react-native"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Sneeva!
      </Text>
      <View className="mt-3">
        <Button>
          <Text>Button</Text>
        </Button>
      </View>
      <View className="mt-3">
        <Button variant="outline">
          <Text>Button</Text>
        </Button>
      </View>
    </View>
  )
}
