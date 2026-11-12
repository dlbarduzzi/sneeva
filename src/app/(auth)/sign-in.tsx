import { useSSO } from "@clerk/expo"
import { useState } from "react"

import { ActivityIndicator, Alert, View } from "react-native"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

function useGoogleSignIn() {
  const { startSSOFlow } = useSSO()
  const [isPending, setIsPending] = useState(false)

  async function signIn() {
    if (isPending) {
      return
    }
    setIsPending(true)
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      })
      if (createdSessionId !== null && setActive !== undefined) {
        await setActive({ session: createdSessionId })
      }
    }
    catch (error) {
      console.error(JSON.stringify(error, null, 2))
      Alert.alert("Something went wrong. Please try again.")
    }
    finally {
      setIsPending(false)
    }
  }

  return { isPending, signIn }
}

export default function SignIn() {
  const google = useGoogleSignIn()
  return (
    <View className="flex-1 justify-center bg-white px-8">
      <Button
        variant="outline"
        className="w-full h-12"
        onPress={google.signIn}
        disabled={google.isPending}
      >
        {google.isPending
          ? <ActivityIndicator />
          : <Text>Continue with Google</Text>
        }
      </Button>
    </View>
  )
}
