/* Copies "install Akka from akka.ai" from any .akka-install button. A page can carry the
   script more than once (the footer and the page body both include it); the flag keeps
   one listener. */
(function () {
  if (window.__akkaInstallLine) return;
  window.__akkaInstallLine = true;
  var TEXT = "install Akka from akka.ai";

  function fallback() {
    var a = document.createElement("textarea");
    a.value = TEXT;
    a.setAttribute("readonly", "");
    a.style.position = "fixed";
    a.style.opacity = "0";
    document.body.appendChild(a);
    a.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(a);
  }

  function copy() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(TEXT).catch(fallback);
    } else {
      fallback();
    }
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button.akka-install") : null;
    if (!b) return;
    copy();
    var cp = b.querySelector(".akka-install__cp");
    b.classList.add("is-copied");
    if (cp) cp.textContent = "Copied";
    clearTimeout(b._akkaInstallTimer);
    b._akkaInstallTimer = setTimeout(function () {
      b.classList.remove("is-copied");
      if (cp) cp.textContent = "Copy";
    }, 1600);
  });
})();
