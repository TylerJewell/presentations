/* Deck keyboard nav — Arrow / PageUp / PageDown jumps between slides.
 *
 * The list of "views" is derived at runtime from the .slide-anchor
 * elements the builder emits in front of every slide. This means the
 * registry is the single source of truth: any slide added / removed /
 * reordered in slide-registry.json is automatically picked up here
 * without needing to update this file. */
(function () {

  function collectViews() {
    // Every slide has a <a class="slide-anchor" id="<slide-id>"> emitted
    // immediately before its wrapper by builder/build.py.
    return Array.prototype.slice.call(
      document.querySelectorAll('a.slide-anchor')
    );
  }

  function viewTop(el) {
    return el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
  }

  function currentViewIndex(views) {
    var scrollY = window.scrollY || window.pageYOffset;
    var best = 0;
    for (var i = 0; i < views.length; i++) {
      if (viewTop(views[i]) <= scrollY + 10) best = i;
    }
    return best;
  }

  document.addEventListener('keydown', function (e) {
    var views = collectViews();
    if (!views.length) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      var idx = currentViewIndex(views);
      if (idx < views.length - 1) {
        window.scrollTo({ top: viewTop(views[idx + 1]), behavior: 'smooth' });
      }
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      var idx = currentViewIndex(views);
      var scrollY = window.scrollY || window.pageYOffset;
      // If we're partway into the current view, snap to its top first.
      if (scrollY > viewTop(views[idx]) + 10 && idx >= 0) {
        window.scrollTo({ top: viewTop(views[idx]), behavior: 'smooth' });
      } else if (idx > 0) {
        window.scrollTo({ top: viewTop(views[idx - 1]), behavior: 'smooth' });
      }
    }
  });
})();
