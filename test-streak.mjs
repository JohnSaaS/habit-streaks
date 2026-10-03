import { createRequire } from 'node:module';
const { currentStreak, bestStreak, localDay, addDays } = createRequire(import.meta.url)('./streak.js');

let pass = 0, fail = 0;
function eq(name, got, want) {
  if (got === want) { pass++; console.log('ok   ' + name + ' => ' + got); }
  else { fail++; console.log('FAIL ' + name + ': got ' + got + ', want ' + want); }
}
const S = (...d) => new Set(d);
const T = '2026-10-03';

eq('empty set', currentStreak(S(), T), 0);
eq('only today', currentStreak(S('2026-10-03'), T), 1);
eq('only yesterday', currentStreak(S('2026-10-02'), T), 1);
eq('today+yesterday+day before', currentStreak(S('2026-10-03', '2026-10-02', '2026-10-01'), T), 3);
eq('gap two days ago', currentStreak(S('2026-10-03', '2026-10-02', '2026-09-30'), T), 2);
eq('only day-before-yesterday', currentStreak(S('2026-10-01'), T), 0);
eq('today missing, yesterday run of 2', currentStreak(S('2026-10-02', '2026-10-01'), T), 2);
eq('month boundary', currentStreak(S('2026-11-01', '2026-10-31', '2026-10-30'), '2026-11-01'), 3);
eq('DST fall back (11-01/11-02)', currentStreak(S('2026-11-02', '2026-11-01', '2026-10-31'), '2026-11-02'), 3);
eq('DST spring forward (03-08/03-09)', currentStreak(S('2026-03-09', '2026-03-08', '2026-03-07'), '2026-03-09'), 3);
eq('addDays across DST fall', addDays('2026-11-01', 1), '2026-11-02');
eq('addDays across DST spring', addDays('2026-03-08', 1), '2026-03-09');
eq('addDays back across month', addDays('2026-11-01', -1), '2026-10-31');
eq('addDays across year', addDays('2026-12-31', 1), '2027-01-01');
eq('localDay uses local fields', localDay(new Date(2026, 9, 3, 23, 59)), '2026-10-03');
eq('best empty', bestStreak(S()), 0);
eq('best two runs (2 and 4)', bestStreak(S('2026-01-01', '2026-01-02', '2026-02-10', '2026-02-11', '2026-02-12', '2026-02-13')), 4);
eq('best run across month boundary', bestStreak(S('2026-10-30', '2026-10-31', '2026-11-01')), 3);
eq('best single', bestStreak(S('2026-05-05')), 1);

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
