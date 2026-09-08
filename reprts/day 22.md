## Day 22 — Automated Tests
Date: ___________
Task: Add real automated tests so bugs like the earlier Pause-button issue get caught by running a command instead of by hand on a device.

Work completed:
I pulled the pure logic functions out of App.js — formatDuration, getExerciseName, getThisWeekWorkouts, getTotalTimeSeconds, and getMostFrequentExercise — into a new utils/helpers.js file, since code sitting directly inside App.js couldn't be imported and tested on its own. App.js now imports these back in instead of declaring them locally, so behavior is identical, it's just organized differently.

Installed jest and jest-expo as dev dependencies and wired up a test script in package.json. Then wrote two test files: utils/helpers.test.js covering the five helper functions with edge cases (empty workout lists, missing durationSeconds, ties in "most frequent exercise"), and utils/storage.test.js covering every function in storage.js using a mocked AsyncStorage so tests never touch real device storage.

Decisions made:
Skipped UI/component testing for now — testing what buttons do on screen needs a lot more setup (mocking navigation-like state, simulating touches) for not much payoff at this stage. The pure logic functions are where real bugs actually hide, and they're the cheapest to test properly, so that's where I focused.

Issues encountered & resolved:
The AsyncStorage mock import path didn't match at first — I'd assumed a shortcut path that only exists in newer versions of the async-storage package, but this project is pinned to an older version (2.2.0) that uses a slightly different file path for its jest mock. Took a round of digging through the actual installed package to find the correct path before the storage tests would even run.

Files touched: App.js, utils/helpers.js (new), utils/helpers.test.js (new), utils/storage.test.js (new), package.json.