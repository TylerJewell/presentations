// Console tour data, shared by index.html and home-band.html.
// `crumb` is the small line in the home band and `title` the heading on the tour page;
// both are author copy. `label` is the screenshot's own page heading, shown when `title`
// is empty. `id` names the screen's image files and its #link on the tour page.
window.TOUR = {
  sections: ["Platform", "Specify", "Verify", "Optimize"],
  screens: [
    { id: "system",                section: "Platform",                 crumb: "system › overview",                                       label: "Loan Origination Assistant",            title: "System overview" },
    { id: "agents",                section: "Platform",                 crumb: "system › agents",                                         label: "Agents",                                 title: "Agents" },
    { id: "agent",                section: "Platform",                 crumb: "system › agents › applicant-support",                     label: "applicant-support",                      title: "Agent identity and cost" },
    { id: "canvas",                section: "Platform",                 crumb: "ask",                                                     label: "Is the Loan Origination Assistant ready to ship?", title: "AI explorer" },
    { id: "specs",                section: "Specify",                  crumb: "build › specs",                                          label: "Specs for Loan Origination Assistant",  title: "Spec-driven delivery" },
    { id: "codebook-graph",                section: "Specify",                  crumb: "build › code",                                           label: "Codebook for Loan Origination Assistant", title: "Self-documenting systems" },
    { id: "codebook-endpoint",                section: "Specify",                  crumb: "build › code",                                           label: "Codebook for Loan Origination Assistant", title: "Self-explaining code" },
    { id: "exit-conditions",                section: "Specify",                  crumb: "build › exit conditions",                                label: "Exit conditions for Loan Origination Assistant", title: "Exit conditions" },
    { id: "playground",                section: "Platform",                 crumb: "build › playground",                                     label: "Playground",                             title: "Agent playground" },
    { id: "integration",                section: "Specify",                  crumb: "build › tests › integration",                            label: "Integration",                            title: "Integration tests" },
    { id: "evals",                section: "Specify",                  crumb: "build › tests › evals",                                  label: "Evals for Loan Origination Assistant",   title: "Evals" },
    { id: "evals-run",                section: "Specify",                  crumb: "build › tests › evals › notice-writer-explanations",    label: "Evals for Loan Origination Assistant",   title: "Eval results" },
    { id: "adversarial",                section: "Specify",                  crumb: "build › tests › adversarial",                            label: "Adversarial tests for Loan Origination Assistant", title: "Adversarial testing" },
    { id: "adversarial-run",                section: "Specify",                  crumb: "build › tests › adversarial › notice-writer-red-team",  label: "Adversarial tests for Loan Origination Assistant", title: "Red team results" },
    { id: "risk",                section: "Verify",                   crumb: "controls › risk",                                         label: "Risk for Loan Origination Assistant",   title: "Risk" },
    { id: "controls-corpus",                section: "Verify",                   crumb: "controls › corpus",                                       label: "Controls for Loan Origination Assistant", title: "Regulation corpus" },
    { id: "controls",                section: "Verify",                   crumb: "controls › controls",                                     label: "Controls for Loan Origination Assistant", title: "Controls in force" },
    { id: "controls-bundle",                section: "Verify",                   crumb: "controls › draft",                                        label: "Controls for Loan Origination Assistant", title: "Controls draft" },
    { id: "controls-sign",                section: "Verify",                   crumb: "controls › versions",                                     label: "Controls for Loan Origination Assistant", title: "Signed bundles" },
    { id: "conversations",                section: "Verify",                   crumb: "activity › conversations",                                label: "Conversations",                          title: "Historical conversations" },
    { id: "conversation",                section: "Verify",                   crumb: "activity › conversations › transcript",                   label: "A conversation with verdicts",           title: "Conversation transcript" },
    { id: "conversation-map",                section: "Verify",                   crumb: "activity › conversations › flow map",                     label: "A conversation with verdicts",           title: "Conversation flow map" },
    { id: "traces",                section: "Verify",                   crumb: "activity › traces",                                       label: "Traces",                                 title: "Traces" },
    { id: "trace",                section: "Verify",                   crumb: "activity › traces › trace",                               label: "A gateway trace",                        title: "API trace" },
    { id: "replay-trace",                section: "Verify",                   crumb: "activity › replay › trace",                               label: "Trace replay",                           title: "Trace replay" },
    { id: "service",                section: "Platform",                 crumb: "build › diagnose",                                        label: "loan-origination",                       title: "Orchestration" },
    { id: "human",                section: "Verify",                   crumb: "human › waiting",                                         label: "Human",                                  title: "HITL console" },
    { id: "human-decision",                section: "Verify",                   crumb: "human › waiting › event",                                 label: "The first waiting decision",             title: "HITL action" },
    { id: "human-changes",                section: "Verify",                   crumb: "human › waiting › changes",                               label: "Changes under review",                   title: "Changes under review" },
    { id: "human-halts",                section: "Verify",                   crumb: "human › halts",                                           label: "Halts",                                  title: "Halts" },
    { id: "human-quality",                section: "Verify",                   crumb: "human › officers",                                        label: "Human",                                  title: "HITL quality" },
    { id: "verdicts",                section: "Verify",                   crumb: "evidence › by control",                                   label: "Verdicts",                               title: "Control outcomes and drift" },
    { id: "verdicts-drift",                section: "Verify",                   crumb: "evidence › by control",                                   label: "Verdicts",                               title: "Verdict drift" },
    { id: "verdict",                section: "Verify",                   crumb: "evidence › all verdicts › verdict",                       label: "Verdicts",                               title: "Control evidence" },
    { id: "evaluations",                section: "Verify",                   crumb: "evidence › by control",                                   label: "Online evaluations",                     title: "Online evaluations" },
    { id: "compliance",                section: "Verify",                   crumb: "evidence › compliance",                                   label: "Compliance",                             title: "Compliance" },
    { id: "packs",                section: "Verify",                   crumb: "evidence › packs",                                        label: "Evidence packs",                         title: "Evidence packs" },
    { id: "spend",                section: "Optimize",                 crumb: "cost › spend",                                            label: "Spend",                                  title: "Spend" },
    { id: "efficiency",                section: "Optimize",                 crumb: "cost › efficiency",                                       label: "Token efficiency",                       title: "Token efficiency" },
    { id: "efficiency-opportunity",                section: "Optimize",                 crumb: "cost › efficiency",                                       label: "A saving, explained",                    title: "A saving, explained" },
    { id: "use-cases",                section: "Optimize",                 crumb: "cost › use cases",                                        label: "Use cases",                              title: "Use cases" },
    { id: "use-case",                section: "Optimize",                 crumb: "cost › use cases › refund-request",                       label: "A use case",                             title: "A use case" },
    { id: "budgets",                section: "Optimize",                 crumb: "cost › budgets",                                          label: "Budgets",                                title: "Budgets" },
    { id: "budget",                section: "Optimize",                 crumb: "cost › budgets › support team",                           label: "Support team",                           title: "Burn and forecast" },
    { id: "budget-variance",                section: "Optimize",                 crumb: "cost › budgets › support team",                           label: "Support team",                           title: "Variance explained" },
    { id: "changes",                section: "Optimize",                 crumb: "cost › changes",                                          label: "Changes",                                title: "Changes" },
    { id: "change",                section: "Optimize",                 crumb: "cost › changes › sql-report",                             label: "Preview a change",                       title: "Preview a change" },
    { id: "rollouts",                section: "Optimize",                 crumb: "cost › changes",                                          label: "Rollouts",                               title: "Rollouts" },
    { id: "savings",                section: "Optimize",                 crumb: "cost › changes",                                          label: "Savings",                                title: "Savings" },
    { id: "frontier",                section: "Optimize",                 crumb: "cost › use cases › sql-report",                           label: "sql-report",                             title: "Cost–quality frontier" },
    { id: "rulesets",                section: "Optimize",                 crumb: "cost › routing",                                          label: "Rulesets",                               title: "Rulesets" },
    { id: "prices",                section: "Optimize",                 crumb: "cost › prices",                                           label: "Prices",                                 title: "Model prices" },
    { id: "models",                section: "Optimize",                 crumb: "cost › models",                                           label: "Model registry",                         title: "Model registry" },
    { id: "model-self-hosted",                section: "Optimize",                 crumb: "cost › models › gpt-oss-20b",                             label: "gpt-oss-20b",                            title: "Self-hosted model" },
    { id: "training",                section: "Optimize",                 crumb: "cost › training",                                         label: "Training",                               title: "Training" }
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
