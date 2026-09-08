Day 14 App Icon & Splash Screen

Task: Give the app a proper icon and splash screen instead of Expo's default placeholder.

Work completed:

Designed a simple icon: a green barbell mark on the app's existing dark background color, matching the app's established color scheme
Created three variants: a 1024×1024 app icon, a transparent version for the splash screen, and an adaptive icon foreground for Android
Added all three to a new assets/ folder
Updated app.json to reference the new icon, splash image, background color, and Android adaptive icon configuration
Verified the app still builds and runs correctly after the config change (confirmed via web preview)

Decisions made:

Kept the icon design simple and on brand (same green/dark palette as the rest of the app) rather than something more elaborate, since it's a fast, low risk way to make the app look finished
Noted that custom icons/splash screens don't actually render inside Expo Go's dev client (it always shows its own UI while developing) they only appear once the app is built as a standalone binary, so this work is "config ready" rather than visually testable at this stage

Issues i encountered & resolved:

Minor Expo SDK patch-version mismatch warning (54.0.35 vs expected 54.0.36) appeared after restarting  cosmetic only, did not affect functionality, left as-is

Files touched: app.json (updated), assets/icon.png, assets/splash-icon.png, assets/adaptive-icon.png (new)