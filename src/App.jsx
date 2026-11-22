import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const slides = ["hello", "about me", "things i build", "toolbox", "my philosophy", "say hello"];
const projects = [
  ["NoctisLaby Engine", "GAME TECHNOLOGY", "A game engine I'm building from the ground up.", "https://github.com/spideythedev/noctislaby", "NL"],
  ["Trigo.js", "JAVASCRIPT LIBRARY", "A zero-dependency trigger library for event-driven interactions.", "https://github.com/spideythedev/Trigo", "T."],
  ["BC100", "WEB · EXPERIMENTAL LEARNING", "A project exploring what web technology could feel like if it existed in 100 BC.", "https://bc-100.vercel.app", "BC"],
  ["Human First Software", "ACCESSIBILITY · PWA", "A project focused on more accessible digital experiences.", "", "HFS"],
  ["WAYMARK", "EDUCATION · INDIA", "A decision-support project for students after Class 12.", "", "W."],
  ["Yoppic", "INDEPENDENT STUDIO", "The studio I'm building with a team across software and design.", "https://yoppic.vercel.app", "Y"]
];
const stack = [
  ["LANGUAGES", "JavaScript", "TypeScript", "Python", "C#", "HTML", "CSS"],
  ["FRONTEND", "React", "Next.js", "Vite", "Tailwind CSS"],
  ["BACKEND & DATA", "Node.js", "Firebase", "REST APIs"],
  ["OTHER WORLDS", "Godot", "Discord.py", "Git", "Vercel"]
];

function Label({ number, children }) {
  return <div className="slide-label"><span>{number}</span><span>{children}</span></div>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const touchY = useRef(null);
  const locked = useRef(false);
  const go = useCallback((value) => setActive((current) => Math.max(0, Math.min(slides.length - 1, value))), []);
  useEffect(() => {
    const key = (event) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(active + 1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(active - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(slides.length - 1);
    };
    const wheel = (event) => {
      if (Math.abs(event.deltaY) < 24 || locked.current) return;
      event.preventDefault();
      locked.current = true;
      go(active + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { locked.current = false; }, 850);
    };
    window.addEventListener("keydown", key);
    window.addEventListener("wheel", wheel, { passive: false });
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("wheel", wheel); };
  }, [active, go]);
  const touchStart = (event) => { touchY.current = event.touches[0].clientY; };
  const touchEnd = (event) => {
    if (touchY.current === null) return;
    const delta = touchY.current - event.changedTouches[0].clientY;
    if (Math.abs(delta) > 55) go(active + (delta > 0 ? 1 : -1));
    touchY.current = null;
  };

  return <main className="portfolio" onTouchStart={touchStart} onTouchEnd={touchEnd}>
    <div className="grain" />
    <header className="deck-header">
      <a className="signature" href="#top" onClick={(e) => { e.preventDefault(); go(0); }}>f<span>.</span>m<span className="signature-star">✳</span></a>
      <div className="header-center">FAHAD MALIK <span>—</span> PERSONAL WEBSITE</div>
      <div className="header-count"><b>0{active + 1}</b> / 06</div>
    </header>
    <div className="slide-progress">{slides.map((label, i) => <button key={label} className={"progress-segment " + (i === active ? "current" : i < active ? "passed" : "")} onClick={() => go(i)} aria-label={"Go to " + label} />)}</div>
    <div className="slide-viewport"><div className="slide-track" style={{ transform: "translate3d(0, -" + (active * 100) + "%, 0)" }}>
      <section className={"slide slide-intro " + (active === 0 ? "is-active" : "")}>
        <div className="intro-index">INDEPENDENT DEVELOPER / INDIA / 2026</div>
        <div className="intro-content">
          <p className="overline"><i className="status-dot" /> HEY, I'M FAHAD. ONLINE, I'M SPIDEY.</p>
          <h1>i make<br /><em>things</em> with<br />software<span className="full-stop">.</span></h1>
          <div className="intro-bottom"><p>Websites, tools, experiments, game technology —<br className="desktop-break" /> and whatever else I can't stop thinking about.</p><button className="round-next" onClick={() => go(1)} aria-label="Next slide"><ArrowDown /></button></div>
        </div>
        <div className="intro-side-note">NOT A TEMPLATE.<br />JUST MY CORNER.</div><div className="intro-big-number">01</div>
      </section>

      <section className={"slide slide-about " + (active === 1 ? "is-active" : "")}>
        <Label number="01 / WHO'S THIS?">a little about me</Label>
        <div className="about-layout">
          <div className="about-heading"><p className="overline">FAHAD MALIK <span className="muted">(SPIDEY)</span></p><h2>curiosity<br />got me <em>here.</em></h2><div className="handwritten">still learning. still building. ↗</div></div>
          <div className="about-copy">
            <p className="about-lead">i started coding when i was around eight. i didn't have a laptop for a long time, but that didn't really stop me from being curious.</p>
            <p>I learned by exploring, trying things, breaking them, fixing them, and then getting distracted by another idea. Eventually, that curiosity turned into real projects, open-source experiments, and a studio of my own.</p>
            <p>I'm a full-stack developer. I enjoy the whole process — figuring out an idea, designing how it should feel, writing the code, and making the details work. I'm the founder of Yoppic and IDMAO, and COO at Fubrio.</p>
            <p>I don't want to spend my time only talking about what I could build. I'd rather build it and see where it goes.</p>
            <div className="about-foot"><span>SELF-TAUGHT BY DOING</span><span>BASED IN INDIA</span></div>
          </div>
        </div><span className="slide-decoration">✳</span>
      </section>

      <section className={"slide slide-work " + (active === 2 ? "is-active" : "")}>
        <Label number="02 / THE WORK">some things i've been making</Label>
        <div className="work-heading"><h2>ideas don't<br />build <em>themselves.</em></h2><p>These are a few corners of my brain that turned into projects. Some are ongoing, some are experiments. There's always something to improve.</p></div>
        <div className="project-grid">{projects.map((p, i) => <a className="project" href={p[3] || undefined} target={p[3] ? "_blank" : undefined} rel={p[3] ? "noreferrer" : undefined} key={p[0]}><div className="project-top"><span>0{i + 1} / {p[1]}</span><ArrowUpRight size={16} /></div><div className="project-mark">{p[4]}</div><h3>{p[0]}</h3><p>{p[2]}</p></a>)}</div>
      </section>

      <section className={"slide slide-stack " + (active === 3 ? "is-active" : "")}>
        <Label number="03 / THE TOOLBOX">what i work with</Label>
        <div className="stack-heading"><h2>my tools.<br /><em>my playground.</em></h2><p>I don't marry a framework. I pick what makes sense, learn what I need, and keep moving.</p></div>
        <div className="stack-groups">{stack.map((group, i) => <div className="stack-group" key={group[0]}><span className="stack-number">0{i + 1}</span><div className="stack-content"><span className="stack-label">{group[0]}</span><div className="stack-items">{group.slice(1).map((item) => <span key={item}>{item}</span>)}</div></div></div>)}</div>
        <p className="stack-note">the list changes. that's a good thing.</p>
      </section>

      <section className={"slide slide-mind " + (active === 4 ? "is-active" : "")}>
        <Label number="04 / THE WAY I THINK">a thing i try to live by</Label>
        <div className="mind-content"><p className="overline">A PERSONAL RULE, NOT A SLOGAN</p><h2>don't fall prey<br />to <span>flattery.</span><br /><em>build always.</em></h2><div className="mind-bottom"><p>Don't underestimate anyone. And don't let praise become the thing you work for. Make something real, learn from what doesn't work, and keep getting better.</p><span>— fahad / spidey</span></div></div><div className="mind-mark">✳</div>
      </section>

      <section className={"slide slide-contact " + (active === 5 ? "is-active" : "")}>
        <Label number="05 / THAT'S ME">the internet is a small place</Label>
        <div className="contact-layout"><div><p className="overline">HAVE AN IDEA? LET'S TALK.</p><h2>say<br />hello<span>.</span></h2><p className="contact-copy">Got a project, a question, or something interesting to share? Just write. No formal introduction needed.</p><a className="email-button" href="mailto:hellospideydev@gmail.com">hellospideydev@gmail.com <ArrowUpRight size={18} /></a></div>
          <div className="contact-details"><a href="https://github.com/spideythedev" target="_blank" rel="noreferrer"><Github /><span>GitHub</span><ArrowUpRight /></a><a href="https://linkedin.com/in/fahadmalik-tokyo/" target="_blank" rel="noreferrer"><Linkedin /><span>LinkedIn</span><ArrowUpRight /></a><a href="mailto:hellospideydev@gmail.com"><Mail /><span>Email</span><ArrowUpRight /></a><div className="contact-signoff">made by me, not a committee. <span>♡</span></div></div>
        </div><footer className="deck-footer"><span>FAHAD MALIK / SPIDEY</span><span>© 2026</span><span>YOU MADE IT TO THE END.</span></footer>
      </section>
    </div></div>
    <nav className="slide-nav"><div className="slide-nav-label">{slides[active]}</div><div className="slide-nav-actions"><button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous slide"><ArrowLeft /></button><button onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide"><ArrowRight /></button></div></nav>
    <div className="side-rail"><span>SCROLL / ARROW KEYS</span><i /><span>0{active + 1} — 06</span></div>
  </main>;
}