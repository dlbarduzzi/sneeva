import { View } from "react-native"

import { Text } from "@/components/text"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Sneeva!
      </Text>
      <View className="mt-4 bg-blue-500 px-3 py-1.5 rounded-lg">
        <Text className="text-lg text-white font-semibold">
          Hello, world!
        </Text>
      </View>
    </View>
  )
}
