const express = require('express');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

const PROBLEMS_DIR = path.join(__dirname, 'problems');

const LANG_CONFIG = {
  python:     { ext: 'py', starterFile: 'starter.py', runnerFile: 'runner.py', cmd: 'python3', args: (f) => [f] },
  typescript: { ext: 'ts', starterFile: 'starter.ts', runnerFile: 'runner.ts', cmd: 'npx',     args: (f) => ['tsx', '--no-cache', f] },
  javascript: { ext: 'js', starterFile: 'starter.js', runnerFile: 'runner.js', cmd: 'node',    args: (f) => [f] },
};

function walkProblems() {
  const problems = [];
  for (const date of fs.readdirSync(PROBLEMS_DIR).sort()) {
    const dateDir = path.join(PROBLEMS_DIR, date);
    if (!fs.statSync(dateDir).isDirectory()) continue;
    for (const slug of fs.readdirSync(dateDir).sort()) {
      const metaPath = path.join(dateDir, slug, 'problem.json');
      if (fs.existsSync(metaPath)) {
        problems.push(JSON.parse(fs.readFileSync(metaPath, 'utf-8')));
      }
    }
  }
  return problems;
}

app.get('/api/problems', (req, res) => {
  try {
    res.json(walkProblems());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/problems/:date/:slug', (req, res) => {
  try {
    const { date, slug } = req.params;
    const lang = req.query.lang || 'python';
    const probDir = path.join(PROBLEMS_DIR, date, slug);
    const metaPath = path.join(probDir, 'problem.json');
    if (!fs.existsSync(metaPath)) return res.status(404).json({ error: 'Problem not found' });

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    const description = fs.readFileSync(path.join(probDir, 'README.md'), 'utf-8');
    const cfg = LANG_CONFIG[lang];
    const starterPath = cfg ? path.join(probDir, cfg.starterFile) : null;
    const starterCode = starterPath && fs.existsSync(starterPath)
      ? fs.readFileSync(starterPath, 'utf-8')
      : '// No starter available for this language';

    res.json({ ...meta, description, starterCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/run', (req, res) => {
  const { problemId, language, code } = req.body;
  if (!problemId || !language || code === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cfg = LANG_CONFIG[language];
  if (!cfg) return res.status(400).json({ error: `Unsupported language: ${language}` });

  const probDir = path.join(PROBLEMS_DIR, problemId);
  const runnerPath = path.join(probDir, cfg.runnerFile);
  if (!fs.existsSync(runnerPath)) {
    return res.status(400).json({ error: `No runner for language "${language}" on this problem` });
  }

  const runner = fs.readFileSync(runnerPath, 'utf-8');
  const fullCode = `${code}\n\n${runner}`;
  const tmpFile = path.join(os.tmpdir(), `run-${crypto.randomUUID()}.${cfg.ext}`);

  try {
    fs.writeFileSync(tmpFile, fullCode);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to write temp file' });
  }

  execFile(cfg.cmd, cfg.args(tmpFile), { timeout: 10_000 }, (err, stdout, stderr) => {
    try { fs.unlinkSync(tmpFile); } catch {}

    const resultLine = (stdout || '').split('\n').find(l => l.startsWith('__RESULT__:'));
    if (resultLine) {
      try {
        return res.json(JSON.parse(resultLine.slice('__RESULT__:'.length)));
      } catch {
        return res.json({ error: 'Runner produced malformed JSON', raw: stdout });
      }
    }

    if (err && err.killed) {
      return res.json({ error: 'Execution timed out (10s)' });
    }

    res.json({ error: (stderr || stdout || 'No output produced').trim() });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
