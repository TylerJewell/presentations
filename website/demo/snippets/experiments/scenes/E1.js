/* Scene E1: One platform, one part. The series opening (../lib/setup.js) configured for Optimize: the family
   diagram, a push into Optimize, its five capabilities, and Experiments growing into the title. */
registerScene({
  id: "E1",
  act: 0,
  title: "One platform, one part",
  duration: 14,
  caption: "Akka is one platform for agentic AI. Specify builds it, the Agent SDK runs it, Verify governs it, and Optimize runs it on the right models. Today, let's look at one part of Optimize: Experiments.",

  /* Each card glows from the words that name it to the next name; the push starts as Optimize is named,
     Experiments lights on "one part of Optimize" and lands as the title on "Experiments". */
  beats() {
    const at = (w, from) => Mock.captionAt(this, w, from);
    const names = [at('Specify'), at('Agent') - 0.3, at('Verify'), at('Optimize'), at('part')];
    return {
      glow: [0, 1, 2, 3].map((i) => [names[i], names[i + 1]]),
      push: names[3] + 0.35,
      light: names[4] - 0.45,
      title: at('Experiments') - 0.75,
    };
  },

  render(root) {
    this.open = SnippetSetup.render(root, {
      part: 'optimize',
      capabilities: ['Gateway', 'Models', 'Routing', 'Experiments', 'Playground'],
      feature: 'Experiments',
      beats: () => this.beats(),
    });
  },

  at(t) {
    this.open.at(t);
  },
});
