import type { ReactNode } from "react"

import { useSSO } from "@clerk/expo"
import { useState } from "react"
import { ActivityIndicator, Alert, ScrollView, View } from "react-native"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

import { AppleLogo } from "@/components/logo/apple"
import { GoogleLogo } from "@/components/logo/google"
import { FacebookLogo } from "@/components/logo/facebook"

import { cn } from "cn"
import { Link } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

async function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

type Provider = "apple" | "google" | "facebook"

function useSignIn() {
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
        await delay(3000)
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
      console.error(JSON.stringify(error, null, 2))
      Alert.alert("Something went wrong. Please try again.")
    }
    finally {
      setIsPending(false)
      setProvider(null)
    }
  }

  return { signIn, provider, isPending }
}

type ButtonProviderProps = {
  logo: ReactNode
  label: string
  onPress: () => void
  isPending?: boolean
  showIndicator?: boolean
}

function ButtonProvider({
  logo,
  label,
  onPress,
  isPending,
  showIndicator,
}: ButtonProviderProps) {
  return (
    <Button
      variant="outline"
      onPress={onPress}
      disabled={isPending}
      className={cn("w-full h-12", isPending && "opacity-70")}
    >
      <View className="mr-1">
        {showIndicator ? <ActivityIndicator size={22} /> : logo}
      </View>
      <Text className={cn(isPending && "text-neutral-600")}>
        {label}
      </Text>
    </Button>
  )
}

export default function SignIn() {
  const insets = useSafeAreaInsets()
  const { signIn, provider, isPending } = useSignIn()
  return (
    <ScrollView
      className="flex-1 bg-white px-8"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      contentContainerClassName="grow"
      contentInsetAdjustmentBehavior="never"
    >
      <View className="flex-1">
        <View className="flex-1" />
        <Text className="text-center text-xl font-extrabold">
          Sign in
        </Text>
        <View className="flex-1 justify-end gap-3">
          <ButtonProvider
            logo={<GoogleLogo size={22} />}
            label="Continue with Google"
            onPress={() => void signIn("google")}
            isPending={isPending}
            showIndicator={provider === "google"}
          />
          <ButtonProvider
            logo={<FacebookLogo size={22} />}
            label="Continue with Facebook"
            onPress={() => void signIn("facebook")}
            isPending={isPending}
            showIndicator={provider === "facebook"}
          />
          <ButtonProvider
            logo={<AppleLogo size={22} />}
            label="Continue with Apple"
            onPress={() => void signIn("apple")}
            isPending={isPending}
            showIndicator={provider === "apple"}
          />
          <Text className="mt-3 text-center text-base text-neutral-600">
            By continuing, you agree to our
            {"\n"}
            <Link
              href="/terms"
              className="font-medium"
            >
              Terms of Service
            </Link>
            {" "}
            and
            {" "}
            <Link
              href="/privacy"
              className="font-medium"
            >
              Privacy Policy
            </Link>
            .
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
