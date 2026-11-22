import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const scenes = ["opening", "origin", "tools", "notes", "credits"];
const friends = [
  ["Faiz Choudhary", "IN THE STORY"],
  ["Nithin.K", "IN THE STORY"],
  ["Aditya Uniyal", "IN THE STORY"],
  ["Caleb Ephrem", "IN THE STORY"],
  ["Sudipto Mondal", "ONLINE FRIEND"],
  ["Ahzan Abdul Lathif", "IN THE STORY"],
  ["Afsal", "IN THE STORY"],
  ["Ammar", "IN THE STORY"],
  ["Ijaz Ahmed", "IN THE STORY"]
];
const tools = [
  ["01", "LANGUAGES", "JavaScript", "TypeScript", "Python", "C#", "HTML", "CSS"],
  ["02", "FRONT OF THE WEB", "React", "Next.js", "Vite", "Tailwind CSS"],
  ["03", "BEHIND THE SCENES", "Node.js", "Firebase", "REST APIs"],
  ["04", "MAKING WORLDS", "Godot", "Discord.py", "Git", "Vercel"]
];

function SceneTag({ children }) {
  return <div className="scene-tag"><span>✳</span>{children}</div>;
}

function Doodle({ kind = "star", className = "" }) {
  if (kind === "flower") return <svg className={"doodle " + className} viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 50C28 22 42 8 50 8C63 8 70 27 50 50C77 28 92 43 91 52C90 66 68 70 50 50C73 78 58 92 49 91C35 90 31 68 50 50C22 74 8 59 9 49C10 35 32 30 50 50Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="50" cy="50" r="7" fill="currentColor"/></svg>;
  if (kind === "orbit") return <svg className={"doodle " + className} viewBox="0 0 150 100" fill="none" aria-hidden="true"><path d="M8 53C22 5 122 3 141 45C160 87 39 111 11 71C-4 49 24 27 59 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 5"/><circle cx="76" cy="51" r="11" stroke="currentColor" strokeWidth="2.5"/><path d="M80 11L86 2M127 79L138 86" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
  return <svg className={"doodle " + className} viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 5L58 37L88 17L68 46L96 55L65 61L82 91L54 70L43 98L39 66L8 84L30 57L3 42L36 41L24 10L47 32Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/></svg>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [credits, setCredits] = useState(false);
  const touchStart = useRef(null);
  const locked = useRef(false);
  const go = useCallback((next) => setActive((current) => Math.max(0, Math.min(scenes.length - 1, next))), []);

  useEffect(() => {
    const onKey = (event) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(active + 1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(active - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(scenes.length - 1);
    };
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 18 || locked.current) return;
      event.preventDefault();
      locked.current = true;
      go(active + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { locked.current = false; }, 1050);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("wheel", onWheel); };
  }, [active, go]);

  const onTouchStart = (event) => { touchStart.current = event.touches[0].clientY; };
  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - event.changedTouches[0].clientY;
    if (Math.abs(delta) > 45) go(active + (delta > 0 ? 1 : -1));
    touchStart.current = null;
  };

  return <main className="film" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="paper-grain" />
    <header className="film-top"><span className="film-mark">FM<span>✳</span></span><span className="film-top-title">A SMALL FILM ABOUT FAHAD</span><span className="film-counter">SCENE 0{active + 1} / 05</span></header>
    <div className="film-progress">{scenes.map((scene, index) => <button key={scene} onClick={() => go(index)} className={index === active ? "active" : index < active ? "passed" : ""} aria-label={"Go to " + scene} />)}</div>
    <div className="film-window"><div className="film-reel" style={{ transform: "translateY(-" + active * 100 + "%)" }}>
      <section className={"scene opening " + (active === 0 ? "shown" : "")}>
        <div className="opening-sky"><div className="sun" /><div className="scribble-cloud cloud-one" /><div className="scribble-cloud cloud-two" /><div className="hill hill-back" /><div className="hill hill-front" /></div>
        <div className="opening-copy"><p className="eyebrow handwritten">a little moving picture / no. 001</p><h1>hello,<br />i'm <em>fahad.</em></h1><p className="opening-sub">somewhere between curiosity<br />and making things work.</p><div className="name-stamp">also known as<br /><strong>SPIDEY</strong></div></div>
        <Doodle kind="star" className="opening-star" /><Doodle kind="flower" className="opening-flower" />
        <button className="continue-note" onClick={() => go(1)}>THE STORY STARTS HERE <ArrowDown size={15}/></button>
        <span className="scene-number">01 — OPENING CREDITS</span>
      </section>

      <section className={"scene origin " + (active === 1 ? "shown" : "")}>
        <SceneTag>chapter one · the beginning</SceneTag>
        <div className="origin-grid"><div className="origin-title"><p className="eyebrow">BEFORE THE BIG IDEAS</p><h2>curiosity<br />was the <em>first tool.</em></h2><Doodle kind="orbit" className="origin-orbit"/></div><div className="origin-story"><p className="story-lead">i started coding when i was around eight.</p><p>For a long time, I didn't have a laptop. I still wanted to know how things worked — so I explored whatever I could, learned little by little, and kept the curiosity alive.</p><p>When I finally got more room to build, I didn't want to make just one kind of thing. I wanted to understand the whole process: the idea, the design, the logic, the details, and the feeling when it all comes together.</p><p>That's still how I learn. Try it. Break it. Fix it. Find a new question. Repeat.</p><div className="story-sign">— fahad <span>↗</span></div></div></div>
        <div className="origin-bottom"><span>SELF-TAUGHT, BY DOING</span><span>BASED IN INDIA</span><span>STILL FIGURING IT OUT</span></div>
        <span className="scene-number">02 — THE ORIGIN STORY</span>
      </section>

      <section className={"scene tools-scene " + (active === 2 ? "shown" : "")}>
        <SceneTag>chapter two · the things in my toolbox</SceneTag>
        <div className="tools-heading"><div><p className="eyebrow">A WORKING COLLECTION</p><h2>my tools,<br /><em>my playground.</em></h2></div><p className="tools-aside handwritten">not a checklist.<br />just things i use. ↙</p></div>
        <div className="tool-list">{tools.map((group) => <div className="tool-row" key={group[0]}><span className="tool-index">{group[0]}</span><span className="tool-category">{group[1]}</span><div className="tool-names">{group.slice(2).map((tool) => <span key={tool}>{tool}</span>)}</div></div>)}</div>
        <div className="tools-foot"><Doodle kind="flower" className="tools-flower"/><span>THE STACK KEEPS CHANGING. THAT'S THE POINT.</span></div>
        <span className="scene-number">03 — THE TOOLBOX</span>
      </section>

      <section className={"scene advice " + (active === 3 ? "shown" : "")}>
        <SceneTag>chapter three · a few notes to keep</SceneTag>
        <div className="advice-center"><p className="eyebrow">THINGS I'D TELL MY EARLIER SELF</p><h2>don't wait<br />to feel <em>ready.</em></h2><Doodle kind="star" className="advice-star"/><div className="advice-notes"><p><span>01</span> Start with what you have. A small beginning is still a beginning.</p><p><span>02</span> Don't worship tools. Learn the idea underneath them.</p><p><span>03</span> Don't fall prey to flattery. Build always.</p><p><span>04</span> Don't underestimate anyone — including yourself.</p><p><span>05</span> Make things, share what you learn, and stay curious.</p></div><div className="advice-signature handwritten">keep going. — spidey</div></div>
        <span className="scene-number">04 — NOTES FROM THE MAKER</span>
      </section>

      <section className={"scene credits " + (active === 4 ? "shown" : "")}>
        <div className="credit-top"><SceneTag>the people who make the story better</SceneTag><p className="eyebrow">A VERY IMPORTANT PART OF THE CREDITS</p></div>
        <div className={"credits-roll " + (credits ? "rolling" : "")}>
          <p className="credit-intro handwritten">no one makes a good story alone.</p>
          <h2>my people.</h2>
          <div className="friend-list">{friends.map(([name, note], index) => <div className="friend" key={name}><span className="friend-no">0{index + 1}</span><span className="friend-name">{name}</span><span className="friend-note">{note}</span></div>)}</div>
          <p className="credit-thanks handwritten">glad our paths crossed. ♡</p>
          <div className="the-end"><Doodle kind="flower"/><span>THE END</span><small>...for this little film, anyway.</small></div>
        </div>
        <button className="credits-play" onClick={() => setCredits(!credits)}>{credits ? "PAUSE THE CREDITS" : "ROLL THE CREDITS"} <Sparkles size={14}/></button>
        <span className="scene-number">05 — END CREDITS</span>
      </section>
    </div></div>
    <nav className="film-controls"><span className="control-hint">USE THE ARROW KEYS OR SWIPE</span><div className="control-actions"><button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous scene"><ArrowLeft size={17}/></button><button onClick={() => go(active + 1)} disabled={active === 4} aria-label="Next scene"><ArrowRight size={17}/></button></div></nav>
  </main>;
}
