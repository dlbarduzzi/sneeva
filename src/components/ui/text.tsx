import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { createContext, use } from "react"
import { Text as PrimitiveText } from "react-native"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { Slot } from "@rn-primitives/slot"

const textVariants = cva("font-sans font-normal text-base", {
  variants: {
    variant: {
      default: "text-neutral-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const TextClassContext = createContext<string | undefined>(undefined)

type TextProps = ComponentProps<typeof PrimitiveText>
  & VariantProps<typeof textVariants>
  & { asChild?: boolean }

function Text({
  variant,
  asChild,
  className,
  ...props
}: TextProps) {
  const textClass = use(TextClassContext)
  const Component = asChild ? Slot : PrimitiveText
  return (
    <Component
      className={cn(textVariants({ variant }), textClass, className)}
      {...props}
    />
  )
}

export { Text, TextClassContext }
