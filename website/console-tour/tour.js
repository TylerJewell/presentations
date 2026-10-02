// Console tour data, shared by index.html and home-band.html.
// `crumb` is the small line in the home band and `title` the heading on the tour page;
// both are author copy. `label` is the screenshot's own page heading, shown when `title`
// is empty. `id` names the screen's image files and its #link on the tour page.
window.TOUR = {
  sections: ["Platform", "Specify", "Verify", "Optimize"],
  screens: [
    { id: "canvas",          section: "Platform", crumb: "canvas",                                            label: "Design options",     title: "AI explorer" },
    { id: "service",         section: "Platform", crumb: "orchestration",                                     label: "gateway-router",     title: "Orchestration" },
    { id: "endpoint",        section: "Platform", crumb: "orchestration › endpoint",                          label: "DeploymentEndpoint", title: "API endpoints" },
    { id: "trace",           section: "Platform", crumb: "orchestration › request-tracing",                   label: "Trace",              title: "API trace" },
    { id: "environments",    section: "Platform", crumb: "projects",                                          label: "Environments",       title: "Environments" },
    { id: "agents",          section: "Platform", crumb: "agents",                                            label: "Agents",             title: "Agents" },
    { id: "playground",      section: "Platform", crumb: "agents › playground",                               label: "Playground",         title: "Agent playground" },
    { id: "specs",           section: "Specify",  crumb: "specify › specs",                                   label: "Specs",              title: "Spec-driven delivery" },
    { id: "docs-graph",      section: "Specify",  crumb: "specify › diagrams",                                label: "Docs",               title: "Self-documenting systems" },
    { id: "docs-endpoint",   section: "Specify",  crumb: "specify › diagrams",                                label: "Docs",               title: "Self-explaining code" },
    { id: "exit-conditions", section: "Specify",  crumb: "specify › exit-conditions",                         label: "Exit conditions",    title: "Exit conditions" },
    { id: "risk",            section: "Verify",   crumb: "verify › risk",                                     label: "Risk",               title: "Risk" },
    { id: "controls-corpus", section: "Verify",   crumb: "verify › controls › corpus",                        label: "Controls",           title: "Controls" },
    { id: "controls-bundle", section: "Verify",   crumb: "verify › controls › bundle",                        label: "Controls",           title: "Controls" },
    { id: "controls-sign",   section: "Verify",   crumb: "verify › controls › sign",                          label: "Signed bundles",     title: "Signed bundles" },
    { id: "evaluations",     section: "Verify",   crumb: "verify › evaluations › notice-writer-explanations", label: "Evaluations",        title: "Evaluations" },
    { id: "red-teaming",     section: "Verify",   crumb: "verify › red-team › notice-writer-red-team",        label: "Red teaming",        title: "Red teaming" },
    { id: "human",           section: "Verify",   crumb: "verify › human",                                    label: "Human",              title: "HITL console" },
    { id: "human-decision",  section: "Verify",   crumb: "verify › human",                                    label: "Human",              title: "HITL action" },
    { id: "traces",          section: "Verify",   crumb: "verify › traces",                                   label: "Traces",             title: "Traces" },
    { id: "conversations",   section: "Verify",   crumb: "verify › conversations",                            label: "Conversations",      title: "Historical conversations" },
    { id: "verdicts",        section: "Verify",   crumb: "verify › verdicts",                                 label: "Verdicts",           title: "Control outcomes" },
    { id: "replay",          section: "Verify",   crumb: "verify › replay",                                   label: "Replay",             title: "Replay orchestration and trainings" },
    { id: "compliance",      section: "Verify",   crumb: "verify › compliance",                               label: "Compliance",         title: "Compliance" },
    { id: "spend",           section: "Optimize", crumb: "optimize › spend › breakdown",                      label: "Spend",              title: "Spend" },
    { id: "tokens",          section: "Optimize", crumb: "optimize › spend › tokens",                         label: "Tokens",             title: "Tokens" },
    { id: "use-cases",       section: "Optimize", crumb: "optimize › routing › use-cases",                    label: "Use cases",          title: "Use cases" },
    { id: "rulesets",        section: "Optimize", crumb: "optimize › routing › rulesets",                     label: "Rulesets",           title: "Rulesets" },
    { id: "rollouts",        section: "Optimize", crumb: "optimize › routing › rollouts",                     label: "Rollouts",           title: "Rollouts" },
    { id: "models",          section: "Optimize", crumb: "optimize › models",                                 label: "Models",             title: "Models" }
  ]
};

// Images load from img/ beside the page unless TOUR_IMG_BASE names another folder (akka.io sets it).
window.TOUR.screens.forEach(function (s) {
  var base = (window.TOUR_IMG_BASE || "img/") + s.id;
  s.src = base + "-1280.webp";
  s.srcset = base + "-1280.webp 1280w, " + base + "-2560.webp 2560w";
});

// Crossfades a stage's two <img> layers to screen `s`. The incoming layer is shown only
// once it has loaded; a newer call supersedes an older one still loading.
window.TOUR.show = function (stage, s) {
  var imgs = stage.querySelectorAll("img");
  var front = stage.querySelector("img.on") || imgs[1];
  var back = front === imgs[0] ? imgs[1] : imgs[0];
  var token = (stage._token = (stage._token || 0) + 1);
  function swap() {
    if (token !== stage._token) return;
    back.classList.add("on");
    front.classList.remove("on");
  }
  back.onload = swap;
  back.alt = s.title || s.label;
  back.srcset = s.srcset;
  back.src = s.src;
  if (back.complete && back.naturalWidth) swap();
};

window.TOUR.preload = function (s, sizes) {
  var im = new Image();
  im.sizes = sizes;
  im.srcset = s.srcset;
  im.src = s.src;
};
