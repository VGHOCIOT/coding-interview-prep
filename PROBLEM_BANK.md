# Problem Bank

Curated from 2024-2026 interview reports across FAANG and UK tech companies (Revolut, Monzo, Deliveroo, Wise, Sky, Bloomberg, Goldman Sachs). Ask Claude Code to scaffold any of these as a daily problem.

---

## Job-Realistic Build Tasks

### API and Backend

| # | Task | What it tests | Common at |
|---|------|---------------|-----------|
| 1 | **Currency Exchange API** — REST endpoint: accept currency pair + amount, fetch rates, return converted value with error handling | API design, input validation, external service integration | Revolut, Wise |
| 2 | **Rate Limiter Middleware** — Express middleware that rate-limits per client IP using token bucket or sliding window | Middleware patterns, algorithm selection, HTTP 429 | Stripe, Amazon, Revolut |
| 3 | **URL Shortener Service** — POST to shorten, GET to redirect | Hashing/encoding, persistence design, redirect semantics | Google, Amazon, Bloomberg |
| 4 | **Webhook Receiver + Retry Queue** — Receive payloads, validate HMAC signatures, queue failures for retry with exponential backoff | Security (HMAC), queue design, retry strategies, idempotency | Stripe, Deliveroo |
| 5 | **Cursor-Based Pagination API** — GET endpoint with cursor pagination, field filtering, sorting over an in-memory dataset | API design conventions, query param parsing, edge cases | Meta, Google, Monzo |
| 6 | **Idempotent Payment Endpoint** — POST `/payments` with `Idempotency-Key`, handle race conditions | Middleware design, race-condition awareness, idempotency | Stripe, Revolut |
| 7 | **Simple Key-Value Store with TTL** — In-memory store with GET, SET, DELETE, TTL expiration | Data structures (Map), timer management, memory cleanup | Amazon, Revolut |
| 8 | **Health Check Aggregator** — Poll multiple downstream services concurrently, return aggregated status | Promise.all/allSettled, timeout handling, aggregation | Platform roles at Amazon, Google, Sky |

### Frontend and Full-Stack

| # | Task | What it tests | Common at |
|---|------|---------------|-----------|
| 9 | **Autocomplete/Typeahead Component** — React input with debounce, API fetch, loading/error states, keyboard nav | Debouncing, async state, accessibility | Google, Meta, Amazon, Deliveroo |
| 10 | **Data Table with Server-Side Sorting** — React table with paginated API data, sortable columns, loading states | Component architecture, API integration, rendering perf | Bloomberg, Revolut, Wise |
| 11 | **Real-Time Notification Feed** — Connect to WebSocket/SSE, display notifications, read/unread state | WebSocket handling, cleanup on unmount, optimistic UI | Meta, Sky |
| 12 | **Dynamic Form Builder** — Render a form from JSON schema with client-side validation | Dynamic rendering, validation logic, schema-driven design | Monzo, Wise, Revolut |

### Infrastructure and Platform

| # | Task | What it tests | Common at |
|---|------|---------------|-----------|
| 13 | **Cron Expression Parser** — Parse cron string, return next N execution times | String parsing, date/time manipulation, edge cases | Deliveroo |
| 14 | **CLI Log Parser** — Read log file, parse structured lines, output stats (error count, p50/p99 latency) | Stream processing, regex, CLI args, statistics | Platform/SRE at Google, Amazon, Sky |
| 15 | **Pub/Sub Event Bus** — In-process event bus with subscribe, unsubscribe, publish, wildcard topic matching | Observer pattern, wildcard matching, memory leak prevention | Deliveroo, Sky |

---

## DSA Problems by Pattern

### Two Pointers

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 1 | **Two Sum II — Sorted Array** (LC 167) | Easy | Google, Amazon, Bloomberg |
| 2 | **Container With Most Water** (LC 11) | Medium | Amazon, Google, Meta |
| 3 | **Trapping Rain Water** (LC 42) | Hard | Google, Amazon, Goldman Sachs |

### Sliding Window

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 4 | **Longest Substring Without Repeating Characters** (LC 3) | Medium | Google, Amazon, Meta, Bloomberg |
| 5 | **Minimum Window Substring** (LC 76) | Hard | Meta, Google, Amazon |
| 6 | **Maximum Average Subarray I** (LC 643) | Easy | Amazon, Bloomberg |

### Binary Search

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 7 | **Search in Rotated Sorted Array** (LC 33) | Medium | Amazon, Google, Meta, Bloomberg |
| 8 | **Find Minimum in Rotated Sorted Array** (LC 153) | Medium | Amazon, Google, Goldman Sachs |

### BFS / Graph Traversal

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 9 | **Number of Islands** (LC 200) | Medium | Amazon (#1 most asked), Google, Meta |
| 10 | **Rotting Oranges** (LC 994) | Medium | Amazon, Google, Meta |
| 11 | **Course Schedule** (LC 207) | Medium | Amazon, Google, DoorDash |

### DFS / Trees

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 12 | **Lowest Common Ancestor of Binary Tree** (LC 236) | Medium | Meta (top 5), Amazon, Google |
| 13 | **Binary Tree Right Side View** (LC 199) | Medium | Meta, Amazon, Bloomberg |
| 14 | **Serialize and Deserialize Binary Tree** (LC 297) | Hard | Meta, Google, Amazon |

### Dynamic Programming

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 15 | **Climbing Stairs** (LC 70) | Easy | Amazon, Google, Bloomberg |
| 16 | **Longest Increasing Subsequence** (LC 300) | Medium | Google, Amazon, Goldman Sachs |
| 17 | **Coin Change** (LC 322) | Medium | Amazon, Google, Bloomberg |

### Backtracking

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 18 | **Word Search** (LC 79) | Medium | Amazon, Bloomberg, Google |

### Stack / Monotonic Stack

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 19 | **Valid Parentheses** (LC 20) | Easy | Amazon, Meta, Bloomberg, Google |

### Linked List

| # | Problem | Difficulty | Companies |
|---|---------|-----------|-----------|
| 20 | **Merge Two Sorted Lists** (LC 21) | Easy | Amazon, Google, Bloomberg, Goldman Sachs |

---

## Company-Specific Notes

- **Meta**: Heavy on trees — Binary Tree Vertical Order Traversal, LCA, Right Side View
- **Amazon**: Leads with graph problems — Number of Islands is their #1 most-asked
- **Google**: Favors problems with multiple valid approaches (Trapping Rain Water)
- **UK fintech (Revolut, Wise, Monzo)**: Lean practical over pure DSA; Revolut is ~42% Easy, 58% Medium, 0% Hard
- **Deliveroo**: HackerRank assessments then live coding (cron parser, delivery systems)
- **TypeScript is now required** (not just preferred) at most UK full-stack positions

---

## Suggested 30-Day Schedule

**Week 1 — Foundations**
| Day | Build Task | DSA Problem |
|-----|-----------|-------------|
| 1 | Idempotent Payment Endpoint (#6) | Container With Most Water (#2) |
| 2 | Rate Limiter Middleware (#2) | Two Sum II (#1) |
| 3 | URL Shortener Service (#3) | Longest Substring Without Repeating (#4) |
| 4 | Key-Value Store with TTL (#7) | Valid Parentheses (#19) |
| 5 | Cursor-Based Pagination API (#5) | Merge Two Sorted Lists (#20) |

**Week 2 — Intermediate Patterns**
| Day | Build Task | DSA Problem |
|-----|-----------|-------------|
| 6 | Currency Exchange API (#1) | Search in Rotated Sorted Array (#7) |
| 7 | Autocomplete Component (#9) | Number of Islands (#9) |
| 8 | Health Check Aggregator (#8) | Rotting Oranges (#10) |
| 9 | Webhook Receiver + Retry (#4) | Climbing Stairs (#15) |
| 10 | Data Table with Sorting (#10) | Coin Change (#17) |

**Week 3 — Advanced**
| Day | Build Task | DSA Problem |
|-----|-----------|-------------|
| 11 | Real-Time Notification Feed (#11) | Course Schedule (#11) |
| 12 | Dynamic Form Builder (#12) | Lowest Common Ancestor (#12) |
| 13 | CLI Log Parser (#14) | Binary Tree Right Side View (#13) |
| 14 | Pub/Sub Event Bus (#15) | Longest Increasing Subsequence (#16) |
| 15 | Cron Expression Parser (#13) | Find Minimum in Rotated Array (#8) |

**Week 4 — Hard Mode**
| Day | Build Task | DSA Problem |
|-----|-----------|-------------|
| 16-20 | Revisit weakest build tasks with added constraints (auth, caching, concurrency) | Trapping Rain Water (#3), Minimum Window Substring (#5), Serialize/Deserialize Tree (#14), Word Search (#18), Maximum Average Subarray (#6) |

**Days 21-30**: Mix revisits of failed problems with mock interview timing (45 min per problem).
