import { ActivityIndicator, Alert, View } from "react-native"
import { Link } from "expo-router"
import { useSSO } from "@clerk/expo"
import { useState } from "react"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

import { AppleLogo } from "@/components/logo/apple"
import { GoogleLogo } from "@/components/logo/google"

type Provider = "apple" | "google"
type AuthAction = "sign-in" | "sign-up"

const actionContent: Record<AuthAction, {
  title: string
  subtitle: string
}> = {
  "sign-in": {
    title: "Welcome back",
    subtitle: "Sign in to access your account.",
  },
  "sign-up": {
    title: "Welcome",
    subtitle: "Create your account to get started.",
  },
}

async function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

function useSignIn(action: AuthAction) {
  const { startSSOFlow } = useSSO()

  const [provider, setProvider] = useState<Provider | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function signIn(_provider: Provider) {
    if (isPending) {
      return
    }
    setIsPending(true)
    setProvider(_provider)
    try {
      if (_provider !== "google") {
        await delay(2000)
        return
      }
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: `oauth_${_provider}`,
      })
      if (createdSessionId !== null && setActive !== undefined) {
        await setActive({ session: createdSessionId })
      }
    }
    catch (error) {
      console.error(error)
      const title = action === "sign-in" ? "Sign in" : "Sign up"
      Alert.alert(`${title} failed`, "Something went wrong. Please try again.")
    }
    finally {
      setIsPending(false)
      setProvider(null)
    }
  }

  return { signIn, provider, isPending }
}

function AuthSheet({ action }: { action: AuthAction }) {
  const content = actionContent[action]
  const { signIn, provider, isPending } = useSignIn(action)
  return (
    <View className="px-1 pt-8 gap-12">
      <View className="items-center">
        <Text
          role="heading"
          className="text-3xl font-bold tracking-tight"
        >
          {content.title}
        </Text>
        <Text className="text-neutral-600">
          {content.subtitle}
        </Text>
      </View>
      <View className="min-w-full gap-3">
        <Button
          variant="outline"
          disabled={isPending}
          onPress={async () => signIn("google")}
        >
          {isPending && provider === "google"
            ? <ActivityIndicator size={22} className="text-neutral-500" />
            : <GoogleLogo />
          }
          <Text>Continue with Google</Text>
        </Button>
        <Button
          variant="outline"
          disabled={isPending}
          onPress={async () => signIn("apple")}
        >
          {isPending && provider === "apple"
            ? <ActivityIndicator size={22} className="text-neutral-500" />
            : <AppleLogo />
          }
          <Text>Continue with Apple</Text>
        </Button>
      </View>
      <View className="min-w-full">
        <Text className="text-center text-sm text-neutral-500">
          By continuing, you agree to our
          {"\n"}
          <Link
            href="/"
            className="font-medium underline"
          >
            Terms of Service
          </Link>
          {" and "}
          <Link
            href="/"
            className="font-medium underline"
          >
            Privacy Policy
          </Link>
          .
        </Text>
      </View>
    </View>
  )
}

export { type AuthAction, AuthSheet }
