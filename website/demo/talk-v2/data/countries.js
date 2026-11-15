/* The ten markets of the illustrative lender, in ring order (clockwise from the top), and what each asks
   of a person for one AI-assisted credit decline. `req` is the five-word label on the slide; `when` is a
   status chip where the rule is not yet in force. Sources: reports/Multinational AI oversight and human
   controls.md, the ten-market table; every row cites its primary source there. */
window.V2_COUNTRIES = [
  { id: 'de', name: 'Germany', req: 'Contest, and an explanation', when: '' },
  { id: 'fr', name: 'France', req: 'Works council before rollout', when: '' },
  { id: 'kr', name: 'South Korea', req: 'Refusal, and an assigned overseer', when: '' },
  { id: 'cn', name: 'China', req: 'Refusal; the data stays', when: '' },
  { id: 'vn', name: 'Vietnam', req: 'Oversight, and 72-hour incidents', when: '' },
  { id: 'sg', name: 'Singapore', req: 'Group framework, local expectations', when: 'From Oct 2027' },
  { id: 'br', name: 'Brazil', req: 'Review, possibly by machine', when: '' },
  { id: 'us', name: 'United States', req: 'Appeal with authority to change', when: 'From 2027' },
  { id: 'ca', name: 'Canada', req: 'Observations to a reviewer', when: 'Quebec' },
  { id: 'uk', name: 'United Kingdom', req: 'Intervention and contest', when: '' },
];

/* Where each requirement comes from, for the slide's source note. */
window.V2_COUNTRY_SOURCES =
  'GDPR Art. 22; EU AI Act Arts. 14, 27, 86; KI-MIG. French works-council rulings (Nanterre, Créteil). UK GDPR Arts. 22A–22D (in force 5 Feb 2026). ' +
  'California CCPA ADMT regulations; Colorado SB 26-189 (both 1 Jan 2027). Quebec Law 25 s. 12.1. Brazil LGPD Art. 20. Korea PIPA Art. 37-2, AI Framework Act Art. 34. ' +
  'China PIPL Art. 24 and cross-border rules. MAS AI Risk Management Guidelines (7 Oct 2026). Vietnam AI Law and Decree (2026).';
