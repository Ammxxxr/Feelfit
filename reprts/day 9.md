Day 9 — Delete Workout from History

Task: Let the user remove a saved workout no way to correct a mistaken or duplicate entry existed until now.
Work completed:

Added deleteWorkout(id) to utils/storage.js filters the given workout out of storage and persists the updated list
Added a "Delete" link to each workout card in HistoryScreen
Wrapped deletion in a confirmation alert ("Delete workout? This cannot be undone.") to prevent accidental taps from losing data
Wired the confirmed deletion back through to update the in app workout list immediately
Verified on a physical device: tapping Delete prompts for confirmation, and confirming removes the workout from History

Decisions made:

Required explicit confirmation before deleting, rather than deleting immediately on tap workout history has no "undo," so a confirmation step protects against accidental data loss
Made these as small, targeted edits to App.js (import line, one function replacement, one usage line, one style) rather than rewriting the whole file reduces risk of paste errors on a file that's grown fairly large

Issues encountered & resolved:

None significant clean addition on top of the existing storage and History structure.

Files touched: utils/storage.js (added deleteWorkout), App.js (updated HistoryScreen, its usage, and styles)