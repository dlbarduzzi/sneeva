# Running Sneeva on an iPhone with EAS

How to build the app in the cloud with EAS and install it on a physical iPhone, plus how to get later changes onto the phone.

Run EAS commands as `npx eas-cli@latest <command>`. The `eas ...` examples in the Expo docs mean the same thing.

## Overview

There are three ways to get code onto the phone. Each one has a different answer to "do I need to rebuild?":

| Method | What it's for | Native changes | JS/TS changes |
| --- | --- | --- | --- |
| **Preview build** (`--profile preview`) | A standalone copy of the app that runs without your computer | Rebuild | Rebuild, or send an EAS Update |
| **Development build** (`--profile development`) | Daily development with live reload from `npx expo start` | Rebuild | Appear instantly, no rebuild |
| **EAS Update** | Sending JS changes to an existing preview build over the air | Not possible, rebuild instead | `eas update`, no rebuild |

A preview build is what the first-time setup below produces. It contains a frozen copy of your JavaScript from the moment you built it, so editing code on your computer doesn't change what's on the phone.

## Prerequisites

- An Apple Developer Program membership (paid, renewed yearly)
- An Expo account (`dlbarduzzi`). Cloud builds count against the EAS plan's monthly build limit, see https://expo.dev/pricing.
- Developer Mode turned on for the iPhone (step 6)

## First-time setup (already done)

These steps were completed once for this project. They're listed here in case they need to be repeated on a new machine or account.

1. **Log in to EAS**
   ```bash
   npx eas-cli@latest login
   ```

2. **Link the project to EAS**
   ```bash
   npx eas-cli@latest init
   ```
   This adds `owner` and `extra.eas.projectId` to `app.json`.

3. **Create `eas.json`**
   ```bash
   npx eas-cli@latest build:configure -p ios
   ```
   This creates the `development`, `preview` and `production` build profiles. `preview` uses `"distribution": "internal"`, which means the app installs directly on registered devices without TestFlight or the App Store.

4. **Register the iPhone**
   ```bash
   npx eas-cli@latest device:create
   ```
   - Choose the Expo account, then log in with your **Apple ID**: the email of the Apple account enrolled in the Developer Program. You can find it on the iPhone under Settings → your name.
   - Choose **Website**, scan the QR code with the iPhone, and install the profile it offers. This registers the phone's UDID with Apple.

5. **Build**
   ```bash
   npx eas-cli@latest build -p ios --profile preview
   ```
   - When asked *"iOS app only uses standard/exempt encryption?"*, answer **Y**. This adds `ITSAppUsesNonExemptEncryption: false` to `app.json`, so the question doesn't come back.
   - Let EAS create and manage the certificates and provisioning profile.
   - Select the registered iPhone when asked which devices to include.
   - The build runs in the cloud and takes about 10–20 minutes. You can follow it at https://expo.dev.

6. **Install**
   - Open the link or scan the QR code shown when the build finishes, using the iPhone, then tap **Install**.
   - The first time, turn on **Settings → Privacy & Security → Developer Mode** and restart the phone.

## Getting changes onto the phone

### Option A: Rebuild the preview build (simplest)

```bash
npx eas-cli@latest build -p ios --profile preview
```

Install the new build from its link, as in step 6. It replaces the old one. This always works, but each change costs a 10–20 minute cloud build and uses one build from the plan.

### Option B: Development build (best for daily coding)

A development build is your own version of Expo Go: the app's native code plus a dev menu that loads JavaScript from your computer.

One-time setup:
```bash
npx expo install expo-dev-client
npx eas-cli@latest build -p ios --profile development
```

Install it on the phone as in step 6. Then, every time you code:
```bash
npx expo start
```
Open the development build on the phone. The phone and computer must be on the same network. Saved changes reload instantly, just like in the simulator.

The development build and the preview build can be installed side by side only if they have different bundle identifiers. Otherwise the most recently installed one replaces the other.

### Option C: EAS Update (send JS changes to an existing preview build)

One-time setup:
```bash
npx eas-cli@latest update:configure
```
This installs `expo-updates`, adds a `runtimeVersion` and an updates URL to `app.json`, and adds a `channel` to each build profile in `eas.json`. Because this adds a native module, **you must make one more preview build** after configuring it. Only builds made after this step can receive updates.

Then, to send a change:
```bash
npx eas-cli@latest update --channel preview --message "Describe the change"
```
The app downloads the update in the background when it launches and applies it on the **next** launch. To see it, fully close the app (swipe it away), reopen it, then close and reopen it once more.

An update only reaches builds with the same `runtimeVersion`. If you've made native changes (see below), you need a new build, not an update.

## When to rebuild

### Rebuild needed (native changes)

- Installing or removing a package with native code. If you're not sure, check whether the package's docs say it doesn't work in Expo Go, or whether it has a config plugin.
- Changing anything in `app.json` that affects the native app: `name`, `icon`, `splash`, `bundleIdentifier`, `scheme`, `plugins`, `infoPlist`, permissions, or fonts embedded through the `expo-font` plugin
- Upgrading the Expo SDK or React Native
- Registering a new device. Run `device:create`, then rebuild and accept when EAS offers to update the provisioning profile.
- Expired signing credentials. The ad hoc provisioning profile and distribution certificate expire after about a year, and the installed app then stops opening. Rebuild and EAS will offer to renew them.
- Adding EAS Update for the first time

### No rebuild needed (JavaScript-only changes)

These can be delivered through a development build (Option B) or EAS Update (Option C):

- Screens, components, hooks and logic in `src/`
- Styles and NativeWind classes
- Images and other assets loaded from JavaScript
- Adding pure JavaScript packages (no native code)

If you're not using Option B or C, any change, including JS-only ones, needs a rebuild (Option A) before it shows up on the phone.

## Handy commands

```bash
npx eas-cli@latest build:list            # recent builds, with install links
npx eas-cli@latest build:view <BUILD_ID> # details of one build
npx eas-cli@latest device:list           # registered devices
npx eas-cli@latest credentials           # view or renew iOS certificates and profiles
npx eas-cli@latest build:version:get     # current version and build number
```

## Next step: TestFlight

To share the app with people whose devices aren't registered, use TestFlight:
```bash
npx testflight
```
This needs an app record in App Store Connect. The command walks you through it, and builds take some extra time to process on Apple's side before testers can install them.
