import { View } from "react-native"
import { useAuth, useUser } from "@clerk/expo"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

const UNKNOWN_USER = "unknown"

export default function Home() {
  const { user } = useUser()
  const { signOut } = useAuth()

  const name = user?.firstName ?? user?.primaryEmailAddress?.emailAddress ?? UNKNOWN_USER

  return (
    <View className="flex-1 bg-neutral-50 px-6 pt-safe-offset-8 pb-safe-offset-4">
      <View className="flex-1 items-center justify-center gap-2">
        <Text
          role="heading"
          className="text-3xl font-bold tracking-tight text-center"
        >
          {name !== UNKNOWN_USER ? `Welcome, ${name}!` : "Welcome!"}
        </Text>
        <Text className="text-neutral-600 text-center">
          You're signed in to Sneeva.
        </Text>
      </View>
      <Button
        variant="outline"
        onPress={async () => signOut()}
      >
        <Text>Sign out</Text>
      </Button>
    </View>
  )
}
