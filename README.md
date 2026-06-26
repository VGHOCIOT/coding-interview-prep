# Interview Practice

Daily coding interview prep for UK full-stack / cloud / platform engineering roles.

Two problems per day:
1. **Job-realistic build task** — implement a class/function like a live-coding round
2. **DSA pattern problem** — standard algorithm/data structure pattern

---

## How to use on Replit (recommended)

1. Go to [replit.com](https://replit.com) → **Create Repl** → **Import from GitHub**
2. Paste: `https://github.com/VGHOCIOT/coding-interview-prep`
3. Navigate to the problem folder in the file tree
4. Pick your language and open `solution.py` or `solution.ts`
5. Set the **Run** command at the top:
   - Python: `python problems/2026-06-25/dsa-two-sum-ii/solution.py`
   - TypeScript: `npx tsx problems/2026-06-25/dsa-two-sum-ii/solution.ts`
6. Fill in the `TODO` inside the function, click **Run**, see results

Each file is self-contained — no imports, no framework. Fill in the function, hit Run.

### What the output looks like

```
✗  1. basic pair
   Expected: [1, 2]
   Got:      []
✓  2. non-adjacent pair
...
────────────────────────────────────────
  1/4 test cases passed
```

---

## Structure

```
problems/
└── YYYY-MM-DD/
    ├── job-<topic>/
    │   ├── README.md
    │   ├── solution.py   ← implement here (Python)
    │   └── solution.ts   ← implement here (TypeScript)
    └── dsa-<pattern>/
        ├── README.md
        ├── solution.py
        └── solution.ts
```

---

## Daily workflow

Ask Claude Code:

> "Set up today's problems: one job-realistic build task on [topic], one DSA pattern problem on [pattern]."

See `PROBLEM_BANK.md` for a curated list of problems with a suggested 30-day schedule.
