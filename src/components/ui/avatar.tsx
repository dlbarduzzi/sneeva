import { View } from "react-native"
import { Image } from "expo-image"
import { useState } from "react"
import { IconUser } from "@tabler/icons-react-native"

import { cn } from "cn"

type AvatarProps = {
  uri?: string | undefined
  name: string
  size?: number
  className?: string | undefined
}

function Avatar({ uri, name, size = 96, className }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = uri !== undefined && uri !== "" && !failed
  return (
    <View
      className={cn(
        "items-center justify-center overflow-hidden rounded-full bg-neutral-200",
        className,
      )}
      style={{ width: size, height: size }}
      accessibilityRole="image"
      accessibilityLabel={`${name}'s avatar`}
    >
      {showImage ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          contentFit="cover"
          transition={150}
          onError={() => setFailed(true)}
        />
      ) : (
        // SVG icons don't read className; color is neutral-500.
        <IconUser size={size * 0.5} color="#737373" strokeWidth={1.5} />
      )}
    </View>
  )
}

export { Avatar }
