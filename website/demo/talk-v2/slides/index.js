/* The talk's acts and slide order. A slide listed in V1 loads unchanged from ../../talk/slides; every other
   slide is this deck's own file here. Loaded with plain script tags (no modules), so the deck runs from
   file://. Act names appear only in the presenter view, never on screen. */
window.TALK_ACTS = {
  open: { name: 'Opening' },
  problems: { name: 'Four problems' },
  principles: { name: 'Principles' },
  together: { name: 'How it comes together' },
  close: { name: 'Close and questions' },
};

window.TALK_ORDER = [
  'title', 'clocks',
  'four-problems', 'rules', 'ten-countries', 'backlog', 'untested',
  'principles-card', 'corpus', 'five-types', 'flavors', 'three-sources', 'software', 'verdicts', 'drift', 'every-agent', 'measured',
  'together-card', 'platform', 'board', 'change', 'record', 'experiment',
  'closing', 'questions',
];

/* Slides that load unchanged from the first version of the talk. */
const V1 = new Set(['together-card', 'questions']);

(function () {
  const base = document.currentScript.src.replace(/index\.js(\?.*)?$/, '');
  window.TALK_ORDER.forEach((id) => {
    const s = document.createElement('script');
    s.src = (V1.has(id) ? base + '../../talk/slides/' : base) + id + '.js';
    s.async = false;
    s.onerror = () => console.error(`slide file for ${id} failed to load from ${s.src}`);
    document.head.appendChild(s);
  });
})();
