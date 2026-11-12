import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { Pressable } from "react-native"

import { TextClassContext } from "@/components/ui/text"

const buttonVariants = cva(
  cn(
    "flex flex-row items-center justify-center rounded-lg shrink-0",
    "border border-transparent",
  ),
  {
    variants: {
      variant: {
        default: "bg-neutral-900",
        outline: "bg-white border-neutral-300",
      },
      size: {
        default: "h-10 gap-1.5 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonTextVariants = cva(
  cn("text-base font-medium"),
  {
    variants: {
      variant: {
        default: "text-white",
        outline: "text-neutral-800",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = Omit<ComponentProps<typeof Pressable>, "children">
  & RefAttributes<typeof Pressable>
  & VariantProps<typeof buttonVariants>
  & { children?: ReactNode }

function Button({ size, variant, className, children, ...props }: ButtonProps) {
  return (
    <TextClassContext value={buttonTextVariants({ size, variant })}>
      <Pressable
        role="button"
        className={cn(buttonVariants({ size, variant }), className)}
        {...props}
      >
        {children}
      </Pressable>
    </TextClassContext>
  )
}

export { Button }
