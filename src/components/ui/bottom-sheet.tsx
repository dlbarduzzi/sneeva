import type { ComponentProps } from "react"

import { View } from "react-native"
import { styled } from "nativewind"

import {
  BottomSheet as PrimitiveBottomSheet,
  RNHostView,
} from "@expo/ui"

// Maps the `background-color` from `className` (e.g. `bg-white`) onto
// `containerColor`, which paints the full sheet chrome; including the drag
// indicator zone and iOS home-indicator inset — not just the content area.
const StyledBottomSheet = styled(PrimitiveBottomSheet, {
  className: {
    target: false,
    nativeStyleMapping: {
      backgroundColor: "containerColor",
    },
  },
})

// `snapPoints` is omitted on purpose: without it the sheet sizes to its content.
type BottomSheetProps = Omit<ComponentProps<typeof StyledBottomSheet>, "snapPoints">

function BottomSheet({ children, ...props }: BottomSheetProps) {
  return (
    <StyledBottomSheet {...props}>
      {/* Children are React Native views, which the native sheet
          can't measure. RNHostView reports their height back so the
          sheet fits its content; width still comes from the sheet.
      */}
      <RNHostView matchContents={{ vertical: true }}>
        <View>{children}</View>
      </RNHostView>
    </StyledBottomSheet>
  )
}

export { BottomSheet }
