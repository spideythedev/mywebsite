import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, Asterisk, Atom, AudioWaveform,
  BookOpen, Code2, Compass, Fingerprint, Flower2, Heart, Lightbulb,
  Pause, Play, Sparkles, Star, Sun, Telescope, WandSparkles
} from "lucide-react";

const chapters = ["cover", "origin", "tools", "beliefs", "friends"];

const friends = [
  "Faiz Choudhary", "Nithin.K", "Aditya Uniyal", "Caleb Ephrem",
  "Sudipto Mondal", "Ahzan Abdul Lathif", "Afsal", "Ammar", "Ijaz Ahmed"
];

const disciplines = [
  { name: "JavaScript", orbit: "orbit-a", mark: "JS" },
  { name: "React", orbit: "orbit-b", mark: "Re" },
  { name: "Python", orbit: "orbit-c", mark: "Py" },
  { name: "TypeScript", orbit: "orbit-d", mark: "TS" },
  { name: "C#", orbit: "orbit-e", mark: "C#" },
  { name: "Next.js", orbit: "orbit-f", mark: "N" },
  { name: "Node.js", orbit: "orbit-g", mark: "No" },
  { name: "Godot", orbit: "orbit-h", mark: "Go" },
  { name: "Firebase", orbit: "orbit-i", mark: "Fb" },
  { name: "Vite", orbit: "orbit-j", mark: "Vi" },
  { name: "Tailwind", orbit: "orbit-k", mark: "Tw" },
  { name: "HTML / CSS", orbit: "orbit-l", mark: "</>" },
  { name: "Discord.py", orbit: "orbit-m", mark: "D" },
  { name: "Git", orbit: "orbit-n", mark: "Git" },
  { name: "REST APIs", orbit: "orbit-o", mark: "API" },
  { name: "Vercel", orbit: "orbit-p", mark: "▲" }
];

const principles = [
  ["01", "Start with what you have.", "A small beginning is still a beginning."],
  ["02", "Understand the thing beneath the tool.", "Tools change. The idea stays useful."],
  ["03", "Don't fall prey to flattery. Build always.", "Let the work speak. Keep making."],
  ["04", "Don't underestimate anyone.", "Including the person in the mirror."],
  ["05", "Stay curious. Stay in motion.", "Make things. Share what you learn."]
];

function Doodle({ className = "" }) {
  return <svg className={className} viewBox="0 0 220 100" fill="none" aria-hidden="true">
    <path d="M5 70C35 7 118 4 212 35M17 86C69 32 144 30 203 49" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M175 16l35 19-31 21" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

function OrbitMark({ className = "" }) {
  return <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden="true">
    <ellipse cx="120" cy="120" rx="102" ry="39" stroke="currentColor" strokeWidth="1.5" transform="rotate(-34 120 120)"/>
    <ellipse cx="120" cy="120" rx="102" ry="39" stroke="currentColor" strokeWidth="1.5" transform="rotate(35 120 120)"/>
    <circle cx="120" cy="120" r="19" fill="currentColor"/>
    <circle cx="35" cy="72" r="8" fill="#F36B4F"/>
    <circle cx="195" cy="172" r="7" fill="#C5E85A"/>
  </svg>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const touchX = useRef(null);
  const go = useCallback((next) => {
    setActive((current) => Math.max(0, Math.min(chapters.length - 1, next)));
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % chapters.length);
    }, 8500);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const onKey = (event) => {
      if (["ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        setActive((current) => (current + 1) % chapters.length);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        setActive((current) => Math.max(0, current - 1));
      }
      if (event.key === "Home") setActive(0);
      if (event.key === "End") setActive(chapters.length - 1);
      if (event.code === "Space" && event.target === document.body) {
        event.preventDefault();
        setPlaying((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2
    });
  };

  const onTouchStart = (event) => { touchX.current = event.touches[0].clientX; };
  const onTouchEnd = (event) => {
    if (touchX.current === null) return;
    const distance = touchX.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 55) setActive((current) => Math.max(0, Math.min(chapters.length - 1, current + (distance > 0 ? 1 : -1))));
    touchX.current = null;
  };

  return (
    <main className="fieldbook" onPointerMove={onPointerMove} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{ "--pointer-x": pointer.x, "--pointer-y": pointer.y }}>
      <div className="paper-grain" />
      <header className="masthead">
        <button className="seal" onClick={() => go(0)} aria-label="Back to beginning">F<span>M</span><i>✳</i></button>
        <div className="masthead-title">FIELD NOTES FROM A WORK IN PROGRESS</div>
        <div className="masthead-issue">PERSONAL ARCHIVE <span>✳</span> Nº 026</div>
      </header>

      <nav className="chapter-nav" aria-label="Chapters">
        {chapters.map((chapter, index) => (
          <button key={chapter} className={active === index ? "active" : ""} onClick={() => go(index)} aria-label={"Open " + chapter}>
            <span className="nav-index">0{index + 1}</span><span className="nav-name">{chapter}</span>
          </button>
        ))}
      </nav>

      <div className="world-window">
        <div className="world-track" style={{ transform: "translate3d(-" + active * 100 + "%,0,0)" }}>
          <section className="world-page page-cover">
            <div className="cover-grid" />
            <div className="cover-kicker"><span className="tiny-star">✳</span> A HUMAN, STILL LOADING <span>— 2026</span></div>
            <div className="cover-title-wrap">
              <p className="hand cover-pretitle">well, hello there.</p>
              <h1>FAHAD<span className="title-period">.</span></h1>
              <div className="cover-subline"><span>SOFTWARE DEVELOPER</span><span className="subline-mark">✳</span><span>IDEA COLLECTOR</span><span className="subline-mark">✳</span><span>PROFESSIONAL WHY-ASKER</span></div>
            </div>
            <div className="cover-orbit" style={{ transform: "translate(" + pointer.x * 8 + "px," + pointer.y * 8 + "px) rotate(" + pointer.x * 5 + "deg)" }}>
              <OrbitMark />
              <span className="orbit-label orbit-label-top">THINK / MAKE / REPEAT</span>
              <span className="orbit-label orbit-label-bottom">ALSO KNOWN AS SPIDEY</span>
            </div>
            <div className="cover-bottom">
              <div className="cover-note hand">I make things because<br/>I want to know what happens.</div>
              <div className="cover-coordinates"><span>11° N / 77° E</span><span>INDIA, PLANET EARTH</span></div>
              <div className="cover-scroll">TURN THE PAGE <ArrowDownRight size={19}/></div>
            </div>
            <div className="margin-doodle"><Doodle /></div>
            <span className="page-number">01 — 05</span>
          </section>

          <section className="world-page page-origin">
            <div className="section-label"><span>CHAPTER 01</span><span>THE ORIGIN STORY</span></div>
            <div className="origin-layout">
              <div className="origin-head">
                <div className="hand origin-aside">not a straight line.<br/>never was.</div>
                <h2>IT BEGAN<br/>WITH A <em>WHY.</em></h2>
                <div className="origin-age"><span>≈ 08</span><small>YEARS OLD<br/>WHEN I STARTED</small></div>
              </div>
              <div className="origin-copy">
                <p className="origin-lead">I didn't start with a setup. I started with questions.</p>
                <p>I was around eight when I began coding. For a long time, I didn't have a laptop. So I explored what I could, learned in the gaps, and kept pulling at the thread of how things worked.</p>
                <p>Later, when I had more room to build, I wanted to understand all of it — the idea, the interface, the logic, the little details that make something feel alive.</p>
                <p>My process is still gloriously unglamorous: try, break, fix, repeat. Then get curious about something else.</p>
                <div className="origin-sign hand">— Fahad Malik <Heart size={17} fill="currentColor"/></div>
              </div>
            </div>
            <div className="origin-foot"><span>NO PERFECT STARTING POINT REQUIRED.</span><span>JUST START SOMEWHERE ↗</span></div>
            <div className="origin-sun"><Sun /></div>
            <span className="page-number">02 — 05</span>
          </section>

          <section className="world-page page-tools">
            <div className="section-label"><span>CHAPTER 02</span><span>THE THINGS I SPEAK IN</span></div>
            <div className="tools-heading">
              <div><p className="hand tools-eyebrow">my current collection of building blocks</p><h2>A MIND<br/>IN <em>MOTION.</em></h2></div>
              <div className="tools-stamp"><Atom size={28}/><span>16+<small>TOOLS &<br/>TECHNOLOGIES</small></span></div>
            </div>
            <div className="constellation">
              <div className="constellation-lines" />
              <div className="constellation-core"><Code2 size={36}/><span>MAKE<br/>STUFF</span></div>
              {disciplines.map((item, index) => (
                <div className={"constellation-node " + item.orbit} key={item.name} style={{ "--node-index": index }}>
                  <span className="node-mark">{item.mark}</span><span className="node-name">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="tools-footer"><span>LANGUAGES / FRAMEWORKS / ENGINES / INFRASTRUCTURE</span><span>THE TOOLBOX IS NEVER FINISHED <Sparkles size={15}/></span></div>
            <span className="page-number">03 — 05</span>
          </section>

          <section className="world-page page-beliefs">
            <div className="section-label"><span>CHAPTER 03</span><span>THINGS I KEEP CLOSE</span></div>
            <div className="beliefs-top"><p className="hand">a note pinned somewhere in my head</p><h2>THE RULES<br/>I <em>MAKE.</em></h2><Lightbulb className="beliefs-icon" size={58}/></div>
            <div className="belief-list">
              {principles.map(([number, title, detail]) => (
                <article className="belief-row" key={number}>
                  <span className="belief-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                  <span className="belief-arrow">↗</span>
                </article>
              ))}
            </div>
            <div className="beliefs-end hand">a little less talking. a little more making. <Asterisk size={18}/></div>
            <span className="page-number">04 — 05</span>
          </section>

          <section className="world-page page-friends">
            <div className="section-label"><span>CHAPTER 04</span><span>THE HUMAN FOOTNOTES</span></div>
            <div className="friends-heading">
              <p className="hand">some names that belong in this story.</p>
              <h2>GOOD PEOPLE.<br/><em>GOOD DAYS.</em></h2>
              <div className="friends-heart"><Heart size={48} strokeWidth={1.4}/><span>♡</span></div>
            </div>
            <div className="friends-paper">
              <div className="friends-paper-head"><span>THE PEOPLE INDEX</span><span>NOT RANKED. NOT IN ORDER OF IMPORTANCE.</span></div>
              <div className="friends-list">
                {friends.map((name, index) => (
                  <div className="friend-line" key={name}>
                    <span className="friend-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="friend-name">{name}</span>
                    <span className="friend-mark">{index === 4 ? "✳ ONLINE FRIEND" : "✳ IN MY CORNER"}</span>
                  </div>
                ))}
              </div>
              <div className="friends-paper-foot hand">glad our paths crossed. really.</div>
            </div>
            <div className="friends-outro"><span>END OF THIS EDITION</span><span>THE STORY KEEPS GOING <Asterisk size={16}/></span></div>
            <span className="page-number">05 — 05</span>
          </section>
        </div>
      </div>

      <footer className="field-controls">
        <div className="control-left"><Fingerprint size={17}/><span>AN ORIGINAL HUMAN, STILL IN PROGRESS</span></div>
        <div className="control-center"><span>{String(active + 1).padStart(2, "0")}</span><div className="control-progress"><i key={active} className={playing ? "running" : "paused"}/></div><span>05</span></div>
        <div className="control-right">
          <button onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause auto advance" : "Resume auto advance"}>{playing ? <Pause size={15}/> : <Play size={15}/>}</button>
          <button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous chapter"><ArrowLeft size={17}/></button>
          <button onClick={() => go((active + 1) % chapters.length)} aria-label="Next chapter"><ArrowRight size={17}/></button>
        </div>
      </footer>
    </main>
  );
}
