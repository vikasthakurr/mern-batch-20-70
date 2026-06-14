# React - Introduction & Core Concepts

---

## History of React

- React was created by **Jordan Walke**, a software engineer at Facebook (now Meta).
- First developed in **2011** for Facebook's News Feed.
- Used internally at Instagram in **2012**.
- **Open-sourced in May 2013** at JSConf US.
- React Native (for mobile apps) was released in **2015**.
- React **16 (2017)** introduced the new Fiber architecture.
- React **16.8 (2019)** introduced Hooks (useState, useEffect, etc.).
- React **18 (2022)** introduced concurrent rendering, automatic batching, and transitions.

---

## How React Works

1. Developer likhta hai **JSX** (HTML-like syntax inside JavaScript).
2. JSX ko Babel **transpile** karta hai into `React.createElement()` calls.
3. `React.createElement()` se ek **Virtual DOM** tree banta hai (plain JS objects).
4. React compare karta hai naye Virtual DOM ko purane se — isko bolte hain **Diffing**.
5. Sirf jo changes hain wahi **Real DOM** mein update hote hain — isko bolte hain **Reconciliation**.

```
JSX → Babel → React.createElement() → Virtual DOM → Diffing → Real DOM Update
```

---

## Virtual DOM

- Virtual DOM ek **lightweight copy** hai Real DOM ki (plain JavaScript object tree).
- Har baar state/props change hone par ek **naya Virtual DOM** banta hai.
- React purane aur naye Virtual DOM ko compare karta hai (diffing).
- Sirf **minimum changes** Real DOM mein apply hote hain.
- Yeh process Real DOM ko directly manipulate karne se **bahut fast** hai.

---

## React Fiber (React 16+)

- Fiber React ka **naya reconciliation engine** hai (React 16 se).
- Purana reconciler (Stack Reconciler) synchronous tha — ek baar shuru hone ke baad ruk nahi sakta tha.
- **Fiber ka kaam:**
  - Rendering ko **chhote-chhote units (fibers)** mein todta hai.
  - Kaam ko **pause, resume, ya cancel** kar sakta hai.
  - High-priority updates (typing, click) ko low-priority updates (data fetch) se pehle process karta hai.
  - Isse UI **smooth aur responsive** rehta hai.

### Fiber Architecture Key Points:

| Feature       | Stack Reconciler (Old) | Fiber (New)                |
| ------------- | ---------------------- | -------------------------- |
| Execution     | Synchronous            | Asynchronous (incremental) |
| Interruptible | No                     | Yes                        |
| Priority      | No priority            | Priority-based scheduling  |
| Animation/UX  | Janky                  | Smooth                     |

---

## Reconciliation (Diffing Algorithm)

- Jab state ya props change hote hain, React ek **naya Virtual DOM tree** banata hai.
- React **purane aur naye tree ko compare** karta hai (diffing).
- Reconciliation ke rules:
  1. **Different type ke elements** → Purana tree destroy, naya tree create.
  2. **Same type ke elements** → Sirf attributes/props update hote hain.
  3. **Lists mein `key` prop** → React efficiently identify karta hai ki konsa item add/remove/move hua.
- Final mein sirf **minimum DOM operations** hoti hain.

---

## Rendering in React

### Initial Render:

1. Component function call hota hai.
2. JSX se Virtual DOM banta hai.
3. Virtual DOM se Real DOM create hota hai.
4. Browser screen pe paint karta hai.

### Re-render (State/Props change):

1. State ya props change hone par component **re-render** hota hai.
2. Naya Virtual DOM banta hai.
3. Purane se compare (diffing) hota hai.
4. Sirf changes Real DOM mein apply hote hain.

---

## One-Way Data Binding (Unidirectional Data Flow)

- React mein data sirf **parent se child** ko flow hota hai (via props).
- Child **directly parent ka data change nahi** kar sakta.
- Agar child ko parent ka state change karna hai → parent ek **callback function** prop ke through bhejta hai.

```
Parent (state) → Props → Child (read-only)
Child → Callback function → Parent state update
```

### Benefits:

- Data flow **predictable** aur **easy to debug** hota hai.
- Bugs trace karna easy hai kyunki data ek hi direction mein jata hai.

### Comparison:

| Feature    | One-Way (React)   | Two-Way (Angular) |
| ---------- | ----------------- | ----------------- |
| Data Flow  | Parent → Child    | Both directions   |
| Complexity | Simple            | Complex           |
| Debugging  | Easy              | Difficult         |
| Example    | Props + Callbacks | ngModel           |

---

## SPA (Single Page Application)

- **Ek hi HTML page** load hota hai browser mein.
- Navigation hone par **page reload nahi hota** — sirf content dynamically change hota hai.
- JavaScript (React Router) handle karta hai routing.
- Server se sirf **data (JSON)** aata hai, pura page nahi.

### Examples: Gmail, Facebook, Twitter, Netflix

### Advantages:

- Fast navigation (no full page reload)
- Smooth user experience
- Less server load

### Disadvantages:

- Initial load slow ho sakta hai (large JS bundle)
- SEO difficult (content JS se render hota hai)
- Browser back button handling complex

---

## MPA (Multi Page Application)

- Har route/page ke liye **server se naya HTML page** aata hai.
- Har navigation mein **full page reload** hota hai.
- Traditional websites aise hi kaam karti hain.

### Examples: Amazon, Wikipedia, Government websites

### Advantages:

- SEO friendly (har page ka apna HTML hai)
- Simple architecture
- Better for content-heavy websites

### Disadvantages:

- Slow navigation (full reload)
- More server requests
- Less smooth UX

---

## SPA vs MPA Comparison

| Feature           | SPA                       | MPA                    |
| ----------------- | ------------------------- | ---------------------- |
| Page Reload       | No                        | Yes (every navigation) |
| Speed             | Fast (after initial load) | Slower                 |
| SEO               | Difficult                 | Easy                   |
| Initial Load      | Heavy (JS bundle)         | Light                  |
| Example Framework | React, Vue, Angular       | PHP, Django, WordPress |
| User Experience   | Smooth, app-like          | Traditional            |
| Server Load       | Less (only JSON)          | More (full HTML)       |

---

## Summary

```
React = Library for building UIs
Virtual DOM = Lightweight copy of Real DOM
Fiber = Async reconciliation engine (pause/resume)
Reconciliation = Diffing old vs new Virtual DOM → minimum DOM updates
One-Way Binding = Data flows Parent → Child only
SPA = Single page, no reload, JS handles routing
MPA = Multiple pages, full reload each time
```
