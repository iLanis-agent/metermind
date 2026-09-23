/* MeterMind engine - pure parking-meter countdown math, shared by app.html and node tests. */
(function(root, factory){
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MeterMindEngine = factory();
})(typeof self !== 'undefined' ? self : this, function(){

  var WARN_MIN = 10; /* "leave soon" threshold */

  function meterEndMs(startMs, paidMinutes){
    return startMs + paidMinutes * 60000;
  }

  /* the clock time you must start walking back */
  function leaveByMs(endMs, walkMinutes){
    return endMs - walkMinutes * 60000;
  }

  /* status: ok / soon (inside warn window) / late (past leave-by) / expired (past meter end) */
  function status(nowMs, endMs, walkMinutes){
    if (nowMs >= endMs) return 'expired';
    if (nowMs >= leaveByMs(endMs, walkMinutes)) return 'late';
    if (nowMs >= leaveByMs(endMs, walkMinutes) - WARN_MIN * 60000) return 'soon';
    return 'ok';
  }

  function minutesUntil(nowMs, targetMs){
    return Math.round((targetMs - nowMs) / 60000);
  }

  function fmtCountdown(nowMs, targetMs){
    var m = minutesUntil(nowMs, targetMs);
    if (m <= 0) return 'now';
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' h ' + (r < 10 ? '0' : '') + r + ' min';
  }

  function fmtClock(ms){
    var d = new Date(ms);
    var h = d.getHours(), min = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    return h + ':' + (min < 10 ? '0' : '') + min + ' ' + ap;
  }

  function headline(nowMs, endMs, walkMinutes){
    var st = status(nowMs, endMs, walkMinutes);
    var lb = leaveByMs(endMs, walkMinutes);
    if (st === 'expired') return 'meter expired at ' + fmtClock(endMs);
    if (st === 'late') return 'you should already be walking - meter ends ' + fmtClock(endMs);
    if (st === 'soon') return 'leave in ' + fmtCountdown(nowMs, lb) + ' to make it back';
    return 'parked - leave by ' + fmtClock(lb);
  }

  return {
    meterEndMs: meterEndMs,
    leaveByMs: leaveByMs,
    status: status,
    minutesUntil: minutesUntil,
    fmtCountdown: fmtCountdown,
    fmtClock: fmtClock,
    headline: headline
  };
});
