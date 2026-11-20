import type {
  Icon as TablerIcon,
  IconProps as TablerIconProps,
} from "@tabler/icons-react-native"

import { cn } from "cn"
import { use } from "react"
import { useCssElement } from "nativewind"

import { TextClassContext } from "@/components/ui/text"

/**
 * Maps the text color from className (e.g. "text-primary") to the SVG's
 * `color` prop. target: false drops every other style, so text classes like
 * "text-base font-semibold" inherited from a parent are harmless.
 */
const mapping = {
  className: {
    target: false,
    nativeStyleMapping: { color: "color" },
  },
} as const

type IconProps = Omit<TablerIconProps, "color"> & {
  as: TablerIcon
  className?: string | undefined
}

/**
 * Tabler icon colored by className. Inside components that provide
 * TextClassContext (e.g. Button), it inherits the text color automatically.
 */
function Icon({
  as: Component,
  className,
  size = 22,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const textClass = use(TextClassContext)
  return useCssElement(
    Component,
    {
      size,
      strokeWidth,
      className: cn("text-foreground", textClass, className),
      ...props,
    },
    mapping,
  )
}

export { Icon }
