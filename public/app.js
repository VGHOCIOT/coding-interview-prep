/* global require, monaco, marked */

let editor = null;
let currentProblem = null;
let currentLanguage = 'python';
let problems = [];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Problem loading ───────────────────────────────────────────────────────────

async function loadProblems() {
  const res = await fetch('/api/problems');
  problems = await res.json();

  const select = document.getElementById('problem-select');
  select.innerHTML = problems.map(p =>
    `<option value="${p.id}">${p.title}</option>`
  ).join('');

  select.addEventListener('change', () => {
    const p = problems.find(x => x.id === select.value);
    if (p) selectProblem(p);
  });

  if (problems.length) selectProblem(problems[0]);
}

async function selectProblem(problem) {
  currentProblem = problem;
  document.getElementById('problem-select').value = problem.id;

  const res = await fetch(`/api/problems/${problem.id}?lang=${currentLanguage}`);
  const data = await res.json();

  document.getElementById('problem-title').textContent = data.title;

  const diff = document.getElementById('problem-difficulty');
  diff.textContent = data.difficulty;
  diff.className = `badge ${data.difficulty}`;

  const type = document.getElementById('problem-type');
  type.textContent = data.type;
  type.className = `badge ${data.type}`;

  document.getElementById('problem-description').innerHTML =
    marked.parse(data.description);

  if (editor) {
    editor.setValue(data.starterCode);
    monaco.editor.setModelLanguage(editor.getModel(), monacoLang(currentLanguage));
  }

  clearResults();
}

// ─── Language switching ────────────────────────────────────────────────────────

document.getElementById('lang-select').addEventListener('change', async (e) => {
  currentLanguage = e.target.value;
  if (!currentProblem) return;

  const res = await fetch(`/api/problems/${currentProblem.id}?lang=${currentLanguage}`);
  const data = await res.json();

  if (editor) {
    editor.setValue(data.starterCode);
    monaco.editor.setModelLanguage(editor.getModel(), monacoLang(currentLanguage));
  }
  clearResults();
});

function monacoLang(lang) {
  return lang === 'typescript' ? 'typescript' :
         lang === 'javascript' ? 'javascript' : 'python';
}

// ─── Run ───────────────────────────────────────────────────────────────────────

document.getElementById('run-btn').addEventListener('click', runCode);

async function runCode() {
  if (!currentProblem || !editor) return;

  const btn = document.getElementById('run-btn');
  const status = document.getElementById('run-status');
  btn.disabled = true;
  status.textContent = 'Running…';
  clearResults();

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemId: currentProblem.id,
        language: currentLanguage,
        code: editor.getValue(),
      }),
    });
    const data = await res.json();
    renderResults(data);
  } catch (err) {
    renderError(err.message);
  } finally {
    btn.disabled = false;
  }
}

// ─── Results rendering ─────────────────────────────────────────────────────────

function clearResults() {
  document.getElementById('results-placeholder').style.display = 'block';
  document.getElementById('results-list').innerHTML = '';
  document.getElementById('run-status').textContent = '';
}

function renderResults(data) {
  document.getElementById('results-placeholder').style.display = 'none';
  const list = document.getElementById('results-list');
  const status = document.getElementById('run-status');

  if (data.error && !data.results) {
    renderError(data.error);
    status.textContent = 'Error';
    return;
  }

  const { results, summary } = data;
  const allPass = summary.passed === summary.total;
  status.textContent = `${summary.passed}/${summary.total} passed`;

  const bar = document.createElement('div');
  bar.className = `summary-bar ${allPass ? 'all-pass' : 'some-fail'}`;
  bar.textContent = allPass
    ? `✓ All ${summary.total} test cases passed`
    : `${summary.passed} / ${summary.total} test cases passed`;
  list.appendChild(bar);

  for (const r of results) {
    const div = document.createElement('div');
    div.className = `test-case ${r.passed ? 'pass' : 'fail'}`;

    const header = document.createElement('div');
    header.className = 'tc-header';
    header.innerHTML = `<span class="tc-icon">${r.passed ? '✓' : '✗'}</span>
                        <span>${r.id}. ${escapeHtml(r.label)}</span>`;
    div.appendChild(header);

    if (!r.passed) {
      const detail = document.createElement('div');
      detail.className = 'tc-detail';
      detail.innerHTML = `
        <div><span class="key">Expected:</span> <code>${escapeHtml(JSON.stringify(r.expected))}</code></div>
        <div><span class="key">Actual:</span>   <code>${escapeHtml(JSON.stringify(r.actual))}</code></div>
      `;
      div.appendChild(detail);
    }

    list.appendChild(div);
  }
}

function renderError(message) {
  document.getElementById('results-placeholder').style.display = 'none';
  const list = document.getElementById('results-list');
  const div = document.createElement('div');
  div.className = 'error-box';
  div.innerHTML = `<pre>${escapeHtml(message)}</pre>`;
  list.appendChild(div);
}

// ─── Monaco init ──────────────────────────────────────────────────────────────

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: '',
    language: 'python',
    theme: 'vs-dark',
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16, bottom: 8 },
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontLigatures: true,
    tabSize: 4,
  });

  loadProblems();
});
