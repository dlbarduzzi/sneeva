import { View } from "react-native"
import { router } from "expo-router"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export default function Profile() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="text-xl font-bold">Profile</Text>
      <View className="mt-4 w-full">
        <Button
          variant="outline"
          className="w-full h-12"
          onPress={() => router.replace("/")}
        >
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  )
}
