import type { AuthAction } from "@/components/auth/sheet"

import { cn } from "cn"
import { Image } from "expo-image"
import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { BottomSheet } from "@/components/ui/bottom-sheet"

import { AuthSheet } from "@/components/auth/sheet"

import logo from "@/assets/images/logo-name.svg"

const styles = StyleSheet.create({
  logo: {
    width: 164 * 0.7, // 70% of original svg file size.
    aspectRatio: 164 / 38, // width / height of original file size.
  },
})

export default function Index() {
  const [authAction, setAuthAction] = useState<AuthAction | null>(null)
  return (
    <View className="flex-1 bg-neutral-50 px-6 pt-safe-offset-8 pb-safe-offset-4">
      <View className="items-center">
        <Image
          source={logo}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Sneeva"
        />
      </View>
      <View className="flex-1 items-center justify-center">
        <View
          role="heading"
          className="items-center"
          accessible={true}
        >
          <Text className="text-neutral-900 text-[2.75rem] font-black tracking-tighter">
            Move better
          </Text>
          <Text className={cn(
            "-mt-4.5 font-serif italic text-neutral-900",
            "text-[2.75rem] leading-tight tracking-tighter",
          )}
          >
            feel better
          </Text>
        </View>
      </View>
      <View>
        <Button onPress={() => setAuthAction("sign-up")}>
          <Text>Get Started</Text>
        </Button>
        <View className="mt-2 flex-row justify-center">
          <Pressable
            role="button"
            className={cn(
              "flex-row items-center justify-center shrink-0 rounded-xl",
              "py-2 px-3 bg-transparent",
            )}
            onPress={() => setAuthAction("sign-in")}
          >
            <Text className="text-neutral-900">
              Already have an account?
              {" "}
            </Text>
            <Text className="text-neutral-900 font-medium">
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
      <BottomSheet
        className="bg-white"
        onDismiss={() => setAuthAction(null)}
        isPresented={authAction !== null}
        contentPadding={{ top: 8, bottom: 8, left: 24, right: 24 }}
      >
        {authAction ? <AuthSheet action={authAction} /> : null}
      </BottomSheet>
    </View>
  )
}
