/* Scene 3.4: Decide and sign. The owner confirms the data-types fact; the loop steps through Describe,
   Plan and Decide while two new controls slide into the contract's rows, each opening to say what it
   does: an Evaluation bound to the eligibility assessor agent and a Human control bound to the
   underwriting workflow with a 4 h SLA. "Sign v4": a seal stamps, the loop lands on In force · v4,
   Code in sync turns green, the rail gains v4 with its chain and keys, and the evidence strip pins
   "v4 signed · supersedes v3". The board is S3Board (scenes/3.2.js) on the act clock. */
registerScene({
  id: '3.4',
  act: 3,
  title: "Decide and sign",
  duration: 28,
  captionZone: 'bottom-right',
  headline: "Version four of the contract is signed.",
  caption: "The owner confirms it, and the contract adds two controls: an evaluation that checks every decision doesn't rely on that characteristic, and a person who reviews any decision it flags. Version four is signed: immutable, chained to the one before, and verified against trusted keys.",

  render(root) {
    root.classList.add('s34');
    this.b = S3Board.build(root);
    this.cursor = Mock.cursor(this.b.world);
  },

  at(t) {
    const M = Mock, b = this.b, off = S3Board.OFFSET['3.4'], K = S3Board.K;
    const L = (k) => K[k] - off; /* an act event in this scene's time */
    b.at(t + off, t);

    /* the two buttons the cursor presses, measured once in the state they are pressed in, so a seek
       into any moment of the scene places the cursor the same way */
    if (!this.confirmAt) {
      const el = b.rr[2].btn, d = el.style.display;
      el.style.display = '';
      this.confirmAt = b.rectOf(el);
      el.style.display = d;
      const s = b.r.stBtn, old = s.textContent;
      s.textContent = 'Sign v4';
      this.signAt = b.rectOf(s);
      s.textContent = old;
    }
    const cf = this.confirmAt, sg = this.signAt;
    this.cursor.at(t, [
      { t: 0.9, x: cf[0] - 120, y: cf[1] + 70, glide: 0.6 },
      { t: L('confirm'), x: cf[0] + cf[2] * 0.5, y: cf[1] + cf[3] * 0.55, click: true, glide: 0.8 },
      { t: L('confirm') + 1.3, x: cf[0] + 40, y: cf[1] + 120, glide: 0.9, hide: true },
      { t: L('sign') - 1.6, x: cf[0] + 40, y: cf[1] + 120, glide: 0.1 },
      { t: L('sign'), x: sg[0] + sg[2] * 0.5, y: sg[1] + sg[3] * 0.55, click: true, glide: 0.9 },
      { t: L('sign') + 1.2, x: sg[0] - 30, y: sg[1] + 110, glide: 0.8, hide: true },
    ]);

    /* the camera: the fact, the new rows, the signature, the loop in force, then the whole board */
    M.camera(b.world, t, [
      { t: 0.2, rect: b.P(548, 36, 808, 150), dur: 1.1 },
      { t: L('rowA') - 1.9, rect: b.P(252, 312, 1104, 140), dur: 1.2 },
      { t: L('ready') - 0.2, rect: b.P(252, 300, 1104, 228), dur: 1.0 },
      { t: L('inforce') + 0.5, rect: b.P(252, 0, 1104, 300), dur: 1.2 },
      { t: L('chain') + 0.2, rect: null, dur: 1.3 },
    ]);
  },
});
