import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"

import { Pressable } from "react-native"
import { TextClassContext } from "@/components/ui/text"

const buttonVariants = cva(
  `flex-row items-center justify-center gap-2
  shrink-0 rounded-xl border border-transparent
  transition-transform duration-100 active:translate-y-px`,
  {
    variants: {
      variant: {
        default: "bg-neutral-900",
      },
      size: {
        default: "h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-white",
    },
    size: {
      default: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ButtonProps = Omit<ComponentProps<typeof Pressable>, "children" | "style">
  & VariantProps<typeof buttonVariants>
  & { children?: ReactNode }

function Button({
  size,
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  const textClass = buttonTextVariants({ size, variant })
  return (
    <TextClassContext value={textClass}>
      <Pressable
        role="button"
        className={cn(
          buttonVariants({ size, variant }),
          props.disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </Pressable>
    </TextClassContext>
  )
}

export { Button }
