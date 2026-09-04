// ==========================================================================
// QC'aime — Logique du quiz
// ==========================================================================

const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenEnd = document.getElementById('screen-end');

const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');

const nameInput = document.getElementById('player-name-input');
const nameError = document.getElementById('name-error');
const leaderboardList = document.getElementById('leaderboard-list');

const themeEmoji = document.getElementById('theme-emoji');
const themeName = document.getElementById('theme-name');
const questionText = document.getElementById('question-text');
const optionsWrap = document.getElementById('options');
const feedback = document.getElementById('feedback');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');

const LETTERS = ['A', 'B', 'C', 'D'];

let order = [];
let currentIndex = 0;
let score = 0;
let hasAnswered = false;
let playerName = '';
let cachedScores = [];

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showScreen(screen) {
  [screenStart, screenQuiz, screenEnd].forEach(s => s.classList.remove('screen--active'));
  screen.classList.add('screen--active');
}

function formatDateTime(iso) {
  const d = new Date(iso);
  const datePart = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timePart = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return `${datePart} à ${timePart}`;
}

function renderLeaderboard() {
  const scores = cachedScores.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  leaderboardList.innerHTML = '';

  if (scores.length === 0) {
    leaderboardList.innerHTML = '<p class="leaderboard-empty">Personne n\'a encore joué... sois le premier ! 🌺</p>';
    return;
  }

  scores.forEach(entry => {
    const row = document.createElement('div');
    row.className = 'leaderboard-row';
    const nameEl = document.createElement('span');
    nameEl.className = 'leaderboard-name';
    nameEl.textContent = entry.name;
    const scoreEl = document.createElement('span');
    scoreEl.className = 'leaderboard-score';
    scoreEl.textContent = `${entry.score} / ${entry.total}`;
    const dateEl = document.createElement('span');
    dateEl.className = 'leaderboard-date';
    dateEl.textContent = formatDateTime(entry.date);
    row.append(nameEl, scoreEl, dateEl);
    leaderboardList.appendChild(row);
  });
}

function goHome() {
  renderLeaderboard();
  nameInput.value = '';
  nameError.textContent = '';
  showScreen(screenStart);
}

function tryStartQuiz() {
  const name = nameInput.value.trim();
  if (!name) {
    nameError.textContent = 'Indique ton prénom pour commencer 🌺';
    nameInput.focus();
    return;
  }
  nameError.textContent = '';
  playerName = name;
  startQuiz();
}

function startQuiz() {
  order = shuffle(QUESTIONS.map((_, i) => i));
  currentIndex = 0;
  score = 0;
  showScreen(screenQuiz);
  renderQuestion();
}

function renderQuestion() {
  hasAnswered = false;
  feedback.textContent = '';
  feedback.className = 'feedback';
  btnNext.disabled = true;

  const q = QUESTIONS[order[currentIndex]];

  themeEmoji.textContent = q.emoji || '🌺';
  themeName.textContent = q.theme || '';
  questionText.textContent = q.question;

  progressText.textContent = `Question ${currentIndex + 1} / ${order.length}`;
  progressFill.style.width = `${(currentIndex / order.length) * 100}%`;

  optionsWrap.innerHTML = '';
  q.options.forEach((optionLabel, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${optionLabel}</span>`;
    btn.addEventListener('click', () => selectOption(i, q));
    optionsWrap.appendChild(btn);
  });
}

function selectOption(selectedIndex, q) {
  if (hasAnswered) return;
  hasAnswered = true;

  const optionButtons = optionsWrap.querySelectorAll('.option');
  optionButtons.forEach((btn, i) => {
    btn.classList.add('option--locked');
    if (i === q.answerIndex) {
      btn.classList.add('option--correct');
    } else if (i === selectedIndex) {
      btn.classList.add('option--wrong');
    }
  });

  if (selectedIndex === q.answerIndex) {
    score++;
    feedback.textContent = '✅ Bien joué, c\'est la bonne réponse !';
    feedback.classList.add('feedback--correct');
  } else {
    feedback.textContent = '❌ Raté, ce n\'était pas ça !';
    feedback.classList.add('feedback--wrong');
  }

  btnNext.disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= order.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

function endQuiz() {
  progressFill.style.width = '100%';
  scoreText.textContent = `${playerName}, tu as trouvé ${score} / ${order.length} bonnes réponses`;
  if (window.QcaimeDB) {
    window.QcaimeDB.saveScoreEntry({ name: playerName, score, total: order.length, date: new Date().toISOString() });
  }
  showScreen(screenEnd);
}

btnStart.addEventListener('click', tryStartQuiz);
nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') tryStartQuiz();
});
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', startQuiz);
btnHome.addEventListener('click', goHome);

if (window.QcaimeDB) {
  window.QcaimeDB.subscribeScores(scores => {
    cachedScores = scores;
    if (screenStart.classList.contains('screen--active')) renderLeaderboard();
  });
}
renderLeaderboard();
