import { cn } from "cn"
import { Image } from "expo-image"
import { StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

import logo from "@/assets/images/logo-name.svg"

const styles = StyleSheet.create({
  // SVG viewBox is 164x38;
  // expo-image renders 0x0 without explicit dimensions.
  logo: { width: 164 * 0.7, aspectRatio: 164 / 38 },
})

export default function Index() {
  return (
    <View className="flex-1 bg-neutral-50 px-6 pt-safe-offset-8 pb-safe-offset-6">
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
        <Button>
          <Text>Get Started</Text>
        </Button>
        <View className="mt-4 flex-row items-center justify-center">
          <Text className="text-neutral-900">
            Already have an account?
            {" "}
          </Text>
          <Text className="text-neutral-900 font-medium">
            Sign in
          </Text>
        </View>
      </View>
    </View>
  )
}
