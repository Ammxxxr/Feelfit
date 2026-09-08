## Day 23 — README Update
Date: ___________
Task: Bring the README up to date after a stretch of feature work (Days 16-22) that had gone undocumented — custom exercises, workout editing and duplication, the timer refactor, and the new test suite.

Work completed:
Rewrote the Features section to include everything added since the last README pass: custom exercise creation plus editing/deleting via long-press, editing a saved workout after the fact, "Use Again" to duplicate a past workout's exercise selection, the now-actually-working pause/resume timer, and the Cancel confirmation that protects logged sets from accidental loss. Added a new "Running the tests" section documenting npm test. Updated the project structure diagram to include the new utils files (helpers.js, helpers.test.js, storage.test.js). Extended the data model section to document how custom exercises are stored and how they get merged with the built-in library at runtime. Trimmed the "Known limitations" list down to what's actually still true, and added the animated exercise demo as a documented future idea rather than letting it just live in conversation history.

Decisions made:
Kept one honest caveat in the limitations section about deleting a custom exercise leaving "Unknown exercise" behind in old workout history, rather than smoothing that detail over, since it's a real trade-off someone reading the README should know about.

Issues encountered & resolved: None — this was a documentation pass, no code changes.

Files touched: README.md.