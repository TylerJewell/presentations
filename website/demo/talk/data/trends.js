/* Act 1 figures, each with its source. The slides and the beats' spoken words read from here, so a
   figure is changed in one place. Source: research/trends.md (2026-10-27), plus primary pages opened for
   this deck where noted.

   status: 'primary'  read in the originating body's own publication; shown as a plain figure.
           'pending'  only seen in secondary coverage; the slide shows a "Source pending" marker and the
                      figure must be confirmed (or cut) before the talk.

   No figure is pending. The EU AI Act dates were read in EUR-Lex: Regulation (EU) 2024/1689, Article 113
   (applies from 2 Aug 2026; Article 6(1) from 2 Aug 2027), and Regulation (EU) 2026/1744 of 8 July 2026,
   which sets 2 Dec 2027 (Article 6(2) and Annex III) and 2 Aug 2028 (Article 6(1) and Annex I).
   https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng · OJ publication date 24 July 2026 per the European
   Parliament legislative train. */
window.TRENDS = {
  eu: {
    status: 'primary',
    reg: 'Regulation (EU) 2026/1744',
    published: '24 July 2026',
    annexIII: { from: '2026-08-02', to: '2027-12-02', fromLabel: '2 Aug 2026', toLabel: '2 Dec 2027' },
    annexI: { from: '2027-08-02', to: '2028-08-02', fromLabel: '2 Aug 2027', toLabel: '2 Aug 2028' },
    slipMonths: 16,
    source: 'Regulation (EU) 2024/1689, Art. 113; Regulation (EU) 2026/1744 of 8 July 2026 (Digital Omnibus on AI), OJ 24 Jul 2026 (EUR-Lex)',
  },
  colorado: {
    status: 'primary',
    original: { date: '2026-02-01', label: '1 Feb 2026', law: 'SB 24-205' },
    delayed: { date: '2026-06-30', label: '30 Jun 2026', law: 'SB25B-004', signed: '28 Aug 2025' },
    replaced: { date: '2026-05-14', label: '14 May 2026', law: 'SB26-189', title: 'Automated Decision-Making Technology' },
    newDuties: { date: '2027-01-01', label: '1 Jan 2027' },
    source: 'Colorado General Assembly: SB24-205, SB25B-004, SB26-189 (leg.colorado.gov)',
  },
  banking: {
    status: 'primary',
    old: { id: 'SR 11-7', date: '4 Apr 2011' },
    new: { id: 'SR 26-2', date: '17 Apr 2026', by: 'Federal Reserve, OCC, FDIC' },
    footnote: 'Generative AI and agentic AI models are novel and rapidly evolving. As such, they are not within the scope of this guidance.',
    source: 'Federal Reserve SR 26-2, 17 Apr 2026, attachment footnote 3 (federalreserve.gov)',
  },
  states: {
    status: 'primary',
    y2025: { introduced: 1262, enacted: 227 },
    y2026: { introduced: 1539, enacted: 280, asOf: 'early October' },
    source: 'NCSL, "As Congress Deliberates, States Lead the Way on AI Regulation", 21 Oct 2026',
  },
  eo: {
    status: 'primary',
    id: 'Executive Order 14365', date: '11 Dec 2025',
    claim: 'Directs an AI Litigation Task Force whose sole responsibility is to challenge state AI laws',
    source: 'Executive Order 14365, "Ensuring a National Policy Framework for Artificial Intelligence", 11 Dec 2025 (presidency.ucsb.edu)',
  },
  osfi: {
    status: 'primary',
    issued: '11 Sep 2025', effective: '1 May 2027', date: '2027-05-01',
    source: 'OSFI Guideline E-23, Model Risk Management (2027) (osfi-bsif.gc.ca)',
  },
  metr: {
    status: 'primary',
    doublingAll: '7 months', doublingAllSpan: '2019 to 2025',
    doublingRecentDays: 131, doublingRecent: 'about 4 months', doublingRecentSpan: 'models since 2023',
    caveat: 'Tasks are mainly software, machine learning and cybersecurity; 50% success',
    source: 'METR, "Measuring AI Ability to Complete Long Tasks" (Mar 2025) and "Time Horizon 1.1" (Jan 2026)',
  },
  osworld: {
    status: 'primary',
    from: 12, to: 66, human: 72,
    source: 'Stanford HAI, AI Index 2026: agent task success on OSWorld; human baseline 72.35%',
  },
  incidents: {
    status: 'primary',
    y2024: 233, y2025: 362,
    source: 'Stanford HAI, AI Index 2026: documented AI incidents',
  },
};
