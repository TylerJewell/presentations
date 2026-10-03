// Console tour data, shared by index.html and home-band.html.
// `crumb` is the small line in the home band and `title` the heading on the tour page;
// both are author copy. `label` is the screenshot's own page heading, shown when `title`
// is empty. `id` names the screen's image files and its #link on the tour page.
window.TOUR = {
  sections: ["Platform", "Specify", "Verify", "Optimize"],
  screens: [
    { id: "canvas",                section: "Platform",  crumb: "canvas",                                                    label: "Ship readiness of the Loan Origination Assistant",  title: "AI explorer" },
    { id: "canvas-trace",          section: "Platform",  crumb: "canvas",                                                    label: "Design options",                                    title: "Traces on the canvas" },
    { id: "service",               section: "Platform",  crumb: "orchestration",                                             label: "loan-origination",                                  title: "Orchestration" },
    { id: "endpoint",              section: "Platform",  crumb: "orchestration › endpoint",                                  label: "HumanOversightEndpoint",                            title: "API endpoints" },
    { id: "environments",          section: "Platform",  crumb: "projects",                                                  label: "Projects",                                          title: "Environments" },
    { id: "agents",                section: "Platform",  crumb: "agents",                                                    label: "Agents",                                            title: "Agents" },
    { id: "agent",                 section: "Platform",  crumb: "agents › applicant-support",                                label: "applicant-support",                                 title: "Agent identity and cost" },
    { id: "agent-tools",           section: "Platform",  crumb: "agents › applicant-support",                                label: "Agents",                                            title: "Agent tools and MCP servers" },
    { id: "playground",            section: "Platform",  crumb: "agents › playground",                                       label: "Playground",                                        title: "Agent playground" },
    { id: "specs",                 section: "Specify",   crumb: "specify › specs",                                           label: "Specs for Loan Origination Assistant",              title: "Spec-driven delivery" },
    { id: "codebook-graph",        section: "Specify",   crumb: "specify › codebook",                                        label: "Codebook for Loan Origination Assistant",           title: "Self-documenting systems" },
    { id: "codebook-endpoint",     section: "Specify",   crumb: "specify › codebook",                                        label: "Codebook for Loan Origination Assistant",           title: "Self-explaining code" },
    { id: "integration",           section: "Specify",   crumb: "specify › testing › integration",                           label: "Integration",                                       title: "Integration tests" },
    { id: "integration-class",     section: "Specify",   crumb: "specify › testing › integration",                           label: "Integration",                                       title: "Testkit coverage" },
    { id: "integration-untested",  section: "Specify",   crumb: "specify › testing › integration",                           label: "Integration",                                       title: "Components without tests" },
    { id: "integration-run",       section: "Specify",   crumb: "specify › testing › integration",                           label: "Integration",                                       title: "Run tests" },
    { id: "evals",                 section: "Specify",   crumb: "specify › testing › evals",                                 label: "Evals for Loan Origination Assistant",              title: "Evals" },
    { id: "evals-run",             section: "Specify",   crumb: "specify › testing › evals › notice-writer-explanations",    label: "Evals for Loan Origination Assistant",              title: "Eval results" },
    { id: "evals-compare",         section: "Specify",   crumb: "specify › testing › evals › compare",                       label: "Evals for Loan Origination Assistant",              title: "Comparing eval runs" },
    { id: "adversarial",           section: "Specify",   crumb: "specify › testing › adversarial",                           label: "Adversarial tests for Loan Origination Assistant",  title: "Adversarial testing" },
    { id: "adversarial-run",       section: "Specify",   crumb: "specify › testing › adversarial › notice-writer-red-team",  label: "Adversarial tests for Loan Origination Assistant",  title: "Red team results" },
    { id: "adversarial-corpora",   section: "Specify",   crumb: "specify › testing › adversarial › corpora",                 label: "Corpora and rules for Loan Origination Assistant",  title: "Attack corpora and rules" },
    { id: "exit-conditions",       section: "Specify",   crumb: "specify › exit-conditions",                                 label: "Exit conditions for Loan Origination Assistant",    title: "Exit conditions" },
    { id: "risk",                  section: "Verify",    crumb: "verify › risk",                                             label: "Risk for Loan Origination Assistant",               title: "Risk" },
    { id: "controls-corpus",       section: "Verify",    crumb: "verify › controls › corpus",                                label: "Controls for Loan Origination Assistant",           title: "Regulation corpus" },
    { id: "controls-bundle",       section: "Verify",    crumb: "verify › controls › bundle",                                label: "Controls for Loan Origination Assistant",           title: "Controls" },
    { id: "controls-sign",         section: "Verify",    crumb: "verify › controls › sign",                                  label: "Controls for Loan Origination Assistant",           title: "Signed bundles" },
    { id: "evaluations",           section: "Verify",    crumb: "verify › evaluations",                                      label: "Evaluations",                                       title: "Online evaluations" },
    { id: "evaluations-agent",     section: "Verify",    crumb: "verify › evaluations",                                      label: "Evaluations",                                       title: "Evaluations by agent" },
    { id: "human",                 section: "Verify",    crumb: "verify › human",                                            label: "Human",                                             title: "HITL console" },
    { id: "human-decision",        section: "Verify",    crumb: "verify › human › event",                                    label: "Should notice generation stop now?",                title: "HITL action" },
    { id: "human-quality",         section: "Verify",    crumb: "verify › human › quality",                                  label: "Human",                                             title: "HITL quality" },
    { id: "human-heatmap",         section: "Verify",    crumb: "verify › human › quality",                                  label: "Human",                                             title: "Oversight by control" },
    { id: "traces",                section: "Verify",    crumb: "verify › activity › traces",                                label: "Traces",                                            title: "Traces" },
    { id: "traces-flow",           section: "Verify",    crumb: "verify › activity › traces",                                label: "POST /playground/judges/{judgeId}/turns",           title: "Trace flow" },
    { id: "trace",                 section: "Verify",    crumb: "verify › activity › traces › trace",                        label: "POST /playground/judges/{judgeId}/turns",           title: "API trace" },
    { id: "trace-exchange",        section: "Verify",    crumb: "verify › activity › traces › trace",                        label: "POST /playground/judges/{judgeId}/turns",           title: "Gateway exchange" },
    { id: "conversations",         section: "Verify",    crumb: "verify › activity › conversations",                         label: "Conversations",                                     title: "Historical conversations" },
    { id: "conversation",          section: "Verify",    crumb: "verify › activity › conversations › id",                    label: "8cf075ec-9c43-d21b-05be-ed144786b3bf",              title: "Conversation transcript" },
    { id: "conversation-map",      section: "Verify",    crumb: "verify › activity › conversations › id",                    label: "8cf075ec-9c43-d21b-05be-ed144786b3bf",              title: "Conversation flow map" },
    { id: "verdicts",              section: "Verify",    crumb: "verify › activity › verdicts",                              label: "Verdicts for Loan Origination Assistant",           title: "Control outcomes" },
    { id: "verdict",               section: "Verify",    crumb: "verify › activity › verdicts › id",                         label: "Verdicts for Loan Origination Assistant",           title: "Control evidence" },
    { id: "replay",                section: "Verify",    crumb: "verify › activity › replay",                                label: "Training run replay",                               title: "Replay orchestration and trainings" },
    { id: "replay-trace",          section: "Verify",    crumb: "verify › activity › replay › trace",                        label: "Trace replay",                                      title: "Trace replay" },
    { id: "compliance",            section: "Verify",    crumb: "verify › compliance",                                       label: "Compliance",                                        title: "Compliance" },
    { id: "spend",                 section: "Optimize",  crumb: "optimize › spend › breakdown",                              label: "Spend",                                             title: "Spend" },
    { id: "spend-compare",         section: "Optimize",  crumb: "optimize › spend › compare",                                label: "Compare",                                           title: "Spend comparison" },
    { id: "savings",               section: "Optimize",  crumb: "optimize › spend › savings",                                label: "Savings",                                           title: "Savings" },
    { id: "prices",                section: "Optimize",  crumb: "optimize › spend › prices",                                 label: "Prices",                                            title: "Model prices" },
    { id: "tokens",                section: "Optimize",  crumb: "optimize › spend › tokens",                                 label: "Tokens",                                            title: "Tokens" },
    { id: "use-cases",             section: "Optimize",  crumb: "optimize › routing › use-cases",                            label: "Use cases",                                         title: "Use cases" },
    { id: "rulesets",              section: "Optimize",  crumb: "optimize › routing › rulesets",                             label: "Rulesets",                                          title: "Rulesets" },
    { id: "rollouts",              section: "Optimize",  crumb: "optimize › routing › rollouts",                             label: "Rollouts",                                          title: "Rollouts" },
    { id: "models",                section: "Optimize",  crumb: "optimize › models",                                         label: "Models",                                            title: "Model registry" },
    { id: "model",                 section: "Optimize",  crumb: "optimize › models › support-slm-v1",                        label: "support-slm-v1",                                    title: "Model lineage and evidence" },
    { id: "model-health",          section: "Optimize",  crumb: "optimize › models › support-slm-v1",                        label: "support-slm-v1",                                    title: "Model health and usage" },
    { id: "training",              section: "Optimize",  crumb: "optimize › training",                                       label: "Training",                                          title: "Training" }
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
