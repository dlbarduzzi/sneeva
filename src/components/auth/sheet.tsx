import { Link } from "expo-router"
import { View } from "react-native"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

import { AppleLogo } from "@/components/logo/apple"
import { GoogleLogo } from "@/components/logo/google"

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

function AuthSheet({ action }: { action: AuthAction }) {
  const content = actionContent[action]
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
        <Button variant="outline">
          <GoogleLogo />
          <Text>Continue with Google</Text>
        </Button>
        <Button variant="outline">
          <AppleLogo />
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
