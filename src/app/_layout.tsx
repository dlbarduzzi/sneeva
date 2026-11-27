import * as SplashScreen from "expo-splash-screen"

import { Stack } from "expo-router"
import { useEffect } from "react"

import { tokenCache } from "@clerk/expo/token-cache"
import { ClerkProvider, useAuth } from "@clerk/expo"

import { env } from "@/lib/env"

import "@/styles/global.css"

void SplashScreen.preventAutoHideAsync()

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      void SplashScreen.hideAsync()
    }
  }, [isLoaded])

  // Keep the splash screen up until Clerk knows whether there is a session.
  if (!isLoaded) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn} redirectTo="/home">
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!!isSignedIn} redirectTo="/">
        <Stack.Screen name="home" options={{ animation: "fade" }} />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    // tokenCache is undefined on web, where Clerk uses its own storage.
    <ClerkProvider
      publishableKey={env.clerkPublishableKey}
      {...(tokenCache && { tokenCache })}
    >
      <RootNavigator />
    </ClerkProvider>
  )
}
