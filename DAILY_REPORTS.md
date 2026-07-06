# Development Reports — Feelfit

### Day 1 — Project setup
**Date:** ___________
**Task:** Get a working Expo project running.
**Work completed:**
- Named the app Feelfit, initialized project structure (`screens/`, `components/`, `utils/`, `data/` folders ready for what's next)
- Set up `package.json` with core dependencies: Expo, React Navigation (native stack), AsyncStorage — chosen now because we know workout logging (Day 1's target feature) will need both a screen to navigate to and persistence to save data
- Built a minimal `App.js` that just renders and confirms the project boots
- Set up `app.json` (app name, dark splash screen)

**Decisions made:**
- Expo over bare React Native — no native build setup needed, can test instantly on a phone via Expo Go
- Held off on adding navigation/tabs/charts libraries until we actually need them, to keep dependencies minimal early on

**Files touched:** `package.json`, `App.js`, `app.json`

**Next steps:** Get this running on your actual phone, then start on the workout logging screen.
