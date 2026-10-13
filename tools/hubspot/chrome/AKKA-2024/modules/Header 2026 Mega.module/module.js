document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header-2026');
  if (!header) return;

  var btn = header.querySelector('.js-menu-toggle');
  var overlay = header.querySelector('.header-2026__overlay');
  var kapaTrigger = header.querySelector('.js-kapa-trigger');
  var compareLists = header.querySelectorAll('.mega-compare');

  // Assign cascade indices and tag reveal targets
  header.querySelectorAll('.mega-grid > .mega-col').forEach(function(col, ci) {
    col.style.setProperty('--col', ci);
    col.querySelectorAll('.mega-heading, .mega-links li, .mega-compare a, .cust-thumb, .mega-feature-card, .cust-seeall').forEach(function(el, ii) {
      el.style.setProperty('--item', ii);
      el.classList.add('reveal');
    });
  });

  // Drop trailing dot on whichever item ends each wrapped line
  function trimCompareDots() {
    compareLists.forEach(function(list) {
      var items = list.querySelectorAll('a');
      items.forEach(function(a) { a.classList.remove('line-end'); });
      for (var i = 0; i < items.length - 1; i++) {
        if (items[i + 1].offsetTop > items[i].offsetTop) {
          items[i].classList.add('line-end');
        }
      }
    });
  }

  function openMenu() {
    header.classList.add('is-menu-open');
    document.body.classList.add('nav-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
    var panel = overlay.querySelector('.header-2026__megamenu-panel');
    if (panel) void panel.offsetHeight;
    header.classList.add('is-revealed');
    trimCompareDots();
  }

  function closeMenu() {
    header.classList.remove('is-menu-open');
    header.classList.remove('is-revealed');
    document.body.classList.remove('nav-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  }

  function toggleMenu() {
    if (header.classList.contains('is-menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      var panel = header.querySelector('.header-2026__megamenu-panel');
      if (panel && !panel.contains(e.target)) {
        closeMenu();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-menu-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (header.classList.contains('is-menu-open')) trimCompareDots();
  });

  // Kapa AI search integration
  function openKapaWidget() {
    var existingLauncher = document.querySelector(
      [
        '[data-kapa-widget-trigger]',
        '[data-kapa-trigger]',
        '.kapa-widget-button',
        '.kapa-launcher',
        '.kapa-ai-button',
        'button[aria-label*="Ask AI"]',
        'button[aria-label*="ASK AI"]',
        '[title*="Ask AI"]',
        '[title*="ASK AI"]'
      ].join(',')
    );

    if (existingLauncher) {
      existingLauncher.click();
      return true;
    }

    if (window.Kapa && typeof window.Kapa.open === 'function') {
      window.Kapa.open();
      return true;
    }

    if (window.kapaWidget && typeof window.kapaWidget.open === 'function') {
      window.kapaWidget.open();
      return true;
    }

    if (window.kapa && typeof window.kapa.open === 'function') {
      window.kapa.open();
      return true;
    }

    return false;
  }

  if (kapaTrigger) {
    kapaTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (header.classList.contains('is-menu-open')) {
        closeMenu();
      }
      window.setTimeout(function () {
        openKapaWidget();
      }, 50);
    });
  }
});