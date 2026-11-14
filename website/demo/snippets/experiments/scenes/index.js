/* The scene registry: every scene file in storyboard order, and each part's caption eyebrow.
   Loaded by index.html with plain script tags (no modules), so the snippet runs from file://. */
window.MOCK_ACTS = {
  0: { kicker: 'Akka', label: 'Akka', card: false },
  1: { kicker: 'Optimize', label: 'Optimize', card: false },
  2: { kicker: 'Experiments', label: 'Optimize › Experiments', card: false },
  3: { kicker: 'Akka', label: 'Akka', card: false },
};

window.MOCK_ORDER = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7'];

(function () {
  const base = document.currentScript.src.replace(/index\.js(\?.*)?$/, '');
  window.MOCK_ORDER.forEach((id) => {
    const s = document.createElement('script');
    s.src = base + id + '.js';
    s.async = false;
    s.onerror = () => console.error(`scene file scenes/${id}.js failed to load`);
    document.head.appendChild(s);
  });
})();
