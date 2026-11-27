/* eslint-disable-next-line node/no-process-env */
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""

if (clerkPublishableKey === "") {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env")
}

export const env = {
  clerkPublishableKey,
}
