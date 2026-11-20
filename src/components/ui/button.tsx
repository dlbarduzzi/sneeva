import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, ComponentType, ReactNode } from "react"
import type { ActivityIndicatorProps, GestureResponderEvent } from "react-native"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { styled } from "nativewind"

import { Fragment } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { TextClassContext } from "@/components/ui/text"

// Reanimated's Pressable is not one of the components NativeWind maps
// automatically, so register className -> style explicitly. The casts
// only work around TS depth limits in styled()'s generic types.
type AnimatedPressableProps = Omit<ComponentProps<typeof Pressable>, "style">
  & { className?: string | undefined, style?: unknown }

const ReanimatedPressable = Animated.createAnimatedComponent(Pressable)

const AnimatedPressable = styled(
  ReanimatedPressable as ComponentType<{ style?: unknown }>,
  { className: "style" },
) as unknown as ComponentType<AnimatedPressableProps>

const buttonVariants = cva(
  cn(
    "flex-row items-center justify-center gap-2",
    "shrink-0 rounded-lg border border-transparent",
  ),
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "bg-transparent border-primary",
        ghost: "bg-transparent active:bg-accent",
        destructive: "bg-destructive",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-4",
        icon: "size-10 rounded-md",
      },
      disabled: {
        true: "border-transparent bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonTextVariants = cva("font-sans font-semibold text-base", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-primary",
      ghost: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      icon: "text-sm",
    },
    disabled: {
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type SpinnerProps = Pick<ActivityIndicatorProps, "color" | "size">

/** Maps the `text-*` color class onto ActivityIndicator's `color` prop. */
const Spinner = styled(ActivityIndicator as ComponentType<SpinnerProps>, {
  className: {
    target: false,
    nativeStyleMapping: { color: "color" },
  },
})

type ButtonProps = Omit<ComponentProps<typeof Pressable>, "children">
  & VariantProps<typeof buttonVariants>
  & {
    loading?: boolean
    children?: ReactNode
  }

function Button({
  size,
  variant,
  loading = false,
  disabled = false,
  className,
  children,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const offset = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }))

  const inactive = disabled || loading
  const textClass = cn(buttonTextVariants({ size, variant, disabled }))

  function handlePressIn(event: GestureResponderEvent) {
    offset.value = withTiming(1, { duration: 50 })
    onPressIn?.(event)
  }

  function handlePressOut(event: GestureResponderEvent) {
    offset.value = withTiming(0, { duration: 100 })
    onPressOut?.(event)
  }

  return (
    <TextClassContext value={textClass}>
      <AnimatedPressable
        role="button"
        disabled={inactive}
        aria-busy={loading}
        aria-disabled={inactive}
        accessibilityState={{ disabled: inactive, busy: loading }}
        className={cn(buttonVariants({ size, variant, disabled }), className)}
        style={animatedStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        // sm/icon are 40pt visually; expand the touch area to 48pt
        // to meet iOS (44pt) and Android (48dp) minimum target sizes.
        hitSlop={size === "sm" || size === "icon" ? 4 : undefined}
        {...props}
      >
        {!loading ? children : (
          <Fragment>
            {/*
                  Keep the label laid out (fixed width) and readable by screen
                  readers, but invisible while the spinner shows on top.
                */}
            <View className="flex-row items-center gap-2 opacity-0">
              {children}
            </View>
            <View className="absolute inset-0 items-center justify-center">
              <Spinner className={textClass} />
            </View>
          </Fragment>
        )}
      </AnimatedPressable>
    </TextClassContext>
  )
}

export { Button }
