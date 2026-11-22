import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Asterisk, AtSign, AudioLines, Github,
  Instagram, Linkedin, Mail, Menu, MousePointer2, Pencil, Sparkles,
  X, Volume2, VolumeX
} from "lucide-react";

const sections = [
  ["hello", "hello there"],
  ["doing", "what i do"],
  ["toolbox", "my toolbox"],
  ["story", "my story"],
  ["beliefs", "my philosophy"],
  ["inspired", "things i love"],
  ["next", "what's next"],
  ["contact", "say hello"],
];

const tools = [
  { name: "JavaScript", note: "the language i keep coming back to", color: "yellow" },
  { name: "React", note: "for building things people can use", color: "blue" },
  { name: "Vite", note: "fast starts, fast feedback", color: "purple" },
  { name: "HTML", note: "the bones of the web", color: "orange" },
  { name: "Tailwind CSS", note: "when utility classes make sense", color: "cyan" },
  { name: "Lucide", note: "little symbols with personality", color: "green" },
  { name: "Icons8", note: "for finding the right visual detail", color: "pink" },
];

function Doodle({ className = "", children = "✳" }) {
  return <span aria-hidden="true" className={\`doodle \${className}\`}>{children}</span>;
}

function Intro({ onFinish }) {
  const [step, setStep] = useState(0);
  const [drawing, setDrawing] = useState(false);

  const advance = () => {
    if (step < 2) setStep((value) => value + 1);
    else onFinish();
  };

  return (
    <div className="intro-screen" onClick={advance}>
      <div className="intro-grain" />
      <div className="intro-meta"><span>AN INTRODUCTION, SORT OF</span><span>NO. 001 / FAHAD'S WORLD</span></div>
      <div className="intro-center">
        <div className={\`scribble-stage \${drawing ? "is-drawing" : ""}\`}>
          <svg viewBox="0 0 300 190" role="img" aria-label="A hand-drawn sun">
            <path className="sun-line" d="M150 37 C188 34 218 66 214 103 C210 143 178 160 143 151 C104 143 82 113 91 78 C99 48 123 36 150 37Z" />
            <path className="sun-line sun-line-two" d="M150 45 C184 43 209 72 207 103 C205 133 177 150 145 144 C112 137 91 112 99 81 C106 55 126 43 150 45Z" />
            <path className="ray" d="M150 15l-3 12M224 39l-10 9M251 104l-16-1M218 160l-11-9M79 155l12-10M52 99l17 1M82 43l10 10" />
            <circle cx="135" cy="91" r="3" fill="currentColor" /><circle cx="170" cy="91" r="3" fill="currentColor" />
            <path d="M139 112q13 13 27 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <Doodle className="intro-star star-a">✳</Doodle>
          <Doodle className="intro-star star-b">✦</Doodle>
          <Doodle className="intro-star star-c">·</Doodle>
        </div>
        <p className="intro-kicker">{step === 0 ? "a blank page, basically." : step === 1 ? "well, that's a start." : "okay, let's meet."}</p>
        <h1 className="intro-title">
          {step === 0 && <>make a little<br /><em>mark.</em></>}
          {step === 1 && <>oh, hi<span className="red-dot">.</span><br /><em>i'm fahad.</em></>}
          {step === 2 && <>welcome to<br /><em>my little world.</em></>}
        </h1>
        <p className="intro-hint"><MousePointer2 size={15} /> {step === 0 ? "tap anywhere to begin" : step === 1 ? "one more time" : "come on in"}</p>
        <button className="skip-intro" onClick={(event) => { event.stopPropagation(); onFinish(); }}>skip the intro <ArrowUpRight size={14}/></button>
      </div>
      <div className="intro-bottom"><span>MADE WITH CURIOSITY</span><span>2026 — AND STILL MAKING</span></div>
      <button className="intro-draw-trigger" aria-label="Draw on the page" onClick={(event) => { event.stopPropagation(); setDrawing(true); window.setTimeout(() => setDrawing(false), 900); }}><Pencil size={17}/></button>
    </div>
  );
}

function HandUnderline({ children }) {
  return <span className="hand-underline">{children}</span>;
}

function SectionHeading({ eyebrow, children, number }) {
  return (
    <div className="section-heading">
      <div className="section-eyebrow"><span>{number}</span><span>{eyebrow}</span></div>
      <h2>{children}</h2>
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("fahad-intro-seen"));
  const [active, setActive] = useState("hello");
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [note, setNote] = useState(false);

  useEffect(() => {
    if (showIntro) document.body.classList.add("intro-open");
    else document.body.classList.remove("intro-open");
    return () => document.body.classList.remove("intro-open");
  }, [showIntro]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [showIntro]);

  const finishIntro = () => {
    sessionStorage.setItem("fahad-intro-seen", "yes");
    setShowIntro(false);
  };

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {showIntro && <Intro onFinish={finishIntro} />}
      <div className="paper-world">
        <div className="top-strip"><span>AN INTERNET PERSON, MAKING INTERNET THINGS</span><span className="top-strip-right">SOMEWHERE IN INDIA <span className="tiny-sun">✳</span> AVAILABLE FOR GOOD IDEAS</span></div>
        <header className="site-header">
          <a className="wordmark" href="#hello" onClick={(event) => { event.preventDefault(); jumpTo("hello"); }} aria-label="Fahad Malik home">f<span>.</span>m<span className="wordmark-star">✳</span></a>
          <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
            {sections.map(([id, label], index) => (
              <a key={id} href={\`#\${id}\`} className={active === id ? "active" : ""} onClick={(event) => { event.preventDefault(); jumpTo(id); }}>
                <span className="nav-index">0{index + 1}</span>{label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="sound-button" onClick={() => setSoundOn((value) => !value)} aria-label={soundOn ? "Turn sound off" : "Turn sound on"} title="Sound is optional">
              {soundOn ? <Volume2 size={17}/> : <VolumeX size={17}/>}
            </button>
            <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
          </div>
        </header>

        <main>
          <section id="hello" className="hero section-wrap">
            <div className="hero-copy">
              <p className="hand-note note-top">hey, you made it! <span>↙</span></p>
              <p className="eyebrow"><span className="live-dot"/> A DEVELOPER, A MAKER, A CURIOUS HUMAN</p>
              <h1>hello, i'm<br/><span className="name-highlight">fahad malik</span><Doodle className="hero-spark">✳</Doodle></h1>
              <p className="hero-description">i make things for the internet. sometimes useful, sometimes weird, usually a little bit of both.</p>
              <div className="hero-links">
                <button className="pill-button dark" onClick={() => jumpTo("story")}>get to know me <ArrowDown size={15}/></button>
                <a className="text-link" href="mailto:hellospideydev@gmail.com">or just say hello <ArrowUpRight size={15}/></a>
              </div>
            </div>
            <div className="hero-art" aria-label="Hand-drawn portrait illustration">
              <div className="art-paper">
                <div className="art-tape tape-one"/><div className="art-tape tape-two"/>
                <svg className="portrait-drawing" viewBox="0 0 390 440" role="img" aria-label="A playful hand-drawn character">
                  <path d="M85 190 Q48 110 115 67 Q195 17 267 73 Q337 124 297 213 L280 298 Q246 365 171 357 Q88 349 77 273Z" fill="#f2b98e" stroke="#292720" strokeWidth="5" strokeLinejoin="round"/>
                  <path d="M77 185 Q42 100 109 59 Q174 15 259 53 Q329 85 314 177 Q287 137 263 121 Q207 151 123 121 Q107 163 77 185Z" fill="#292720" stroke="#292720" strokeWidth="5" strokeLinejoin="round"/>
                  <path d="M122 218q20-16 39 0M220 218q20-16 39 0" fill="none" stroke="#292720" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M175 261q25 25 51 0" fill="none" stroke="#a84f42" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M166 239q13 8 24 0" fill="none" stroke="#d98d69" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M92 365q-20 31-17 62h241q-5-44-28-64-43 34-104 24-57-9-92-22Z" fill="#a8bd77" stroke="#292720" strokeWidth="5" strokeLinejoin="round"/>
                  <path d="M135 371l-22 54M256 371l22 54" stroke="#292720" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M65 157q-23 2-18 34M307 155q27-2 31 28" fill="none" stroke="#292720" strokeWidth="5" strokeLinecap="round"/>
                </svg>
                <span className="art-caption">a very accurate portrait<br/> (drawn by absolutely nobody)</span>
              </div>
              <Doodle className="art-star">✳</Doodle><Doodle className="art-flower">✿</Doodle>
              <span className="art-side-note">just here<br/>making stuff ↗</span>
            </div>
            <div className="hero-bottom-note"><span>SCROLL A LITTLE</span><span className="scribble-line"/></div>
          </section>

          <section id="doing" className="doing-section section-wrap">
            <SectionHeading number="01" eyebrow="SO, WHAT DO I ACTUALLY DO?">a bit of this,<br/><em>a bit of that.</em></SectionHeading>
            <div className="doing-grid">
              <article className="doing-item doing-main"><span className="doing-icon">✳</span><h3>i build software.</h3><p>Web experiences, tools, interfaces and the bits underneath them. I like understanding how things work, then making my own version.</p><span className="margin-note">the fun is in the details ↗</span></article>
              <article className="doing-item"><span className="doing-icon orange">⌘</span><h3>i experiment.</h3><p>Engines, little utilities, strange ideas and things that start with “what if…”</p></article>
              <article className="doing-item"><span className="doing-icon green">✎</span><h3>i design by making.</h3><p>I care about how software feels, not just whether it works. The tiny interactions count too.</p></article>
            </div>
          </section>

          <section id="toolbox" className="toolbox-section section-wrap">
            <div className="toolbox-top"><SectionHeading number="02" eyebrow="THE THINGS I REACH FOR">my little<br/><em>toolbox.</em></SectionHeading><p className="side-explainer">Not a badge collection. Just the tools that help me turn a thought into something real.</p></div>
            <div className="tool-list">
              {tools.map((tool, index) => <div className="tool-row" key={tool.name}><span className="tool-number">0{index + 1}</span><span className={\`tool-name \${tool.color}\`}>{tool.name}</span><span className="tool-note">{tool.note}</span><ArrowUpRight className="tool-arrow" size={18}/></div>)}
            </div>
            <p className="tool-footnote"><Doodle>✳</Doodle> The toolbox changes. That's kind of the point.</p>
          </section>

          <section id="story" className="story-section section-wrap">
            <SectionHeading number="03" eyebrow="A LITTLE BACKSTORY">how i got<br/><em>here.</em></SectionHeading>
            <div className="story-layout">
              <div className="story-stamp"><span>SELF-TAUGHT</span><strong>by<br/>curiosity</strong><span className="stamp-star">✳</span></div>
              <div className="story-copy">
                <p className="story-lead">i didn't really wait for someone to show me how to make things. i just started poking around.</p>
                <p>One thing led to another: a bit of code, a broken page, a late-night fix, and then a new idea. The internet became a place where I could learn something and immediately try it for myself.</p>
                <p>Over time, that curiosity turned into building websites, software, tools and experiments. I learned by making, breaking, looking things up and trying again.</p>
                <p>I'm still figuring plenty of things out. I hope I always am.</p>
                <span className="story-signature">— fahad <span>♡</span></span>
              </div>
            </div>
          </section>

          <section id="beliefs" className="beliefs-section section-wrap">
            <div className="beliefs-label"><span>04 / A FEW THINGS I BELIEVE</span><Doodle>✳</Doodle></div>
            <h2>don't fall prey<br/>to <span>flattery.</span><br/><em>build always.</em></h2>
            <div className="beliefs-bottom"><p>I'd rather make something, learn from it, and make it better than spend forever talking about what I might do.</p><span className="beliefs-underline">that's the whole thing. ↗</span></div>
          </section>

          <section id="inspired" className="inspired-section section-wrap">
            <SectionHeading number="05" eyebrow="STUFF THAT GETS MY BRAIN GOING">things that<br/><em>inspire me.</em></SectionHeading>
            <div className="inspiration-cloud">
              <span className="cloud-word cloud-one">the open web</span><span className="cloud-word cloud-two">curiosity</span>
              <span className="cloud-word cloud-three">old computers</span><span className="cloud-word cloud-four">independent makers</span>
              <span className="cloud-word cloud-five">good design</span><span className="cloud-word cloud-six">big ideas</span>
              <span className="cloud-word cloud-seven">beautifully weird things</span><span className="cloud-word cloud-eight">learning by doing</span>
              <Doodle className="cloud-star">✳</Doodle><Doodle className="cloud-spark">✦</Doodle>
            </div>
            <p className="inspired-caption">basically, anything that makes me stop and think, “wait… that's possible?”</p>
          </section>

          <section id="next" className="next-section section-wrap">
            <SectionHeading number="06" eyebrow="THERE'S MORE TO COME">what's next?<br/><em>good question.</em></SectionHeading>
            <div className="next-content">
              <div className="next-note"><span className="next-pin"/>CURRENTLY THINKING ABOUT</div>
              <p>Going deeper into software engineering. Making more ambitious tools. Understanding graphics, systems and the things that happen beneath the interface.</p>
              <p>I'd love to keep exploring game technology, creative software and ideas that don't fit neatly into a category.</p>
              <p className="next-last">No grand master plan. Just a lot of things I want to try.</p>
            </div>
            <Doodle className="next-doodle">↗</Doodle>
          </section>

          <section id="contact" className="contact-section section-wrap">
            <div className="contact-paper">
              <span className="contact-kicker">07 / BEFORE YOU GO</span>
              <Doodle className="contact-flower">✿</Doodle>
              <h2>got something<br/>on your <em>mind?</em></h2>
              <p>Ideas, questions, collaborations, or just a good conversation. My inbox is open.</p>
              <a className="email-link" href="mailto:hellospideydev@gmail.com">hellospideydev@gmail.com <ArrowUpRight size={20}/></a>
              <div className="social-links">
                <a href="https://github.com/spideythedev" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={13}/></a>
                <a href="https://linkedin.com/in/fahadmalik-tokyo/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a>
                <a href="mailto:hellospideydev@gmail.com"><Mail size={17}/> Email <ArrowUpRight size={13}/></a>
              </div>
              <span className="contact-side-note">don't be a stranger :)</span>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a className="footer-mark" href="#hello" onClick={(event) => { event.preventDefault(); jumpTo("hello"); }}>f<span>.</span>m</a>
          <span>made with curiosity, and probably too many tabs open.</span>
          <span>© 2026 fahad malik</span>
        </footer>
        <button className="back-top" onClick={() => jumpTo("hello")} aria-label="Back to top"><ArrowUpRight size={18}/></button>
      </div>
    </>
  );
}

export default App;