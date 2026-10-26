// Console tour data, shared by index.html and home-band.html.
// `crumb` is the small line in the home band and `title` the heading on the tour page;
// both are author copy. `label` is the screenshot's own page heading, shown when `title`
// is empty. `id` names the screen's image files and its #link on the tour page.
window.TOUR = {
  sections: ["Platform", "Specify", "Verify", "Optimize"],
  screens: [
    { id: "system",                  section: "Platform",  crumb: "system › overview",                                 label: "Loan Origination Assistant",                      title: "System overview" },
    { id: "agents",                  section: "Platform",  crumb: "system › agents",                                   label: "Agents",                                          title: "Agents" },
    { id: "agent",                   section: "Platform",  crumb: "system › agents › applicant-support",               label: "applicant-support",                               title: "Agent identity and cost" },
    { id: "canvas",                  section: "Platform",  crumb: "ask",                                               label: "Is the Loan Origination Assistant ready to ship?", title: "AI explorer" },
    { id: "specs",                   section: "Specify",   crumb: "build › specs",                                     label: "Specs for Loan Origination Assistant",            title: "Spec-driven delivery" },
    { id: "codebook-graph",          section: "Specify",   crumb: "build › code",                                      label: "Codebook for Loan Origination Assistant",         title: "Self-documenting systems" },
    { id: "codebook-endpoint",       section: "Specify",   crumb: "build › code",                                      label: "Codebook for Loan Origination Assistant",         title: "Self-explaining code" },
    { id: "exit-conditions",         section: "Specify",   crumb: "build › exit conditions",                           label: "Exit conditions for Loan Origination Assistant",  title: "Exit conditions" },
    { id: "playground",              section: "Platform",  crumb: "inference › playground",                            label: "Playground",                                      title: "Agent playground" },
    { id: "integration",             section: "Specify",   crumb: "test › integration",                                label: "Integration",                                     title: "Integration tests" },
    { id: "evals",                   section: "Specify",   crumb: "test › evals",                                      label: "Evals for Loan Origination Assistant",            title: "Evals" },
    { id: "evals-run",               section: "Specify",   crumb: "test › evals › notice-writer-explanations",         label: "Evals for Loan Origination Assistant",            title: "Eval results" },
    { id: "adversarial",             section: "Specify",   crumb: "test › adversarial",                                label: "Adversarial tests for Loan Origination Assistant", title: "Adversarial testing" },
    { id: "adversarial-run",         section: "Specify",   crumb: "test › adversarial › notice-writer-red-team",       label: "Adversarial tests for Loan Origination Assistant", title: "Red team results" },
    { id: "controls-board",          section: "Verify",    crumb: "controls › decide",                                 label: "Loan Origination Assistant",                      title: "One board for the contract" },
    { id: "controls-describe",       section: "Verify",    crumb: "controls › describe",                               label: "Loan Origination Assistant",                      title: "Risk profile" },
    { id: "controls-plan",           section: "Verify",    crumb: "controls › plan",                                   label: "Loan Origination Assistant",                      title: "Controls bound to code" },
    { id: "controls-inforce",        section: "Verify",    crumb: "controls › in force › v6",                          label: "Loan Origination Assistant",                      title: "Controls in force" },
    { id: "controls-compare",        section: "Verify",    crumb: "controls › v5 › v6",                                label: "Loan Origination Assistant",                      title: "Compare two versions" },
    { id: "conversations",           section: "Verify",    crumb: "activity › conversations",                          label: "Conversations",                                   title: "Historical conversations" },
    { id: "conversation",            section: "Verify",    crumb: "activity › conversations › transcript",             label: "A conversation with verdicts",                    title: "Conversation transcript" },
    { id: "conversation-map",        section: "Verify",    crumb: "activity › conversations › flow map",               label: "A conversation with verdicts",                    title: "Conversation flow map" },
    { id: "traces",                  section: "Verify",    crumb: "activity › traces",                                 label: "Traces",                                          title: "Traces" },
    { id: "trace",                   section: "Verify",    crumb: "activity › traces › trace",                         label: "A gateway trace",                                 title: "API trace" },
    { id: "trace-exchange",          section: "Verify",    crumb: "activity › traces › trace",                         label: "A gateway trace",                                 title: "Gateway exchange" },
    { id: "replay-trace",            section: "Verify",    crumb: "activity › replay › trace",                         label: "Trace replay",                                    title: "Trace replay" },
    { id: "service",                 section: "Platform",  crumb: "build › diagnose",                                  label: "loan-origination",                                title: "Orchestration" },
    { id: "human",                   section: "Verify",    crumb: "human › waiting",                                   label: "Human",                                           title: "HITL console" },
    { id: "human-decision",          section: "Verify",    crumb: "human › waiting › event",                           label: "The first waiting decision",                      title: "HITL action" },
    { id: "human-halts",             section: "Verify",    crumb: "human › halts",                                     label: "Halts",                                           title: "Halts" },
    { id: "verdicts",                section: "Verify",    crumb: "evidence › by control",                             label: "Verdicts",                                        title: "Control outcomes and drift" },
    { id: "verdicts-drift",          section: "Verify",    crumb: "evidence › by control",                             label: "Verdicts",                                        title: "Verdict drift" },
    { id: "verdict",                 section: "Verify",    crumb: "evidence › all verdicts › verdict",                 label: "Verdicts",                                        title: "Control evidence" },
    { id: "evaluations",             section: "Verify",    crumb: "evidence › by control",                             label: "Online evaluations",                              title: "Online evaluations" },
    { id: "compliance",              section: "Verify",    crumb: "evidence › compliance",                             label: "Compliance",                                      title: "Compliance" },
    { id: "packs",                   section: "Verify",    crumb: "evidence › packs",                                  label: "Evidence packs",                                  title: "Evidence packs" },
    { id: "spend",                   section: "Optimize",  crumb: "cost › costs",                                      label: "Spend",                                           title: "Spend" },
    { id: "efficiency",              section: "Optimize",  crumb: "cost › efficiency",                                 label: "Token efficiency",                                title: "Token efficiency" },
    { id: "efficiency-opportunity",  section: "Optimize",  crumb: "cost › efficiency",                                 label: "A saving, explained",                             title: "A saving, explained" },
    { id: "use-cases",               section: "Optimize",  crumb: "inference › use cases",                             label: "Use cases",                                       title: "Use cases" },
    { id: "use-case",                section: "Optimize",  crumb: "inference › use cases › refund-request",            label: "A use case",                                      title: "A use case" },
    { id: "budgets",                 section: "Optimize",  crumb: "cost › budgets",                                    label: "Budgets",                                         title: "Budgets" },
    { id: "budget",                  section: "Optimize",  crumb: "cost › budgets › support team",                     label: "Support team",                                    title: "Burn and forecast" },
    { id: "budget-variance",         section: "Optimize",  crumb: "cost › budgets › support team",                     label: "Support team",                                    title: "Variance explained" },
    { id: "experiments-canary",      section: "Optimize",  crumb: "inference › experiments › canary",                  label: "Smaller model for ticket triage",                 title: "A canary on live traffic" },
    { id: "experiments-hold",        section: "Optimize",  crumb: "inference › experiments › on hold",                 label: "Mistral for x-region=eu",                         title: "Held on a breach" },
    { id: "experiments-watch",       section: "Optimize",  crumb: "inference › experiments › watch",                   label: "claude-haiku-4-5 for order status",               title: "Watch after promotion" },
    { id: "experiments-direct",      section: "Optimize",  crumb: "inference › experiments › promoted directly",       label: "support-slm-v2 for refunds",                      title: "Promote directly" },
    { id: "experiments-new",         section: "Optimize",  crumb: "inference › experiments › new",                     label: "New experiment",                                  title: "Technique catalogue" },
    { id: "changes",                 section: "Optimize",  crumb: "cost › changes",                                    label: "Changes",                                         title: "Changes" },
    { id: "change",                  section: "Optimize",  crumb: "cost › changes › sql-report",                       label: "Preview a change",                                title: "A change record" },
    { id: "rulesets",                section: "Optimize",  crumb: "inference › routing",                               label: "Rulesets",                                        title: "Rulesets" },
    { id: "prices",                  section: "Optimize",  crumb: "cost › prices",                                     label: "Prices",                                          title: "Model prices" },
    { id: "models",                  section: "Optimize",  crumb: "inference › models",                                label: "Model registry",                                  title: "Model registry" },
    { id: "model-self-hosted",       section: "Optimize",  crumb: "inference › models › gpt-oss-20b",                  label: "support-slm-v1",                                  title: "Self-hosted model" },
    { id: "training",                section: "Optimize",  crumb: "training › runs",                                   label: "Training",                                        title: "Training" },
    { id: "gateway",                 section: "Optimize",  crumb: "inference › gateway",                               label: "Gateway",                                         title: "Live gateway traffic" },
    { id: "serving",                 section: "Optimize",  crumb: "inference › serving",                               label: "Serving",                                         title: "Serving policies" }
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
