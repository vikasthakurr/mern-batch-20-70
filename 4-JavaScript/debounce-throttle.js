// ============================================================
// DEBOUNCE & THROTTLE - COMPLETE NOTES
// ============================================================

// Both are performance optimization techniques used to LIMIT
// how often a function executes in response to rapid events
// (scroll, resize, keypress, mousemove, etc.)

// ============================================================
// WHY DO WE NEED THEM?
// ============================================================
// Problem: Some events fire VERY frequently (e.g., typing, scrolling)
// If we attach an API call to every keystroke → too many requests!
//
// Without optimization:
//   User types "vikas" → 5 API calls (v, vi, vik, vika, vikas)
//
// With Debounce:
//   User types "vikas" → 1 API call (only after user STOPS typing)
//
// With Throttle:
//   User types "vikas" → fires at fixed intervals (e.g., every 300ms)

// ============================================================
// VISUAL DIAGRAM - DEBOUNCE vs THROTTLE
// ============================================================
//
// User events (keystrokes):
// Time:  0ms  50ms  100ms  150ms  200ms  300ms  500ms  800ms  1000ms
// Keys:   v     i      k      a      s     (pause.................)
//         |     |      |      |      |
//         ▼     ▼      ▼      ▼      ▼
//
// ─────────────────────────────────────────────────────────────
// WITHOUT any optimization:
// Calls:  ✓     ✓      ✓      ✓      ✓   → 5 function calls!
//
// ─────────────────────────────────────────────────────────────
// WITH DEBOUNCE (delay = 300ms):
// - Waits 300ms AFTER the LAST event before firing
// - Resets timer on every new event
//
// Time:  0ms  50ms  100ms  150ms  200ms  ........  500ms
// Keys:   v     i      k      a      s             (300ms after last)
//         ✗     ✗      ✗      ✗      ✗              ✓  → 1 call!
//         ^reset ^reset ^reset ^reset ^start timer
//
// ─────────────────────────────────────────────────────────────
// WITH THROTTLE (delay = 300ms):
// - Fires ONCE every 300ms (fixed interval)
// - Ignores events between intervals
//
// Time:  0ms  50ms  100ms  150ms  200ms  300ms  500ms
// Keys:   v     i      k      a      s
//         ✓     ✗      ✗      ✗      ✗      ✓     → fires at intervals
//         ^fire        (ignored)           ^fire (300ms passed)
//
// ============================================================

// ============================================================
// 1. DEBOUNCE
// ============================================================
// Definition: Delays execution until AFTER the user STOPS
//             triggering the event for a specified time.
//
// Real-world analogy:
//   Like an elevator door - it keeps resetting the close timer
//   every time someone new enters. Only closes after nobody
//   enters for X seconds.
//
// Use Cases:
//   - Search input (API call after user stops typing)
//   - Window resize (recalculate layout after resizing stops)
//   - Auto-save (save after user stops editing)
//   - Form validation (validate after user stops typing)
//
// How it works:
//   1. User triggers event → start a timer
//   2. User triggers event again → RESET the timer
//   3. Timer completes (no new events) → execute the function
//
// DIAGRAM:
//
//   Event:    ──●──●──●──●──●──────────────────●──●──────────
//                                    |                    |
//   Timer:    [===][===][===][===][=======delay=======]  [====delay====]
//                                              |                       |
//   Executes:                                  ✓                       ✓
//             (fires only after events stop for 'delay' ms)

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    // Clear previous timer (reset the countdown)
    clearTimeout(timer);
    // Start a new timer
    timer = setTimeout(() => {
      fn.apply(this, args); // Execute after delay
    }, delay);
  };
}

// Usage Example:
// const searchAPI = debounce((query) => {
//   console.log(`API call for: ${query}`);
// }, 300);
//
// searchAPI("v");       // timer starts
// searchAPI("vi");      // timer resets
// searchAPI("vik");     // timer resets
// searchAPI("vikas");   // timer resets → waits 300ms → API call for "vikas"

// ============================================================
// 2. THROTTLE
// ============================================================
// Definition: Ensures a function is called AT MOST once every
//             specified time interval, no matter how many times
//             the event fires.
//
// Real-world analogy:
//   Like a cooldown on a video game ability - you can press
//   the button many times, but it only fires once per cooldown.
//
// Use Cases:
//   - Scroll events (infinite scroll, lazy loading)
//   - Mouse move (drag and drop, tooltip position)
//   - Button clicks (prevent double-click submissions)
//   - Game input (firing rate limit)
//   - Analytics tracking (send data at intervals)
//
// How it works:
//   1. User triggers event → execute immediately
//   2. Start a cooldown period
//   3. Ignore all events during cooldown
//   4. After cooldown, next event can fire again
//
// DIAGRAM:
//
//   Event:    ──●──●──●──●──●──●──●──●──●──●──●──●──●──
//               |           |           |           |
//   Cooldown:  [====300ms====][====300ms====][====300ms====]
//               |           |           |           |
//   Executes:  ✓           ✓           ✓           ✓
//             (fires once every 'delay' ms regardless of how many events)

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    let currentCall = Date.now();
    if (currentCall - lastCall >= delay) {
      fn.apply(this, args); // Execute
      lastCall = currentCall; // Update last call time
    }
  };
}

// Alternative throttle using setTimeout:
function throttleWithTimeout(fn, delay) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      fn.apply(this, args); // Execute immediately
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false; // Allow next call after delay
      }, delay);
    }
  };
}

// ============================================================
// 3. COMPARISON TABLE
// ============================================================
//
// ┌─────────────┬────────────────────────────┬────────────────────────────┐
// │  Feature    │       DEBOUNCE             │        THROTTLE            │
// ├─────────────┼────────────────────────────┼────────────────────────────┤
// │ When fires  │ After events STOP          │ At fixed INTERVALS         │
// │ Frequency   │ Once (after silence)       │ Once per interval          │
// │ Resets?     │ YES (on each new event)    │ NO (fixed cooldown)        │
// │ First call  │ Delayed                    │ Immediate                  │
// │ Best for    │ Search, resize, auto-save  │ Scroll, mousemove, clicks  │
// │ Guarantee   │ Fires after user stops     │ Fires at regular rate      │
// └─────────────┴────────────────────────────┴────────────────────────────┘

// ============================================================
// 4. PRACTICAL EXAMPLES
// ============================================================

// --- DEBOUNCE: Search Input ---
function googleSearch(name) {
  console.log(`Searching for: ${name}`);
}

const debouncedSearch = debounce(googleSearch, 300);
debouncedSearch("v"); // ✗ (timer reset)
debouncedSearch("vi"); // ✗ (timer reset)
debouncedSearch("vikas"); // ✓ (fires after 300ms silence)

// --- THROTTLE: Scroll Handler ---
function handleScroll() {
  console.log("Scroll position:", Date.now());
}

const throttledScroll = throttle(handleScroll, 300);
// Even if scroll fires 100 times/sec, handler runs max once per 300ms

// ============================================================
// 5. LEADING vs TRAILING EDGE
// ============================================================
//
// LEADING EDGE: Fires on the FIRST event, then waits
//   Events:  ──●──●──●──●──────────●──●──●──
//               ✓                     ✓
//              (fires immediately)
//
// TRAILING EDGE: Fires AFTER the last event (default debounce)
//   Events:  ──●──●──●──●──────────●──●──●──────────
//                              ✓                  ✓
//                    (fires after silence)

// Debounce with leading edge option:
function debounceLeading(fn, delay) {
  let timer;
  let isFirstCall = true;
  return function (...args) {
    if (isFirstCall) {
      fn.apply(this, args); // Fire immediately on first call
      isFirstCall = false;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      isFirstCall = true; // Reset for next burst
    }, delay);
  };
}

// ============================================================
// 6. COMMON INTERVIEW QUESTIONS
// ============================================================

// Q: What's the difference between debounce and throttle?
// A: Debounce waits until events STOP for a delay before firing.
//    Throttle fires at most once every delay interval.

// Q: When would you use debounce over throttle?
// A: Debounce for search input, form validation, window resize.
//    Throttle for scroll events, mouse move, game input.

// Q: Can debounce result in a function NEVER being called?
// A: Yes! If events keep firing without a pause >= delay,
//    the function never executes (timer keeps resetting).

// Q: Does throttle guarantee the last event is processed?
// A: Not always. The basic throttle may miss the last event.
//    A "trailing" throttle variant can handle this.

// ============================================================
// SUMMARY
// ============================================================
// Debounce = "Wait till they're done, then fire"
// Throttle = "Fire at a steady pace, ignore the rest"
//
// Both take a function + delay, return a new optimized function.
// Both use closures to maintain state (timer/lastCall).
// Both are essential for performance optimization in web apps.
