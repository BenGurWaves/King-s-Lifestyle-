/* pillar-template.js – v0.0.5 */
/* ============================================================
   Shared Pillar Page Interactivity
   Quiz · Checklist · Scenario Solver · Journal Save
   ============================================================ */

function initPillar(pillarId) {
  if (!requireAuth()) return;
  initPrivate();

  loadChecklist(pillarId);
  initJournalSave(pillarId);
  initQuiz();
  initScenarioSolver();
  initChecklistForm(pillarId);
}

/* ---------- Journal Prompt Saving ---------- */
function initJournalSave(pillarId) {
  document.querySelectorAll('.journal-save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textarea = btn.previousElementSibling;
      const prompt = btn.dataset.prompt;
      if (textarea && textarea.value.trim()) {
        saveJournalEntry(pillarId, prompt, textarea.value.trim());
        btn.textContent = 'Saved';
        btn.classList.add('bg-green-800');
        setTimeout(() => {
          btn.textContent = 'Save to Journal';
          btn.classList.remove('bg-green-800');
        }, 2000);
      }
    });
  });
}

/* ---------- Quiz ---------- */
function initQuiz() {
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const quiz = opt.closest('.quiz-block');
      quiz.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('border-[#A38255]', 'bg-[#A38255]/10');
      });
      opt.classList.add('border-[#A38255]', 'bg-[#A38255]/10');
      const feedback = quiz.querySelector('.quiz-feedback');
      if (feedback) {
        feedback.classList.remove('hidden');
        if (opt.dataset.correct === 'true') {
          feedback.textContent = 'Wise counsel indeed. You chose well.';
          feedback.className = 'quiz-feedback mt-4 text-sm font-playfair italic text-green-700 dark:text-green-400';
        } else {
          feedback.textContent = 'Consider again \u2014 a king weighs all options before deciding.';
          feedback.className = 'quiz-feedback mt-4 text-sm font-playfair italic text-[#571641] dark:text-[#A38255]';
        }
      }
    });
  });
}

/* ---------- Scenario Solver ---------- */
function initScenarioSolver() {
  const form = document.getElementById('scenarioForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('scenarioInput');
    const response = document.getElementById('scenarioResponse');
    const q = input.value.trim();
    if (!q) return;

    const responses = [
      "A king in this situation would first pause and assess. The gentleman\u2019s protocol: maintain composure, acknowledge the situation gracefully, and act with quiet authority. Lead with dignity, not with reaction.",
      "The royal approach: never let circumstance dictate your bearing. Address this with measured words, confident posture, and the understanding that how you handle difficulty defines your reign more than ease ever will.",
      "Consider the ancient principle: \u201CHe who rules his spirit is mightier than he who takes a city.\u201D In this scenario, your greatest weapon is patient, deliberate action. Respond, never react.",
      "A true gentleman transforms awkwardness into grace. Acknowledge what is happening with calm humor or quiet confidence. The room follows the man who is least disturbed by the disturbance.",
      "The king\u2019s way is preparation meeting composure. You cannot control the situation, but you can control how you carry yourself through it. That control is your crown."
    ];

    const responseDiv = document.createElement('div');
    responseDiv.className = 'p-6 bg-white/10 rounded-xl border border-[#A38255]/10 mt-4';
    responseDiv.style.animation = 'fadeIn 0.5s ease-out';
    const responseText = document.createElement('p');
    responseText.className = 'font-playfair italic text-[#A38255] text-sm';
    responseText.textContent = responses[Math.floor(Math.random() * responses.length)];
    responseDiv.appendChild(responseText);
    response.textContent = '';
    response.appendChild(responseDiv);
    input.value = '';
  });
}

/* ---------- Checklist ---------- */
function initChecklistForm(pillarId) {
  const form = document.getElementById('checklistForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('checklistInput');
    if (input.value.trim()) {
      addChecklistItem(pillarId, input.value.trim());
      input.value = '';
      loadChecklist(pillarId);
    }
  });
}

function loadChecklist(pillarId) {
  const container = document.getElementById('checklistItems');
  if (!container) return;
  const items = getChecklist(pillarId);
  container.textContent = '';

  if (!items.length) {
    const empty = document.createElement('p');
    empty.className = 'text-sm text-[#08052D]/30 dark:text-white/20 italic';
    empty.textContent = 'No items yet. Build your royal checklist.';
    container.appendChild(empty);
    return;
  }

  items.forEach((item, i) => {
    const label = document.createElement('label');
    label.className = 'flex items-center gap-3 px-4 py-3 rounded-lg border border-[#A38255]/10 bg-white/50 dark:bg-white/5 cursor-pointer hover:border-[#A38255]/30 transition group';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.className = 'accent-[#A38255]';
    checkbox.onchange = () => { toggleChecklistItem(pillarId, i); };

    const text = document.createElement('span');
    text.className = 'text-sm font-inter' + (item.done ? ' line-through opacity-50' : '');
    text.textContent = item.text;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'ml-auto text-[#A38255]/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition';
    removeBtn.textContent = '\u00D7';
    removeBtn.onclick = (e) => { e.preventDefault(); removeChecklistItem(pillarId, i); };

    label.append(checkbox, text, removeBtn);
    container.appendChild(label);
  });
}

function addChecklistItem(pillarId, text) {
  const items = getChecklist(pillarId);
  items.push({ text, done: false });
  saveChecklist(pillarId, items);
}

function toggleChecklistItem(pillarId, index) {
  const items = getChecklist(pillarId);
  items[index].done = !items[index].done;
  saveChecklist(pillarId, items);
  loadChecklist(pillarId);
}

function removeChecklistItem(pillarId, index) {
  const items = getChecklist(pillarId);
  items.splice(index, 1);
  saveChecklist(pillarId, items);
  loadChecklist(pillarId);
}
