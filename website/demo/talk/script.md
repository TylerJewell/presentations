# Governing AI at the speed it changes: the script

Generated from the slides by `render/script.mjs`; edit the words in `slides/<id>.js`, not here.
Each beat is one click. Planned time is the words at 140 a minute, or the beat's animation if longer.

**4,447 words · planned 31:47**

| Act | Planned |
|---|---|
| Opening | 0:42 |
| Two clocks | 8:47 |
| Governance changes shape | 4:39 |
| Principles | 9:42 |
| How it comes together | 7:09 |
| Close and questions | 0:47 |

## Opening

### 1. Title (0:42)

**Click 1** · 0:42

Good morning. I'm Tyler Jewell, and I run Akka. We build a platform for building and running agentic AI systems, which means the governance question lands on our desk every single day, usually from people in jobs like yours. For the next half hour I want to give you an argument, not a product tour. It comes in four parts. Why the way we govern technology today is running out of time. How governance has to change shape. Seven principles that follow from that. And then what it looks like when it all works, on one real system.


## Two clocks

### 2. Two clocks (1:14)

**Click 1** · 0:15

I want to start with two clocks. Everyone in this room is watching both of them, whether or not you'd put it that way. And the trouble is that they run at very different speeds.

**Click 2** · 0:18

The first clock is what AI can do. It doesn't tick at a steady rate. It compounds. Every few months these systems take on longer tasks, with less supervision, and they get handed more of the actual work of the business.

**Click 3** · 0:21

The second clock is the rules. They don't compound the same way, but they multiply. More jurisdictions, more laws, more guidance, and they don't line up with each other. One line becomes many, and some of them double back: a deadline that moves, a law that's repealed before it starts.

**Click 4** · 0:20

Your job lives in the space between those two clocks: making sure what the systems can do stays inside what the rules allow. This year that space got a lot wider. Let me show you what happened to each of them in 2026, starting with the rules.


### 3. What the rules actually ask for (2:21)

**Click 1** · 0:19

Before we get to how fast the rules are moving, let's look at what they actually ask for. Not principles. Controls, in the law's own words. I've taken one real control of each of five kinds. We'll come back to those five kinds later.

**Click 2** · 0:25

First, a gate: a check that has to pass before something is used. New York City's Local Law 144. It's unlawful to use an automated tool to screen job candidates unless it's had a bias audit within the last year. No current audit, no screening. And every day the tool is used without one counts as a separate violation.

**Click 3** · 0:21

Second, a sanitizer: data stripped before it moves on. HIPAA's safe harbor. Health data only counts as de-identified once eighteen identifiers are removed, from names to Social Security numbers. That rule is more than twenty years old, and it applies to every agent that reads a patient record today.

**Click 4** · 0:20

Third, an evaluation: behavior scored against a line you draw. OSFI's guideline E-23, which takes effect in May 2027. Model monitoring has to define thresholds for breaches, and handle AI's elevated potential for drift. Measure on a schedule, compare against your threshold, escalate on a breach.

**Click 5** · 0:22

Fourth, a guardrail: an action allowed or blocked at a boundary. Texas, in force since January. No AI system may be deployed in a way that aims to encourage self-harm, harm to someone else, or crime. In practice, that's a check on every response, and a block before it reaches the person.

**Click 6** · 0:21

And fifth, human authority. The EU AI Act, Article 14. The people overseeing a high-risk system must be able to interrupt it, and I'm quoting, through a 'stop' button or a similar procedure, so it comes to a halt in a safe state. The law asks for a stop button.

**Click 7** · 0:12

Five kinds of control, five jurisdictions. Every one of them is concrete enough to build, and to test. The trouble is the calendar around them. It won't sit still.


### 4. The rules moved this year (2:47)

**Click 1** · 0:10

Here's the regulatory calendar the way most of us drew it in January. A handful of dates, and a plan to meet each one.

**Click 2** · 0:30

Europe's AI Act set the second of August 2026 for its high-risk rules. In July, a new EU regulation moved that date. Most high-risk systems now have until December 2027, and AI built into regulated products until August 2028. The best-known deadline in AI law slid 16 months, less than three months before it arrived. If you built a program around that August date, your plan changed because the law did.

**Click 3** · 0:28

Colorado passed the first broad state AI act in the country. It was due in February. Last August it was pushed to the end of June. Then in May the legislature repealed it and replaced it with a different law, whose duties start next January. The original never took effect. Whatever you prepared for the first law, you now get to re-read against the second.

**Click 4** · 0:37

In April, the Fed, the OCC and the FDIC retired SR 11-7, the model risk guidance banks have lived under since 2011. Its replacement is SR 26-2. Read footnote three. Generative and agentic AI models, quote, are not within the scope of this guidance. The newest rulebook for bank models leaves out the newest kind of model. What it says instead is that a bank's own risk management should decide the right governance and controls. In other words, it's on you, and the examiner will still ask.

**Click 5** · 0:30

Meanwhile the states keep writing. The National Conference of State Legislatures counted 1,262 AI bills in the states last year, and 227 enacted. This year, by early October: 1,539 bills, and 280 enacted. And last December a federal executive order set up a Justice Department task force whose job is to challenge state AI laws. So you're not only tracking the legislatures. You're tracking the fight between them and Washington.

**Click 6** · 0:31

And in Canada, OSFI's Guideline E-23 takes effect in May 2027, with a definition of a model that includes AI. Like SR 26-2, it sets no fixed interval for reviewing a model. Both say the review should match the risk. So the rules change monthly. Sometimes it's a new law. Sometimes it's a deadline that moves, a law replaced before it starts, or guidance that is silent on exactly the systems you're deploying.


### 5. The systems keep compounding (1:35)

**Click 1** · 0:02

Now the other clock.

**Click 2** · 0:34

METR, an independent research group, measures how long a task an AI agent can finish on its own, counted in how long the same task takes a skilled person. Each step on this chart is a doubling. From 2019 to 2025 that length doubled about every 7 months. For models since 2023, about 4 months. The steps are getting shorter. METR is careful to say these are mostly software, machine-learning and security tasks. But the direction isn't in doubt.

**Click 3** · 0:21

Stanford's AI Index tracks agents doing real work on a computer: opening applications, filling in forms, finishing multi-step tasks. Success went from about 12 percent to about 66 percent in a single year. People score about 72. That isn't a chatbot getting better at conversation. That's software operating other software.

**Click 4** · 0:18

These systems don't just answer any more. They act. And the same report counted 362 documented AI incidents in 2025, up from 233 the year before. More capable systems, doing more, in more places, with more of it going wrong in public.

**Click 5** · 0:19

So the systems you govern change every week: a new model, a new prompt, a new tool, a new data source. Each one changes what the system can do, and very few of those changes ever pass in front of anyone in this room.


### 6. Weekly, monthly, yearly (0:51)

**Click 1** · 0:04

Here's the shape of the problem. Your system changes weekly.

**Click 2** · 0:11

The rules change monthly. You just saw it: a deadline moved here, a law replaced there, a footnote that leaves out the very systems you're deploying.

**Click 3** · 0:12

And the review happens once a year. A model validation, an audit, a policy refresh. A careful, expensive look at the system, at one moment in time.

**Click 4** · 0:24

Look at everything between the review points. Fifty-one weeks of changes nobody signed off on, against rules that moved underneath them. An annual review is a photograph of a system that no longer exists. That's not a criticism of anyone here. It's what the old tools were built for: software that changed twice a year.


## Governance changes shape

### 7. Governance changes shape (0:17)

**Click 1** · 0:17

If those clocks run this fast, governance can't just work harder. More reviewers, longer checklists, more frequent audits: none of that keeps up with a system that changes every week. Governance has to change shape. I see three shifts.


### 8. From documents to controls (0:53)

**Click 1** · 0:13

The first shift is from documents to controls. Most AI governance today is written down. A policy, a risk assessment, a model card, a sign-off sheet in a shared drive.

**Click 2** · 0:15

Read those documents closely and you find sentences that are really rules. A person must review every adverse decision. Customer data must not leave its region. Decisions must not rely on a protected characteristic.

**Click 3** · 0:11

A control is one of those sentences turned into a check that runs. It's discrete: it either holds or it doesn't, and you can prove which.

**Click 4** · 0:15

And it runs on the system itself, every time, not on a description of the system. A document says what should happen. A control makes it happen, and keeps the record that it did.


### 9. From audits to evidence on every request (1:16)

**Click 1** · 0:17

The second shift is from point-in-time audits to evidence on every request. Today we sample. A few times a year someone pulls a set of records and checks them by hand. Everything between those points, the system did on trust.

**Click 2** · 0:27

Sampling misses things. New York City requires employers to publish bias audits of the AI tools they use in hiring. When the state comptroller examined how the city enforced that law, the city had reviewed thirty-two companies and found one issue. The comptroller's auditors, looking at the same companies, found at least seventeen. Same companies, same documents. A different depth of looking.

**Click 3** · 0:19

Meanwhile an AI system makes thousands of decisions a day, and any one of them can go differently from the last. So every request should leave evidence behind: which controls ran, and what each one concluded. Not a sample. All of them, as they happen.

**Click 4** · 0:13

Then an audit stops being an excavation. It becomes a question you ask of evidence you already have, and the answer covers every request, not the twenty-five someone happened to pull.


### 10. From the model to the system (1:13)

**Click 1** · 0:13

The third shift is from governing the model to governing the system. A lot of today's effort goes into the model itself: model cards, benchmarks, bias tests. That work matters.

**Click 2** · 0:15

But the model is one part. Around it are prompts, tools, data, workflows, other agents and people. And the model underneath may change next month, or be replaced entirely by one from a different vendor.

**Click 3** · 0:31

The risk lives in what the system is allowed to do with what the model says: which data it can see, which actions it can take, who signs off. So that's where the controls belong, at the joints of the system. Mask the data on its way in. Check every recommendation on its way out. Hold a transfer until it has a second approval. Put a person in front of every adverse decision.

**Click 4** · 0:14

Now swap the model. The controls still hold, because they never belonged to the model. They belong to the system, and the system is what your customers and your regulators actually meet.


### 11. A posture, proved (1:00)

**Click 1** · 0:17

Put the three shifts together and you get what I'd call a governance posture. It starts with your risk appetite and your obligations, written once as controls, independent of any one system. Not a policy per project. One library.

**Click 2** · 0:06

Then each system takes on the controls that match what it is allowed to do.

**Click 3** · 0:21

A system that only answers questions needs a few. One that recommends a credit decision needs more. One that can move money needs the most. Proportional to its authority, not one blanket rule applied the same way everywhere, which either smothers the simple systems or under-protects the powerful ones.

**Click 4** · 0:16

And the posture is proved, not asserted. Not 'we have a policy for that.' Instead: here is every verdict, from every request, against every control, for every system. That's the standard I'd hold any of us to.


## Principles

### 12. Principles (0:17)

**Click 1** · 0:17

From those shifts come seven principles. They're the ones I'd hold any platform to, including ours. None of them is about a particular product. They're about where controls come from, how they change, what they leave behind, and who decides.


### 13. The law, as controls (1:30)

**Click 1** · 0:12

But first, a practical question. If governance is going to be controls, who turns the law into controls? We decided to do it ourselves, for AI regulation worldwide.

**Click 2** · 0:17

Two hundred and forty-one frameworks, across thirty-eight jurisdictions. Binding regulation and regulator guidance, plus the standards your auditors use: NIST, ISO, OWASP and others. The EU, the US federal agencies, sixteen US states, the UK, Canada, Singapore, Brazil, and on.

**Click 3** · 0:21

Each one is taken apart to the paragraph. Every obligation becomes a control, tied to the exact paragraph it comes from, in the law's own words. That matters. When an examiner asks why a control exists, the answer is a paragraph of law, not someone's summary of it.

**Click 4** · 0:24

In June, our corpus held nine hundred and sixty-two controls. Today it holds one thousand seven hundred and eighteen, and one thousand six hundred and thirty-nine of them carry the law's verbatim text. Part of that growth is us covering more ground. Part of it is new law arriving. Nobody keeps up with that by reading.

**Click 5** · 0:17

And look at when they bite. Four hundred and six of those obligations take effect this year, in 2026. More than any year before, and about double 2024. And a hundred and eight more are already scheduled for 2027.


### 14. Five kinds of control (1:39)

**Click 1** · 0:18

Now sort every one of those controls by the kind of check it needs, and the first principle falls out. Every control is one of five kinds. That's not a theory. It's what you get when you sort seventeen hundred real obligations.

**Click 2** · 0:21

Gates: a check that has to pass before something ships or carries on. Thirteen hundred and ninety-nine controls need one, and most of those are documentation and attestation. Write it down. Sign for it. Is the impact assessment on file? Has someone accountable signed it? Is the bias test current?

**Click 3** · 0:10

Sanitizers strip or mask data before it moves on, like an ID number removed before the model ever sees it. One hundred and twenty-three.

**Click 4** · 0:05

Evaluations score behavior, live or in testing: performance, drift, fairness, incidents. Eighty-six.

**Click 5** · 0:09

Guardrails allow or block an action at a boundary: what a model may say, which tools an agent may use. Seventy-two.

**Click 6** · 0:08

And human controls give a named person authority over a decision, or the power to halt the system. Thirty-eight.

**Click 7** · 0:27

So most of what the law asks for is evidence: documents and attestations, work your teams already know how to do. The smaller set, sanitizers, evaluations, guardrails and human authority, is where an agent's behavior is governed while it runs. That's where the old tools have nothing to offer. And policy isn't a sixth kind. Policy decides which of the five apply, and where.


### 15. Three sources (0:57)

**Click 1** · 0:11

Second principle: regulation is only one of three sources of controls. The corpus gives you the law. But you answer to more than the law.

**Click 2** · 0:10

The second is your own corporate policy, the rules you've already written down. No agent approves a refund over five hundred dollars without review.

**Click 3** · 0:11

The third is the team that builds the system, for a risk only they can see. This underwriting agent never sees an applicant's ID number.

**Click 4** · 0:25

Once they're in force, it doesn't matter where they came from. A control written by a team is enforced exactly as strictly as one taken from a regulation, and each one traces back to its source. And when two sources pull in different directions, you see it, because they sit in the same bundle, not in three different binders.


### 16. Managed like software (1:03)

**Click 1** · 0:17

Third: controls are managed like software. Take a loan origination assistant. At launch it only answers borrower questions, and the main risk is getting a disclosure wrong. Version one: twelve controls, in one bundle, signed by a named owner.

**Click 2** · 0:15

Then it gains judgment. It starts recommending approve or decline, and fair lending becomes a real risk. Version two: thirty-four controls. Nothing about the old controls changed. The bundle grew because the system's authority grew.

**Click 3** · 0:09

Then it gains authority. It can initiate the transfer of funds, so now you need dual control. Version three: fifty-one.

**Click 4** · 0:23

Each version is signed, and each one it replaced is still there, still signed, still provable. If an examiner asks what governed a decision last March, you can show them the exact bundle that was in force that day. It's how you already treat code: you can always check out exactly what was running.


### 17. Every control leaves a verdict (1:05)

**Click 1** · 0:11

Fourth: every time a control runs, it produces a verdict, and that verdict lives in the same record as the trace of what the system did.

**Click 2** · 0:19

Here's one request. The workflow, the agent, its tool calls, its model call. And in between them, the controls. A loan application comes in, the workflow hands it to an agent, the agent looks up policy, checks affordability, and asks a model for a recommendation.

**Click 3** · 0:15

Each control concludes. Upheld. Or breached: here the agent tried to move funds without a second approval, and the guardrail stopped it. And when a control can't tell, it says inconclusive, rather than guessing.

**Click 4** · 0:20

Same record, written as it happens. Not a separate report that someone assembles later and asks you to trust. The evidence and the activity are the same thing. When someone asks how you know a control held last Tuesday, you don't reconstruct it. You look it up.


### 18. Drift is a change in verdicts (0:56)

**Click 1** · 0:09

Fifth: drift is a change in verdicts over time. Here are one system's controls, week by week. Upheld, upheld, upheld.

**Click 2** · 0:11

Nothing to see, which is the point. Quiet weeks are evidence too. And an inconclusive week isn't drift. It's a control saying it couldn't tell.

**Click 3** · 0:21

Then one changes. A control that was upheld is now breached. That's drift. You don't need a separate drift detector, and you don't need to argue about degrees of drift. A verdict changed. Most monitoring gives you a score, a threshold and a debate. This gives you a fact.

**Click 4** · 0:15

And because every verdict is tied to the request that produced it, you can go straight to what changed. Here, a model update the week before. That's the difference between knowing something changed and knowing why.


### 19. Every agent, honestly (1:17)

**Click 1** · 0:20

Sixth: governance has to reach every agent, not just the ones built on our platform. For agents that run on Akka, the controls run inside the runtime, right next to the agent. A control is part of how the agent runs, not a filter bolted on afterwards.

**Click 2** · 0:18

But most of the agents a company runs aren't ours. They're bought, inherited, or built on something else, and they talk to models and tools directly. A vendor's agent inside a SaaS product. A copilot. A script a team wrote last year.

**Click 3** · 0:11

For those, you route their model and tool calls through a gateway, and the same controls apply to that traffic, with verdicts in the same record.

**Click 4** · 0:28

I want to be precise about the limit. A gateway sees what crosses it. It can't see a tool call that never leaves the agent's own process. It can't run a build-time check, a scheduled evaluation, or a human sign-off in the middle of a workflow. It reaches most controls, not all of them. Anyone who tells you their gateway governs everything is selling something.


### 20. A person decides (0:56)

**Click 1** · 0:17

Seventh, and to me the most important: a person decides when a limit is breached. Here's a limit an owner set, and a live measure moving inside it. Here it's quality, measured against the previous version of the system.

**Click 2** · 0:09

When the measure crosses the limit, the system doesn't improvise. It holds, in exactly the way the owner chose in advance.

**Click 3** · 0:18

Then a named person decides what happens next. The system can detect, contain and recommend. It doesn't get to excuse itself. Retrain and resume, keep testing, or roll back: that choice belongs to an accountable person, with the evidence in front of them.

**Click 4** · 0:12

And that decision, with the person's name on it, goes into the same record as everything else. Months later, anyone can see what happened, who decided, and why.


## How it comes together

### 21. How it comes together (0:20)

**Click 1** · 0:20

Principles are easy to agree with. Everybody in this room has signed up to a set of principles at some point. The question is what they look like on a real system, on an ordinary Tuesday. So let me show you, on that loan origination assistant.


### 22. One platform, the whole lifecycle (1:02)

**Click 1** · 0:21

Before I show you the system, one thing about how it's built. Everything I've described only works end to end if one platform holds the whole lifecycle. It starts with Specify, which builds the system from its specification: the definition, the risk survey, and the controls in the bundle.

**Click 2** · 0:14

The Agent SDK and its runtime run the system, and the controls enforce in the request path. The AI gateway governs model and tool traffic, including agents that weren't built on Akka.

**Click 3** · 0:06

Verify governs it: the verdicts, the drift, and compliance against the bundle in force.

**Click 4** · 0:06

And Optimize runs it on the right models, through experiments where a person decides.

**Click 5** · 0:15

Underneath all five: one definition of the system, one runtime, one evidence record. So a control is defined once, and the same definition carries it from the specification to production, and the same record proves it.


### 23. Stitched together, or one platform (0:51)

**Click 1** · 0:13

Compare that with how most companies assemble this today: a builder from one vendor, a runtime from another, a separate gateway, an evaluation tool, a GRC system, and an observability stack.

**Click 2** · 0:24

Every joint between those tools is a gap. The same control gets written again in three places, and they drift apart. Evidence stops at each boundary, and someone rebuilds the story by hand at audit time. Ask which version of a control was in force when a decision was made, and you get six partial answers.

**Click 3** · 0:14

One platform closes those gaps. The control is defined once, it runs where the system runs, and every verdict lands in the same record. Now let me show you what that looks like.


### 24. The Controls board (1:17)

**Click 1** · 0:12

This is that system's Controls board: its contract with its regulators. Every control it committed to, who decided each one, and the version in force. Here, version three.

**Click 2** · 0:14

The contract is a loop, not a line. Adopt the obligations, describe the system, plan the controls, decide each one, sign, and put it in force. Then round again whenever something changes.

**Click 3** · 0:12

Readiness says whether the contract is complete: every fact answered, every control decided, and whether the running code still matches the code that was signed. Today, it does.

**Click 4** · 0:14

Now the part an examiner cares about. Each control is bound to the code that enforces it. This guardrail is bound to the eligibility agent, down to the file and the line.

**Click 5** · 0:06

This one is bound to the agent's system prompt, at a specific version.

**Click 6** · 0:09

And this one to the guardrail that writes the adverse-action disclosure. Not a description of the system. The system itself.

**Click 7** · 0:11

Down here, the evidence arrives live: each control on each request, its verdict, the contract version, and the regulation it answers. No one assembles a report.


### 25. A change arrives (1:35)

**Click 1** · 0:14

Now a change arrives, in a pull request. A developer adds one field to the loan application: the applicant's religion, for a community lending pilot. Good intent. Nobody updated the risk assessment.

**Click 2** · 0:13

Akka reads the code, field by field, and works out what each one holds. This new one is a protected characteristic, special data under GDPR Article 9 and fair lending law.

**Click 3** · 0:14

The board reacts on its own. Code in sync turns red: the running code no longer matches what was signed, and the facts the contract was built on are out of date.

**Click 4** · 0:09

So the contract re-opens, on the Amend path, and it says why: the code changed. Nobody had to file a ticket.

**Click 5** · 0:06

The owner confirms the new fact, a decision by a named person, recorded as one.

**Click 6** · 0:09

The contract adds an evaluation: it reads every eligibility decision's rationale and fails any that relies on a protected characteristic.

**Click 7** · 0:10

And a human control: any decision that evaluation flags waits for an underwriter, within four hours. That answers the AI Act's human oversight requirement.

**Click 8** · 0:10

The owner signs version four, and it goes into force. From pull request to signed contract in minutes, not at the next quarterly review.

**Click 9** · 0:09

And version three is still there, signed and provable, so last week's decisions can be checked against the contract that governed them.


### 26. The evidence record (0:57)

**Click 1** · 0:14

A few days later, an applicant in Germany asks why her application is on hold. The assistant says an underwriter is reviewing it, and gives her more time to send a document.

**Click 2** · 0:11

Here is everything behind that conversation: the workflow, the eligibility agent, its tool calls and model calls, and woven through them, every control that ran.

**Click 3** · 0:18

This is the moment that matters. The new evaluation read the agent's draft decision; its rationale cited her religion. Breached. So the human control held it, and an underwriter overrode the rationale inside the four-hour limit. The machine caught it. A person decided.

**Click 4** · 0:06

Each verdict names its control, the contract version in force, and the regulation it answers.

**Click 5** · 0:08

One record, written as it happened. If an examiner asks about this applicant, you hand them the record.


### 27. A person decides the rollout (1:08)

**Click 1** · 0:14

Last, a different kind of change: a smaller model. Instead of switching over, the team runs an experiment, already serving a quarter of live traffic, watched against limits the owner set in advance.

**Click 2** · 0:08

Quality, cost, latency, errors. Each has a band it must stay inside, written down before the experiment started.

**Click 3** · 0:03

In one region, Germany, quality crosses the line.

**Click 4** · 0:11

The experiment holds, and only that region goes back to the original model. Everyone else carries on. The response is as narrow as the problem.

**Click 5** · 0:11

Why that response? Because the owner chose it in advance, with their name on it. Nobody is paged at three in the morning to improvise.

**Click 6** · 0:05

The model is retrained for Germany, and it's back inside the band.

**Click 7** · 0:07

When every limit has held, a person promotes it, and the decision is recorded with their name.

**Click 8** · 0:09

A change proposed, measured, held when a limit broke, decided by a person, and every step in the same record.


## Close and questions

### 28. Closing (0:39)

**Click 1** · 0:23

So let me pull it together. Your systems will keep changing every week, and the rules will keep moving underneath them. You can't review your way out of that once a year. Governance has to become controls: defined once, enforced on every request, decided by people when it matters, and proved every day.

**Click 2** · 0:17

That's what we built Akka to do. And whatever platform you choose, including ours, it's the standard I'd ask you to hold it to. Show me the controls. Show me the verdicts. And show me the person who decided.


### 29. Questions (0:08)

**Click 1** · 0:08

Thank you for your time this morning. I'd love to take your questions, and the harder the better.

