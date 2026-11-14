/* The talk's acts and slide order. Loaded with plain script tags (no modules), so the deck runs from
   file://. Act names appear only in the presenter view, never on screen. */
window.TALK_ACTS = {
  open: { name: 'Opening' },
  clocks: { name: 'Two clocks' },
  shape: { name: 'Governance changes shape' },
  principles: { name: 'Principles' },
  together: { name: 'How it comes together' },
  close: { name: 'Close and questions' },
};

window.TALK_ORDER = [
  'title',
  'clocks', 'in-their-words', 'rules', 'capability', 'cadence',
  'shape-card', 'documents', 'audits', 'system', 'posture',
  'principles-card', 'corpus', 'five-types', 'three-sources', 'software', 'verdicts', 'drift', 'every-agent', 'person-decides',
  'together-card', 'platform', 'stitched', 'board', 'change', 'record', 'experiment',
  'closing', 'questions',
];

(function () {
  const base = document.currentScript.src.replace(/index\.js(\?.*)?$/, '');
  window.TALK_ORDER.forEach((id) => {
    const s = document.createElement('script');
    s.src = base + id + '.js';
    s.async = false;
    s.onerror = () => console.error(`slide file slides/${id}.js failed to load`);
    document.head.appendChild(s);
  });
})();
