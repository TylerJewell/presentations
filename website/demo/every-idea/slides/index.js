/* Every idea: the one-minute film as a deck. Loaded with plain script tags (no modules), so the deck runs
   from file://. Act names appear only in the presenter view, never on screen. */
window.TALK_ACTS = { film: { name: 'Every idea' } };
window.TALK_ORDER = ['every-idea'];

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
