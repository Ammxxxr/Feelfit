## Day 19 — Reusable Timer Component (Refactor)

Task: Pull the timer logic out of ActiveWorkoutScreen into its own standalone component, so it's not tangled up with the rest of that screen and could be reused elsewhere later.

Work completed:
I built a new Timer component that owns its own seconds/running state and the setInterval effect, and reports the current time back up to the parent through an onTick callback. ActiveWorkoutScreen no longer manages any timer state itself  it just renders <Timer onTick={setSeconds} /> and keeps a plain seconds value fed by that callback, which it still passes into onFinish exactly like before.

While doing this refactor I found two real bugs that had been hiding in the original code. The button that looked like it paused the timer never actually worked  running was never being toggled anywhere, so it always said "Pause" and did nothing. Worse, that same button's onPress accidentally held the validation logic and called onFinish directly, which meant tapping "Pause" secretly tried to finish your workout. Meanwhile the real Finish Workout button at the bottom had no validation at all. I fixed both as part of the refactor: the new Timer component has a real working pause/resume toggle, and the zero-sets validation now correctly lives on the Finish Workout button where it belongs.

Decisions made:
Rather than leave the broken pause button in place and just do a pure copy-paste refactor, I decided to actually fix it properly since I was already in that code and it made no sense to preserve broken behavior on purpose.

Issues encountered & resolved:
This one took a few rounds to get right. First pass, a leftover piece of the old timer block (with a reference to the now removed running variable) didn't get replaced properly and caused a "Property running doesn't exist" crash. After fixing that, a second issue showed up as a full freeze with no error screen at all