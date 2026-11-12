/* eslint-disable node/no-process-env -- the single place allowed to read env vars */

// Expo inlines EXPO_PUBLIC_* vars at build time; each must be read statically.
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""

if (clerkPublishableKey === "") {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env")
}

export const env = {
  clerkPublishableKey,
}
