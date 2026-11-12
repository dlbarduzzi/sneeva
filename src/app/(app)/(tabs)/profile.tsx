import { View } from "react-native"
import { useClerk, useUser } from "@clerk/expo"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export default function Profile() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const name = user?.fullName ?? user?.username ?? "No name"
  const email = user?.primaryEmailAddress?.emailAddress

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="text-xl font-bold">{name}</Text>
      {email !== undefined
        ? <Text className="mt-1 text-base text-neutral-500">{email}</Text>
        : null
      }
      <View className="mt-6 w-full">
        {/* The route guard in _layout returns to sign in once the session ends. */}
        <Button
          variant="outline"
          className="w-full h-12"
          onPress={() => void signOut()}
        >
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  )
}
