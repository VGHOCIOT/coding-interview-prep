# Interview Practice

Daily coding interview prep for UK full-stack / cloud / platform engineering roles.

Two problems per day:
1. **Job-realistic build task** — small component/endpoint, like a live-coding round
2. **DSA pattern problem** — standard algorithm/data structure pattern

## Setup

```bash
npm install
```

## Scripts

```bash
npm test          # run all tests once
npm run test:watch # watch mode
npm run dev        # run a problem's server (pass the file path)
```

## Structure

```
problems/
└── YYYY-MM-DD/
    ├── job-<topic>/
    │   ├── README.md
    │   ├── *.ts (starter files with TODOs)
    │   └── *.test.ts
    └── dsa-<pattern>/
        ├── README.md
        ├── solution.ts
        └── solution.test.ts
```

Each day gets a new dated folder. Old ones stay as a record.

## Daily workflow

Ask Claude Code:

> "Set up tomorrow's problems folder: one job-realistic build task on [topic], one DSA pattern problem on [pattern], same structure as before."

See `PROBLEM_BANK.md` for a curated list of problems to work through, organized by topic and pattern.
