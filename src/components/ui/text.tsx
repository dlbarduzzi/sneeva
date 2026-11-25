import type { TextProps } from "react-native"

import { Text as PrimitiveText } from "react-native"

function Text({ className, ...props }: TextProps) {
  return (
    <PrimitiveText
      className={`font-sans ${className ?? ""}`.trim()}
      {...props}
    />
  )
}

export { Text }
