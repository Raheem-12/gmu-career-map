import { useEffect, useRef, useState } from 'react';
import './home.css';

const WAYPOINTS = [
  { title: 'Course concepts', text: 'Start with what you are learning. Find the ideas behind the course code.', x: 22, y: 67 },
  { title: 'Real technologies', text: 'Follow the connections from classroom concepts to the systems people build.', x: 52, y: 38 },
  { title: 'Career direction', text: 'See how your learning connects to work you might want to do.', x: 82, y: 23 },
];
const STEPS = [
  ['Choose a Career', 'Select a technical field that interests you.'],
  ['Explore the Connections', 'Discover relevant GMU CS courses and understand why they matter.'],
  ['Build Your Direction', 'Identify the concepts and skills that connect academic learning to industry.'],
];
function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

export default function HomePage({ active, onExploreMap, onExploreStrategy }) {
  const root = useRef(null);
  const how = useRef(null);
  const [waypoint, setWaypoint] = useState(0);

  useEffect(() => {
    if (!active || !root.current || !('IntersectionObserver' in window)) return;
    const elements = root.current.querySelectorAll('[data-home-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { root: root.current.closest('main'), threshold: 0.08 });
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('will-reveal')); };
  }, [active]);

  const discover = () => {
    how.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    how.current?.focus({ preventScroll: true });
  };

  return (
    <div className="hl-home" ref={root} data-active={active}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-atmosphere" aria-hidden="true" />
        <div className="home-hero-copy">
          <p className="home-kicker">HYPERLANE <span>/</span> ACADEMIC EXPLORATION</p>
          <h1 id="home-title">Your Degree.<br />A Universe of<br /><em>Possibilities.</em></h1>
          <p className="home-intro">Explore how George Mason University computer science courses connect to real-world careers, technologies, and the skills that shape your future.</p>
          <div className="home-actions">
            <button className="home-primary" onClick={onExploreMap}>Explore Career Map <Arrow /></button>
            <button className="home-text-button" onClick={discover}>Discover How It Works <span aria-hidden="true">↓</span></button>
          </div>
        </div>
        <div className="home-chart" aria-label="Explore the learning journey">
          <div className="home-chart-heading"><span>01 — FIND A CONNECTION</span><span>CS / BS</span></div>
          <div className="home-chart-field">
            <svg viewBox="0 0 500 360" preserveAspectRatio="none" aria-hidden="true">
              <ellipse className="home-orbit" cx="250" cy="180" rx="220" ry="100" transform="rotate(-24 250 180)" />
              <path className="home-route" d="M110 241.2 260 136.8 410 82.8" />
              <path className="home-chart-crosshair" d="M250 0v360M0 180h500" />
            </svg>
            {WAYPOINTS.map((point, index) => <button key={point.title} className="home-waypoint" style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-pressed={waypoint === index} aria-label={`Explore ${point.title.toLowerCase()}`} onClick={() => setWaypoint(index)} onFocus={() => setWaypoint(index)} onMouseEnter={() => setWaypoint(index)}><span className="home-star" aria-hidden="true" /><span className="home-waypoint-label">0{index + 1}<br />{point.title}</span></button>)}
          </div>
          <div className="home-chart-caption" aria-live="polite"><span className="home-coordinate">0{waypoint + 1} / 03</span><p>{WAYPOINTS[waypoint].text}</p></div>
          <p className="home-chart-note">An introduction to the journey. Explore the map for course relationships.</p>
        </div>
        <div className="home-hero-foot"><span>ONE DEGREE. MANY POSSIBLE DIRECTIONS.</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
      </section>

      <section className="home-destinations home-wrap" aria-labelledby="home-destinations-title" data-home-reveal>
        <div className="home-section-heading"><p className="home-kicker">EXPLORATION INDEX</p><h2 id="home-destinations-title">Make the connections.<br /><span>Then make them yours.</span></h2></div>
        <div className="home-feature-layout">
          <article className="home-feature home-feature-map">
            <span className="home-feature-number">01 / EXPLORE</span>
            <div className="home-feature-sky" aria-hidden="true"><svg viewBox="0 0 500 160"><path d="m20 120 100-60 130 40 110-75 115 30" />{[[20,120],[120,60],[250,100],[360,25],[475,55]].map(([x,y])=><circle key={x} cx={x} cy={y} r="3" />)}</svg></div>
            <h3>Career Map</h3><p>Discover how your CS courses connect to software engineering, cloud infrastructure, cybersecurity, and IT systems.</p>
            <button className="home-link" onClick={onExploreMap}>Explore Galaxy <Arrow /></button>
          </article>
          <div className="home-feature-stack">
            <article className="home-feature home-feature-learning"><span className="home-feature-number">02 / DEVELOP</span><h3>AI-Era Learning Strategy</h3><p>Learn how to build technical understanding, debug systematically, and develop practical skills in an AI-driven world.</p><button className="home-link" onClick={onExploreStrategy}>Explore Learning Strategy <Arrow /></button></article>
            <article className="home-feature home-feature-quasar"><div className="home-quasar-heading"><span className="home-feature-number">03 / ON THE HORIZON</span><span className="home-soon">COMING SOON</span></div><h3>Quasar AI Assistant</h3><p>An upcoming AI-powered study companion designed to help you understand course concepts and connect them to real-world applications.</p></article>
          </div>
        </div>
      </section>

      <section className="home-how home-wrap" aria-labelledby="home-how-title" ref={how} tabIndex={-1} data-home-reveal>
        <div className="home-how-intro"><p className="home-kicker">HOW HYPERLANE WORKS</p><h2 id="home-how-title">A little context.<br />A clearer direction.</h2><p>You don’t need to have your future figured out.<br />Start with a connection.</p></div>
        <ol className="home-steps">{STEPS.map(([title, text], index) => <li key={title}><span className="home-step-index">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>
      <section className="home-closing home-wrap" aria-labelledby="home-closing-title" data-home-reveal><p className="home-kicker">YOUR EXPLORATION STARTS HERE</p><h2 id="home-closing-title">Find Your <em>Trajectory.</em></h2><div><p>Your next course could be the beginning of something bigger.</p><button className="home-primary" onClick={onExploreMap}>Launch Career Map <Arrow /></button></div></section>
      <footer className="home-footer home-wrap"><div><strong>HYPERLANE <span>/</span></strong><p>George Mason University CS Career Map</p><p className="home-disclaimer">An independent student project. Not affiliated with or endorsed by George Mason University.</p></div><div><span>V1.0</span><p>Quasar AI Assistant — Coming Soon</p></div></footer>
    </div>
  );
}
