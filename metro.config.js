const { withNativewind } = require("nativewind/metro")
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

module.exports = withNativewind(config, {
  // Base rem for native. NativeWind inlines rem at compile time and defaults
  // to 14px; 16px makes Tailwind's defaults match web (h-12 = 48, text-lg = 18).
  inlineRem: 16,
})
