/* The scene registry: every scene file in storyboard order, and each act's chapter card.
   Loaded by index.html with plain script tags (no modules), so the mock runs from file://.
   Scripts added here run in order, before the window's load event, when the player boots. */
window.MOCK_ACTS = {
  0: { kicker: 'Cold open', label: 'Cold open', short: 'Open', card: false },
  1: { kicker: 'Platform', label: 'Platform', title: 'One platform.', card: true },
  2: { kicker: 'Build', label: 'Build', title: 'From spec to proof.', card: true },
  3: { kicker: 'Govern', label: 'Govern', title: 'A contract that follows the code.', card: true },
  4: { kicker: 'Optimize', label: 'Optimize', title: 'A cheaper model earns its way in.', card: true },
  5: { kicker: 'Evidence', label: 'Evidence', title: 'One evidence record.', card: true },
  6: { kicker: 'Efficiency', label: 'Efficiency', title: 'Scale efficiently.', card: true },
};

window.MOCK_ORDER = [
  '0.1', '0.2',
  '1.1', '1.2',
  '2.1', '2.2',
  '3.1', '3.2', '3.3', '3.4',
  '4.1', '4.2', '4.3', '4.4', '4.5',
  '5.1',
  '6.1', '6.2', '6.3', '6.4', '6.5',
];

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
