import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Pause, Play, Volume2, Sparkles,
  Code2, Heart, Lightbulb, Flower2, Orbit, Star, Sun
} from "lucide-react";

const scenes = ["hello", "story", "stack", "notes", "people"];
const friends = [
  ["Faiz Choudhary", "GOOD HUMAN"],
  ["Nithin.K", "DAY-ONE ENERGY"],
  ["Aditya Uniyal", "GOOD HUMAN"],
  ["Caleb Ephrem", "GOOD HUMAN"],
  ["Sudipto Mondal", "ONLINE FRIEND"],
  ["Ahzan Abdul Lathif", "BUILDER"],
  ["Afsal", "GOOD HUMAN"],
  ["Ammar", "GOOD HUMAN"],
  ["Ijaz Ahmed", "GOOD HUMAN"]
];
const stack = [
  { label: "LANGUAGES", items: ["JavaScript", "TypeScript", "Python", "C#", "HTML", "CSS"], color: "pink" },
  { label: "FRONTEND", items: ["React", "Next.js", "Vite", "Tailwind CSS"], color: "blue" },
  { label: "BACKEND & DATA", items: ["Node.js", "Firebase", "REST APIs"], color: "yellow" },
  { label: "TOOLS & WORLDS", items: ["Godot", "Discord.py", "Git", "Vercel"], color: "green" }
];

function Scribble({ className = "" }) {
  return <svg className={className} viewBox="0 0 180 80" fill="none" aria-hidden="true">
    <path d="M5 47C35 10 120 8 169 34M12 57C57 27 124 28 174 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStart = useRef(null);
  const timer = useRef(null);
  const go = useCallback((next) => {
    setActive((current) => Math.max(0, Math.min(scenes.length - 1, next)));
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const started = Date.now();
    timer.current = window.setInterval(() => {
      const elapsed = Date.now() - started;
      setProgress(Math.min(100, (elapsed / 7200) * 100));
      if (elapsed >= 7200) {
        setActive((current) => current === scenes.length - 1 ? 0 : current + 1);
        setProgress(0);
      }
    }, 80);
    return () => window.clearInterval(timer.current);
  }, [active, playing]);

  useEffect(() => {
    const onKey = (event) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(active === scenes.length - 1 ? 0 : active + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(active - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(scenes.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const onTouchStart = (event) => { touchStart.current = event.touches[0].clientX; };
  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 45) go(active + (delta > 0 ? 1 : -1));
    touchStart.current = null;
  };

  return <main className="show" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="grain" />
    <header className="topbar">
      <a className="monogram" href="#hello" onClick={(e) => { e.preventDefault(); go(0); }}>FM<span>✳</span></a>
      <div className="top-caption">A LITTLE FILM / BY FAHAD MALIK</div>
      <div className="top-right"><span>ISSUE Nº 001</span><span className="live-dot" /></div>
    </header>

    <div className="progress-track" aria-label="Slideshow progress">
      {scenes.map((scene, index) => <button key={scene} className={index === active ? "current" : index < active ? "done" : ""} onClick={() => go(index)} aria-label={"Go to " + scene}>
        <span style={{ width: index === active ? progress + "%" : undefined }} />
      </button>)}
    </div>

    <div className="slides-viewport">
      <div className="slides" style={{ transform: "translateX(-" + active * 100 + "%)" }}>
        <section className="slide slide-hello">
          <div className="hello-shape shape-a" /><div className="hello-shape shape-b" />
          <div className="hello-copy">
            <p className="hand hello-kicker">a curious mind, a messy desk & a lot of tabs open</p>
            <h1>hey,<br />i'm <span>fahad.</span></h1>
            <p className="hello-sub">I like figuring out how things work<br />and then making something of my own.</p>
            <div className="signature">also known as <b>SPIDEY</b> <Sparkles size={18}/></div>
          </div>
          <div className="sun-doodle"><Sun size={92} strokeWidth={1.1}/></div>
          <div className="hello-sticker sticker-one"><Star size={17} fill="currentColor"/> STILL CURIOUS</div>
          <div className="hello-sticker sticker-two hand">made of ideas & stubbornness</div>
          <div className="scribble-line"><Scribble /></div>
          <span className="folio">01 / THE INTRO</span>
        </section>

        <section className="slide slide-story">
          <div className="chapter"><span>01</span> THE BACKSTORY</div>
          <div className="story-layout">
            <div className="story-heading"><p className="micro">IT STARTED WITH A QUESTION</p><h2>curiosity<br />came <i>first.</i></h2><div className="story-sticker"><Orbit size={24}/> keep wondering</div></div>
            <div className="story-text">
              <p className="lead">I started coding when I was around eight.</p>
              <p>For a long time, I didn't have a laptop. That didn't switch off the curiosity. I explored what I could, learned little by little, and kept asking how things worked.</p>
              <p>When I got more room to build, I wanted to understand the whole thing — the idea, the design, the logic, the tiny details, and that feeling when it finally clicks.</p>
              <p>That's still my way: try it, break it, fix it, and follow the next question.</p>
              <div className="story-sign hand">— Fahad <Heart size={15} fill="currentColor"/></div>
            </div>
          </div>
          <div className="story-bottom"><span>SELF-TAUGHT, BY DOING</span><span>BASED IN INDIA</span><span>ALWAYS A WORK IN PROGRESS</span></div>
          <span className="folio">02 / THE BEGINNING</span>
        </section>

        <section className="slide slide-stack">
          <div className="chapter"><span>02</span> MY DIGITAL TOOLBOX</div>
          <div className="stack-head"><div><p className="micro">THINGS I LIKE TO BUILD WITH</p><h2>my kind<br />of <i>chaos.</i></h2></div><p className="hand stack-note">tools are tools.<br/>the fun is what you make ↘</p></div>
          <div className="stack-groups">
            {stack.map((group, index) => <div className={"stack-row " + group.color} key={group.label}>
              <span className="stack-number">0{index + 1}</span><span className="stack-label">{group.label}</span>
              <div className="stack-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </div>)}
          </div>
          <div className="stack-foot"><Code2 size={18}/> <span>THE STACK CHANGES. THE CURIOSITY DOESN'T.</span><Flower2 size={24}/></div>
          <span className="folio">03 / THE TOOLBOX</span>
        </section>

        <section className="slide slide-notes">
          <div className="chapter"><span>03</span> NOTES TO SELF (AND YOU)</div>
          <div className="notes-layout">
            <div className="notes-heading"><p className="micro">A FEW THINGS I BELIEVE</p><h2>make it<br /><i>anyway.</i></h2><div className="hand note-sign">you'll learn on the way. <span>↗</span></div></div>
            <div className="notes-list">
              <p><b>01</b><span>Start with what you have. A small beginning still counts.</span></p>
              <p><b>02</b><span>Don't worship tools. Learn the idea underneath them.</span></p>
              <p><b>03</b><span>Don't fall prey to flattery. <strong>Build always.</strong></span></p>
              <p><b>04</b><span>Don't underestimate anyone — including yourself.</span></p>
              <p><b>05</b><span>Make things. Share what you learn. Stay curious.</span></p>
            </div>
          </div>
          <div className="notes-spark"><Lightbulb size={50} strokeWidth={1.2}/></div>
          <span className="folio">04 / A FEW REMINDERS</span>
        </section>

        <section className="slide slide-people">
          <div className="chapter"><span>04</span> THE PEOPLE BIT</div>
          <div className="people-head"><p className="hand">life's better with good people around.</p><h2>my <i>people.</i></h2><Heart size={42} fill="currentColor"/></div>
          <div className="people-grid">{friends.map(([name, note], index) => <div className="person" key={name}>
            <span className="person-index">0{index + 1}</span><span className="person-name">{name}</span><span className="person-note">{note}</span>
          </div>)}</div>
          <div className="people-thanks hand">glad our paths crossed. <span>♡</span></div>
          <div className="end-stamp">THAT'S A WRAP <Star size={15}/></div>
          <span className="folio">05 / END CREDITS</span>
        </section>
      </div>
    </div>

    <footer className="controls">
      <div className="control-status"><span className="status-dot"/>{playing ? "AUTO-PLAYING" : "PAUSED"}<span className="control-divider"/> <span>{String(active + 1).padStart(2, "0")} / 05</span></div>
      <div className="control-buttons">
        <button className="play-toggle" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>{playing ? <Pause size={15}/> : <Play size={15}/>}<span>{playing ? "PAUSE" : "PLAY"}</span></button>
        <button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous slide"><ArrowLeft size={17}/></button>
        <button onClick={() => go(active === scenes.length - 1 ? 0 : active + 1)} aria-label="Next slide"><ArrowRight size={17}/></button>
      </div>
    </footer>
  </main>;
}
