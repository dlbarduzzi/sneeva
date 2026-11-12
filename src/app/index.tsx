import { View } from "react-native"
import { router } from "expo-router"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  return (
    <View className="flex-1 justify-center bg-white px-8">
      <Button
        variant="outline"
        className="w-full h-12"
        onPress={() => router.replace("/home")}
      >
        <Text>Sign in</Text>
      </Button>
    </View>
  )
}
