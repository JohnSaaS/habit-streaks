# Habit Streaks

Daily habit streak tracker, installed on John's iPhone as a Home Screen web app.
Served at https://johnsaas.github.io/habit-streaks/

- Habits live in the `HABITS` array at the top of the script in `index.html`. Add one line to add a habit; never change an existing `id`, since history is keyed on it.
- Strict daily streaks, no skip days. Today and yesterday are editable, nothing older.
- Data: Supabase table `habit_checks` in the `iron-ledger` project (shared with Iron Ledger to stay inside the free plan's 2 active projects). Anon key can select/insert/update, never delete. Unchecking writes `done=false`.
- `node test-streak.mjs` tests the streak math.
