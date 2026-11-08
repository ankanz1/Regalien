import { Reveal } from "@/components/home/reveal";

const ideas = [
  { number: "01", title: "Light", detail: "Notice how a room changes through the day." },
  { number: "02", title: "Material", detail: "Let texture, tone and touch inform the atmosphere." },
  { number: "03", title: "Space", detail: "Give movement and everyday function room to belong." },
];

export function PhilosophySection() {
  return (
    <section className="philosophy-section section-pad" aria-labelledby="philosophy-title">
      <div className="shell philosophy-layout">
        <Reveal><p className="eyebrow">Design philosophy</p><span className="philosophy-index">LIGHT · MATERIAL · SPACE</span></Reveal>
        <Reveal className="philosophy-copy" delay={0.1}>
          <h2 id="philosophy-title">How a space<br />feels is shaped by<br /><em>how it works.</em></h2>
          <p>Light, material and movement can shape the atmosphere of a room. Functionality gives it purpose. Everyday living gives it meaning.</p>
        </Reveal>
      </div>
      <div className="shell philosophy-ideas">
        {ideas.map((idea, index) => <Reveal className="philosophy-idea" key={idea.number} delay={index * 0.06}><span>{idea.number}</span><h3>{idea.title}</h3><p>{idea.detail}</p></Reveal>)}
      </div>
    </section>
  );
}
