import type { TextProps } from "react-native"

import { Text as PrimitiveText } from "react-native"

import { cn } from "cn"

export function Text({ className, ...props }: TextProps) {
  return (
    <PrimitiveText
      className={cn("font-sans", className)}
      {...props}
    />
  )
}
