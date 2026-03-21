/* Shared pillar page interactivity — loaded by each pillar HTML */

function initPillar(pillarId) {
  // Checklist functionality
  loadChecklist(pillarId);

  // Journal prompt saving
  document.querySelectorAll('.journal-save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textarea = btn.previousElementSibling;
      const prompt = btn.dataset.prompt;
      if (textarea.value.trim()) {
        saveJournalEntry(pillarId, prompt, textarea.value.trim());
        btn.textContent = 'Saved ✓';
        btn.classList.add('bg-green-700');
        setTimeout(() => {
          btn.textContent = 'Save to Journal';
          btn.classList.remove('bg-green-700');
        }, 2000);
      }
    });
  });

  // Quiz functionality
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const quiz = opt.closest('.quiz-block');
      quiz.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('border-royal-gold', 'bg-royal-gold/10'));
      opt.classList.add('border-royal-gold', 'bg-royal-gold/10');
      const feedback = quiz.querySelector('.quiz-feedback');
      if (opt.dataset.correct === 'true') {
        feedback.textContent = 'Wise counsel indeed. You chose well.';
        feedback.className = 'quiz-feedback mt-4 text-sm font-playfair italic text-green-700 dark:text-green-400';
      } else {
        feedback.textContent = 'Consider again — a king weighs all options before deciding.';
        feedback.className = 'quiz-feedback mt-4 text-sm font-playfair italic text-royal-plum dark:text-royal-gold';
      }
      feedback.classList.remove('hidden');
    });
  });

  // Scenario solver
  const scenarioForm = document.getElementById('scenarioForm');
  if (scenarioForm) {
    scenarioForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('scenarioInput');
      const response = document.getElementById('scenarioResponse');
      const responses = [
        `A king in this situation would first pause and assess. The gentleman's protocol: maintain composure, acknowledge the situation gracefully, and act with quiet authority. Specifically for "${input.value.substring(0, 40)}..." — lead with dignity, not with reaction.`,
        `The royal approach: never let circumstance dictate your bearing. Address this with measured words, confident posture, and the understanding that how you handle difficulty defines your reign more than ease ever will.`,
        `Consider the ancient principle: "He who rules his spirit is mightier than he who takes a city." In this scenario, your greatest weapon is patient, deliberate action. Respond, never react.`
      ];
      response.innerHTML = `<div class="p-6 bg-royal-sapphire/5 dark:bg-white/5 rounded-xl border border-royal-gold/10 animate-fadeIn">
        <p class="font-playfair italic text-royal-plum dark:text-royal-gold text-sm">${responses[Math.floor(Math.random() * responses.length)]}</p>
      </div>`;
      input.value = '';
    });
  }

  // Checklist add
  const checklistForm = document.getElementById('checklistForm');
  if (checklistForm) {
    checklistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('checklistInput');
      if (input.value.trim()) {
        addChecklistItem(pillarId, input.value.trim());
        input.value = '';
        loadChecklist(pillarId);
      }
    });
  }
}

function loadChecklist(pillarId) {
  const container = document.getElementById('checklistItems');
  if (!container) return;
  const items = getChecklist(pillarId);
  container.innerHTML = items.length ? items.map((item, i) => `
    <label class="flex items-center gap-3 px-4 py-3 rounded-lg border border-royal-gold/10 bg-white/50 dark:bg-white/5 cursor-pointer hover:border-royal-gold/30 transition group">
      <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleChecklistItem('${pillarId}', ${i})" class="accent-royal-gold">
      <span class="${item.done ? 'line-through opacity-50' : ''} text-sm font-inter">${item.text}</span>
      <button onclick="removeChecklistItem('${pillarId}', ${i})" class="ml-auto text-royal-gold/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">&times;</button>
    </label>
  `).join('') : '<p class="text-sm text-royal-sapphire/30 dark:text-white/20 italic">No items yet. Build your royal checklist.</p>';
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
