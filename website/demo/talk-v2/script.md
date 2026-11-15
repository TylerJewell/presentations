# Governing AI at the speed it changes: the script

Generated from the slides by `render/script.mjs`; edit the words in `slides/<id>.js`, not here.
Each beat is one click. Planned time is the words at 140 a minute, or the beat's animation if longer.

**3,022 words · planned 21:35**

| Act | Planned |
|---|---|
| Opening | 0:37 |
| Four problems | 5:07 |
| Principles | 9:24 |
| How it comes together | 5:39 |
| Close and questions | 0:48 |

## Opening

### 1. Title (0:37)

**Click 1** · 0:37

Good morning. I'm Tyler Jewell, and I run Akka. We build a platform for agentic AI systems, so the governance question reaches us every day. Most of you oversee many AI systems, often in many countries, under rules that keep moving. This is an argument, not a tour. It has three parts: four problems that stand between the rules and your AI systems, eight principles that answer them, and one real system, end to end. I'll end with a test you can hold any platform to.


## Four problems

### 2. Four problems stand between the rules and your AI systems (0:26)

**Click 1** · 0:09

Four problems stand between the rules and your AI systems. Each of the principles later in this talk answers one of them.

**Click 2** · 0:17

The rules change every month. Every country adds its own rules. Every control lands on an engineering backlog. And the first test of a control is the audit. Let's take them one at a time, starting with the rules.


### 3. The rules change every month (1:18)

**Click 1** · 0:22

Europe's AI Act set the second of August 2026 for its high-risk rules. In July, a new EU regulation moved most high-risk systems to December 2027, and AI built into regulated products to August 2028. The best-known deadline in AI law slid 16 months, less than a month before it arrived.

**Click 2** · 0:19

Colorado passed the first broad state AI act in the country, due in February. It was pushed to June, and then in May the legislature repealed it and replaced it with a different law, whose duties start next January. The original never took effect.

**Click 3** · 0:15

In April, US bank regulators replaced SR 11-7, the model risk guidance banks had used since 2011. Its replacement, SR 26-2, says in a footnote that generative and agentic AI models are not within its scope.

**Click 4** · 0:15

The same year, bank supervisors in Australia and Singapore wrote AI agents into their expectations, and Hong Kong's proposed a registry of them. The calendar doesn't only move. It moves differently in every country.

**Click 5** · 0:07

Your systems change every week, the rules every month, and the review comes once a year.


### 4. Every country adds its own rules (1:03)

**Click 1** · 0:16

Here is one decision: an AI-assisted credit decline. The model recommended declining the application, and it was declined. Now say the lender operates in ten countries. Each of them has its own rules for this one decision.

**Click 2** · 0:39

Germany gives the applicant the right to contest the decision, and to an explanation. In France, the works council has to be consulted before the tool is rolled out, and courts have suspended rollouts, pilots included, until it was. In China, the applicant can refuse a fully automated decision, and the data stays in China. Brazil gives the applicant a review, and the law allows a machine to perform it. And in the United States, from January, California's rules call for an appeal to someone with the authority to change the outcome.

**Click 3** · 0:08

One decision, ten countries, ten different requirements. And one system has to meet all of them at once.


### 5. Every control lands on an engineering backlog (1:08)

**Click 1** · 0:14

Every control also lands on an engineering backlog. Most controls aren't settings you switch on. Take one rule: a person reviews a flagged credit decision before it takes effect, within four hours.

**Click 2** · 0:22

To a developer, that sentence is work. A pause in the workflow, so the decision waits. A queue, so the case reaches a reviewer. A screen, so the reviewer sees what the agent saw. And a record of what they decided. Then the same work again, in every agent the rule touches.

**Click 3** · 0:12

Then the rule changes, or a new one arrives, and the work starts again, in every agent, on the same backlog as everything else the team is building.

**Click 4** · 0:20

Our own sample loan service shows the size of it. To apply six human controls, it needed thirteen components of its own: five entities, three views, two consumers, two timed actions and an endpoint. That's code a team writes, tests and maintains, alongside the lending system itself.


### 6. The first test of a control is the audit (1:12)

**Click 1** · 0:29

And the first test of a control is the audit. A control is written, and it's deployed. Then it runs for months, on every request, and no one knows whether it works. The first time anyone checks is when an auditor samples a few requests. Code is tested before it ships, and again on every change after that. A control gets its first test months after it ships.

**Click 2** · 0:22

Sampling finds what it happens to pick. New York City requires employers to publish bias audits of their AI hiring tools. When the state comptroller checked the city's enforcement, the city had reviewed thirty-two companies and found one issue. The comptroller's auditors looked at the same thirty-two and found at least seventeen.

**Click 3** · 0:21

What an audit misses, a regulator can find. In August, the Dutch data protection authority fined a ride-hailing platform eight hundred and twenty-five million euros, for decisions about its drivers that no person assessed. The platform is appealing. A control that is never tested exists only on paper.


## Principles

### 7. Principles (0:05)

**Click 1** · 0:05

Here are eight principles I'd hold any platform to, including ours.


### 8. The law, as controls (0:56)

**Click 1** · 0:09

First, a practical question: who turns the law into controls? We decided to do it ourselves, for AI regulation worldwide.

**Click 2** · 0:16

It covers two hundred and forty-one frameworks across thirty-eight jurisdictions: binding regulation, regulator guidance, and the standards your auditors use, like NIST, ISO and OWASP. They run from the EU and sixteen US states to Singapore and Brazil.

**Click 3** · 0:15

Each one is taken apart to the paragraph. Every obligation becomes a control, tied to the paragraph it comes from. When an examiner asks why a control exists, the answer is that paragraph of law.

**Click 4** · 0:16

In June, our corpus held nine hundred and sixty-two controls. Today it holds seventeen hundred and eighteen, almost all in the law's own words. Part of that growth is wider coverage, and part is new law arriving.


### 9. Five kinds of control (1:20)

**Click 1** · 0:10

Sort those controls by the kind of check each needs, and the first principle falls out: every control is one of five kinds.

**Click 2** · 0:17

A gate is a check that has to pass before something ships or carries on. Thirteen hundred and ninety-nine controls need one, and most are documentation and attestation: is the impact assessment on file, and has someone accountable signed it?

**Click 3** · 0:09

Sanitizers mask data before it moves on, like an ID number the model never sees. There are one hundred and twenty-three.

**Click 4** · 0:06

Evaluations score behavior, live or in testing: performance, drift, fairness and incidents. There are eighty-six.

**Click 5** · 0:10

Guardrails allow or block an action at a boundary: what a model may say, which tools an agent may use. There are seventy-two.

**Click 6** · 0:09

And human controls name the person who authorizes, decides, triages, answers feedback or stops the system. There are thirty-eight of them.

**Click 7** · 0:19

So most of what the law asks for is evidence, work your teams already know how to do. The smaller set, sanitizers, evaluations, guardrails and human controls, governs an agent while it runs. Policy sits above the five and decides which apply, and where.


### 10. Human control comes in five flavors (1:29)

**Click 1** · 0:27

Second: human control comes in five flavors, named by who decides. A person authorizes what the system may do. A person makes or reviews a decision about someone. A person answers a signal while the work carries on. Anyone flags an output, and a person decides what to do with it. And a person stops the system, and restarting it takes a second decision.

**Click 2** · 0:18

Under those five sit fourteen patterns, the situations a person decides, from approving an action to halting and restarting. Four of the flavors have a line of law beneath them, and the right to contest is in force in at least seven regimes.

**Click 3** · 0:21

Our one loan system runs seven of them. Deadline extensions wait for approval, held notices are reviewed, declined applicants can contest, drift and guardrail bursts are triaged, rushed reviews are measured, the assessment can be halted, and flagged replies become feedback. Model changes are simulated, so that card stays dark.

**Click 4** · 0:22

And agents move the person up a level. When an agent takes a thousand actions a day, the person approves the bounds instead of each action: a standing approval for thirty days, a plan, a mandate, a tier of authority. For private companies, approving an agent's action rests on guidance alone.


### 11. Three sources (0:50)

**Click 1** · 0:05

Third principle: controls come from three sources, and regulation is the first.

**Click 2** · 0:08

The second is your own corporate policy: no agent approves a refund over five hundred dollars without review.

**Click 3** · 0:10

The third is the system's own team, for a risk only they can see: this underwriting agent never sees an applicant's ID number.

**Click 4** · 0:12

Once they're in force, every control is enforced the same way, whether it came from a team or a regulation, and each one traces back to its source.

**Click 5** · 0:15

Two laws can pull in different directions. The UK allows an automated credit decline, with safeguards. The EU requires that a person can intervene. Both sit in the same bundle, each tagged with its law.


### 12. Managed like software (0:50)

**Click 1** · 0:15

Fourth: controls are managed like software. At launch, a loan assistant answers borrower questions, and its main risk is disclosure accuracy. Version one has twelve controls, in one bundle, signed by a named owner.

**Click 2** · 0:12

Then it gains judgment: it recommends approve or decline, and fair lending becomes a risk. Version two has thirty-four controls. The bundle grew because the system's authority grew.

**Click 3** · 0:09

Then it gains authority: it can initiate the transfer of funds, so it needs dual control. Version three has fifty-one.

**Click 4** · 0:15

Every version is signed and stays on record. If an examiner asks what governed a decision last March, you show them the exact bundle in force that day. It's how you already treat code.


### 13. Every control leaves a verdict (0:54)

**Click 1** · 0:11

Fifth: every time a control runs, it produces a verdict, and that verdict lives in the same record as the trace of what the system did.

**Click 2** · 0:15

Here's one request. A loan application comes in, the workflow hands it to an agent, and the agent looks up policy, checks affordability and asks a model for a recommendation. The controls sit in between.

**Click 3** · 0:14

Each control reaches a verdict: upheld or breached. Here the agent tried to move funds without a second approval, and the guardrail stopped it. When a control can't tell, it says inconclusive.

**Click 4** · 0:14

It's all one record, written as it happens, so the evidence and the activity are the same thing. When someone asks how you know a control held last Tuesday, you look it up.


### 14. Drift is a change in verdicts (0:42)

**Click 1** · 0:08

Sixth: drift is a change in verdicts over time. Here are one system's controls, week by week, all upheld.

**Click 2** · 0:08

Quiet weeks are evidence too. An inconclusive week is a control saying it couldn't tell, and it isn't drift.

**Click 3** · 0:15

Then one changes. A control that was upheld is now breached, and that's drift. The verdicts are the drift detector. A score gives you a threshold and a debate; a changed verdict gives you a fact.

**Click 4** · 0:11

Because every verdict is tied to the request that produced it, you can go straight to the cause: here, a model update the week before.


### 15. Every agent, honestly (1:04)

**Click 1** · 0:11

Seventh: governance has to reach every agent, wherever it was built. For agents on Akka, the controls run inside the runtime, next to the agent.

**Click 2** · 0:09

Most of the agents a company runs are bought, inherited or built on something else, and they call models and tools directly.

**Click 3** · 0:10

For those, you route their model and tool calls through a gateway, and the same controls apply, with verdicts in the same record.

**Click 4** · 0:16

A gateway sees what crosses it. A tool call inside the agent's own process is invisible to it, and build-time checks, scheduled evaluations and sign-offs mid-workflow run outside it. So it reaches most controls, but not all.

**Click 5** · 0:18

Together, that's one list of every agent you run, with its type, autonomous ones included, and its tools. Supervisors in four markets now ask for that list by name: Australia, Singapore, Dubai, and Hong Kong, where a register of material agents is proposed.


### 16. Oversight is measured, not assumed (1:14)

**Click 1** · 0:14

Eighth, and last: oversight is measured, not assumed. A person in the loop is only as good as their attention. People accept ninety-three percent of the permission prompts an AI agent shows them.

**Click 2** · 0:08

Across a hundred and six experiments, people working with AI did worse than the better of the two alone.

**Click 3** · 0:08

So the newest guidance measures the reviewers. Singapore now asks firms to track override rates and response times.

**Click 4** · 0:20

Our loan system does that for its underwriters. Here is a week of reviews, each bar the time from opening the case to deciding it. When more than one review in ten takes under eight seconds, faster than anyone can read the case, the control fires.

**Click 5** · 0:14

The limit was set in advance, as part of the control. The case goes to the risk officer, who decides what happens next: here, a minimum review time, recorded with the officer's name.

**Click 6** · 0:10

From then on, a decision made sooner than that is refused. The system can measure its own oversight. It doesn't get to assume it.


## How it comes together

### 17. How it comes together (0:20)

**Click 1** · 0:20

Principles are easy to agree with. Everybody in this room has signed up to a set of principles at some point. The question is what they look like on a real system, on an ordinary Tuesday. So let me show you, on that loan origination assistant.


### 18. One platform, the whole lifecycle (0:46)

**Click 1** · 0:12

First, one thing about how it's built: it works end to end when one platform holds the whole lifecycle. Specify builds the system from its specification, controls included.

**Click 2** · 0:10

The Agent SDK runs it, with the controls in the request path. The AI gateway governs model and tool traffic, from any agent.

**Click 3** · 0:05

Verify governs it: verdicts, drift, and compliance against the bundle in force.

**Click 4** · 0:06

And Optimize runs it on the right models, through experiments a person decides.

**Click 5** · 0:13

Underneath all five are one definition, one runtime and one evidence record. So each control is written once, not again in every tool, and every verdict lands in the same record.


### 19. The Controls board (0:59)

**Click 1** · 0:10

This is that system's Controls board, its contract with its regulators: every control, who decided it, and the version in force, version three.

**Click 2** · 0:12

The contract is a loop: adopt the obligations, describe the system, plan the controls, decide each one, sign, and put it in force. Any change restarts the loop.

**Click 3** · 0:09

Readiness shows whether the contract is complete: every fact answered, every control decided, and the running code matching what was signed.

**Click 4** · 0:09

Each control is bound to the code that enforces it: this guardrail to the eligibility agent, down to the file and line.

**Click 5** · 0:05

This one is bound to the agent's system prompt, at version twelve.

**Click 6** · 0:06

And this one is bound to the guardrail that writes the adverse-action disclosure.

**Click 7** · 0:08

Below, evidence arrives live: each control's verdict on each request, with the contract version and the regulation it answers.


### 20. A change arrives (1:20)

**Click 1** · 0:14

Now a change arrives in a pull request. A developer adds the applicant's religion to the loan application, for a community lending pilot. The intent is good, and the risk assessment wasn't updated.

**Click 2** · 0:11

The platform reads the code field by field. The new field is a protected characteristic: special data under GDPR Article 9 and fair lending law.

**Click 3** · 0:09

The board reacts on its own. Code in sync turns red: the running code no longer matches what was signed.

**Click 4** · 0:06

So the contract re-opens on the Amend path, and it records why: the code changed.

**Click 5** · 0:06

The owner confirms the new fact, a decision by a named person, recorded as one.

**Click 6** · 0:09

The contract adds an evaluation: it reads every eligibility decision's rationale and fails any that relies on a protected characteristic.

**Click 7** · 0:10

And it adds a human control. A decision the evaluation flags is held for review before it takes effect: an underwriter, within four hours.

**Click 8** · 0:06

The owner signs version four, and it goes into force, minutes after the pull request.

**Click 9** · 0:09

And version three is still there, signed, so last week's decisions can be checked against the contract that governed them.


### 21. The evidence record (1:09)

**Click 1** · 0:14

A few days later, an applicant in Germany asks why her application is on hold. The assistant says an underwriter is reviewing it, and gives her more time to send a document.

**Click 2** · 0:09

Here is everything behind that conversation: the workflow, the eligibility agent, its tool calls and model calls, and every control that ran.

**Click 3** · 0:13

This is the moment that matters. The new evaluation read the agent's draft decision, and its rationale cited her religion. The evaluation breached, so the review control held the decision.

**Click 4** · 0:18

The first underwriter could see the case but couldn't decide it: their oversight training had lapsed. A qualified underwriter amended the decision inside the four-hour limit. The machine caught it. A person decided, and the record shows why that person was allowed to.

**Click 5** · 0:06

Each verdict names its control, the contract version in force, and the regulation it answers.

**Click 6** · 0:08

One record, written as it happened. If an examiner asks about this applicant, you hand them the record.


### 22. A person decides the rollout (1:06)

**Click 1** · 0:14

The last change is a different kind: a smaller model. Instead of switching over, the team runs an experiment on a quarter of live traffic, against limits the owner set in advance.

**Click 2** · 0:08

Quality, cost, latency and errors each have a band they must stay inside, set before the experiment started.

**Click 3** · 0:03

In one region, Germany, quality crosses the line.

**Click 4** · 0:13

The experiment holds, and only Germany goes back to the original model, while the other nine carry on. The response is as narrow as the problem: one country, not ten.

**Click 5** · 0:06

That response was the owner's choice, made in advance, with their name on it.

**Click 6** · 0:05

The model is retrained for Germany, and it's back inside the band.

**Click 7** · 0:07

When every limit has held, a person promotes it, and the decision is recorded with their name.

**Click 8** · 0:10

The change was proposed, measured, held when a limit broke and decided by a person, and every step is in the same record.


## Close and questions

### 23. Closing (0:40)

**Click 1** · 0:19

To pull it together, your systems will keep changing every week, and the rules will keep moving underneath them, differently in every country. Governance has to become controls: defined once, enforced on every request, decided by people when it matters, and recorded every time.

**Click 2** · 0:21

That's what we built Akka to do. Whatever platform you choose, including ours, here is the test I'd hold it to, in any country you operate in. Show me the controls. Show me the verdicts. And show me the person who decided, and why that person was allowed to decide.


### 24. Questions (0:08)

**Click 1** · 0:08

Thank you for your time this morning. I'd love to take your questions, and the harder the better.

