/* Pure streak functions. Works as a browser global and as a CommonJS module. */
(function (root) {
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // Local calendar day as YYYY-MM-DD. Never uses toISOString (UTC).
  function localDay(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function parseDay(s) {
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  // Calendar-day arithmetic, DST safe (builds a new local Date, no ms math).
  function addDays(dayStr, n) {
    var d = parseDay(dayStr);
    return localDay(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n));
  }

  function currentStreak(doneDays, todayStr) {
    var cursor = doneDays.has(todayStr) ? todayStr : addDays(todayStr, -1);
    var n = 0;
    while (doneDays.has(cursor)) { n++; cursor = addDays(cursor, -1); }
    return n;
  }

  function bestStreak(doneDays) {
    var days = Array.from(doneDays).sort();
    var best = 0, run = 0, prev = null;
    for (var i = 0; i < days.length; i++) {
      run = (prev !== null && addDays(prev, 1) === days[i]) ? run + 1 : 1;
      if (run > best) best = run;
      prev = days[i];
    }
    return best;
  }

  var api = { localDay: localDay, addDays: addDays, currentStreak: currentStreak, bestStreak: bestStreak };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else for (var k in api) root[k] = api[k];
})(typeof self !== 'undefined' ? self : this);
