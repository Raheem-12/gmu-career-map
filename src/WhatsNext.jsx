const styles = `
  .hn-next {
    --hn-text: #e8edf4;
    --hn-secondary: #b6c5d4;
    --hn-muted: #94a8b9;
    --hn-accent: #a8d3c9;
    --hn-line: #ffffff20;
    width: min(1360px, 100%);
    margin-inline: auto;
    padding: 72px 56px 48px;
    color: var(--hn-text);
    font-family: var(--hl-font-body, "Segoe UI", sans-serif);
    line-height: 1.75;
  }

  .hn-next * { box-sizing: border-box; }
  .hn-next h1, .hn-next h2, .hn-next h3,
  .hn-next p, .hn-next figure { margin: 0; }

  .hn-next .hn-eyebrow {
    color: var(--hn-accent);
    font: 11px/1.7 var(--hl-font-mono, Consolas, monospace);
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .hn-next .hn-intro {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(240px, .7fr);
    align-items: end;
    gap: 64px;
    padding-bottom: 56px;
    border-bottom: 1px solid var(--hn-line);
  }

  .hn-next h1 {
    margin-top: 24px;
    max-width: 850px;
    font-size: clamp(44px, 5.2vw, 74px);
    font-weight: 450;
    line-height: 1.08;
    letter-spacing: -.055em;
  }

  .hn-next h1 em {
    color: var(--hn-accent);
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 400;
  }

  .hn-next .hn-lead {
    max-width: 64ch;
    margin-top: 28px;
    color: var(--hn-secondary);
    font-size: 17px;
    line-height: 1.85;
  }

  .hn-next .hn-direction {
    padding: 22px 0 0 24px;
    border-left: 1px solid #71988e66;
  }

  .hn-next .hn-direction p {
    margin-top: 12px;
    color: var(--hn-secondary);
    font-size: 15px;
  }

  .hn-next .hn-direction strong {
    display: block;
    color: var(--hn-text);
    font-weight: 500;
    font-size: 21px;
    line-height: 1.45;
  }

  .hn-next .hn-section {
    display: grid;
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
    gap: clamp(32px, 5vw, 76px);
    align-items: start;
    padding-block: 64px;
    border-bottom: 1px solid var(--hn-line);
  }

  .hn-next .hn-section-reverse {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
  }

  .hn-next .hn-section-reverse .hn-copy { order: 2; }
  .hn-next .hn-section-reverse .hn-preview { order: 1; }

  .hn-next h2 {
    margin-top: 19px;
    font-size: clamp(29px, 3vw, 40px);
    font-weight: 450;
    line-height: 1.18;
    letter-spacing: -.035em;
  }

  .hn-next .hn-copy > p:not(.hn-eyebrow) {
    margin-top: 21px;
    color: var(--hn-secondary);
    font-size: 16px;
    line-height: 1.85;
  }

  .hn-next .hn-status {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-top: 28px;
    padding-top: 15px;
    border-top: 1px solid var(--hn-line);
    color: #b9c8d4;
    font-size: 12px;
  }

  .hn-next .hn-status::before {
    content: "";
    width: 5px;
    height: 5px;
    flex-shrink: 0;
    background: #b4c9bd;
    border-radius: 50%;
  }

  .hn-next .hn-preview {
    min-width: 0;
    overflow: hidden;
    border: 1px solid #ffffff25;
    border-radius: 4px;
    background: #0c1622;
  }

  .hn-next .hn-preview-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 23px;
    border-bottom: 1px solid var(--hn-line);
    background: #101c29;
  }

  .hn-next .hn-preview-name {
    font: 12px/1.6 var(--hl-font-mono, Consolas, monospace);
    letter-spacing: .08em;
    color: #d6e5ec;
  }

  .hn-next .hn-preview-state {
    color: #c5b995;
    font: 10px/1.6 var(--hl-font-mono, Consolas, monospace);
    letter-spacing: .06em;
  }

  .hn-next .hn-workflow {
    list-style: none;
    margin: 0;
    padding: 25px 23px 8px;
  }

  .hn-next .hn-workflow > li {
    position: relative;
    display: grid;
    grid-template-columns: 25px minmax(0, 1fr);
    gap: 15px;
    padding-bottom: 27px;
  }

  .hn-next .hn-workflow > li:not(:last-child)::before {
    content: "";
    position: absolute;
    left: 11px;
    top: 28px;
    bottom: 3px;
    width: 1px;
    background: #3d605b;
  }

  .hn-next .hn-step-number {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    margin-top: 2px;
    border: 1px solid #52766d;
    border-radius: 50%;
    color: var(--hn-accent);
    font: 10px var(--hl-font-mono, Consolas, monospace);
  }

  .hn-next .hn-step-label {
    margin-bottom: 9px;
    color: var(--hn-muted);
    font-size: 12px;
    letter-spacing: .02em;
  }

  .hn-next .hn-question {
    color: #e1eaf1;
    font-size: 17px;
    line-height: 1.65;
  }

  .hn-next .hn-material {
    padding: 16px 18px;
    border: 1px solid #2e4352;
    border-left: 2px solid #7dafa4;
    background: #111f2c;
  }

  .hn-next .hn-material-heading {
    color: #b8d6cd;
    font: 11px/1.6 var(--hl-font-mono, Consolas, monospace);
  }

  .hn-next .hn-material p {
    margin-top: 9px;
    color: #becdd8;
    font-size: 14px;
    line-height: 1.8;
  }

  .hn-next .hn-answer {
    color: #c4d3de;
    font-size: 15px;
    line-height: 1.8;
  }

  .hn-next .hn-answer strong {
    color: #e4eee9;
    font-weight: 500;
  }

  .hn-next .hn-caption {
    padding: 15px 23px 18px;
    border-top: 1px solid var(--hn-line);
    color: var(--hn-muted);
    font-size: 11px;
    line-height: 1.75;
  }

  .hn-next .hn-course-path {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 18px;
    align-items: center;
    padding: 28px 25px;
  }

  .hn-next .hn-course-tag {
    color: var(--hn-muted);
    font-size: 11px;
  }

  .hn-next .hn-course-code {
    margin-top: 7px;
    color: #e5edf4;
    font: 25px/1.3 var(--hl-font-mono, Consolas, monospace);
    letter-spacing: -.035em;
  }

  .hn-next .hn-course-title {
    margin-top: 9px;
    color: var(--hn-secondary);
    font-size: 13px;
    line-height: 1.6;
  }

  .hn-next .hn-path-arrow {
    width: 43px;
    color: #85b7aa;
  }

  .hn-next .hn-review-heading {
    padding: 0 25px 12px;
    color: var(--hn-muted);
    font: 10px/1.7 var(--hl-font-mono, Consolas, monospace);
    letter-spacing: .08em;
  }

  .hn-next .hn-review-list {
    margin: 0 25px 25px;
    border-top: 1px solid var(--hn-line);
  }

  .hn-next .hn-review-item {
    border-bottom: 1px solid var(--hn-line);
    transition: background-color 180ms ease;
  }

  .hn-next .hn-review-item:hover,
  .hn-next .hn-review-item[open] {
    background: #ffffff04;
  }

  .hn-next .hn-review-item summary {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 15px 10px;
    cursor: pointer;
    color: #d1dfe8;
    font-size: 14px;
  }

  .hn-next .hn-review-item summary::-webkit-details-marker {
    display: none;
  }

  .hn-next .hn-review-item summary::after {
    content: "+";
    color: var(--hn-accent);
    font: 18px var(--hl-font-mono, Consolas, monospace);
  }

  .hn-next .hn-review-item[open] summary::after { content: "−"; }

  .hn-next .hn-review-item summary:focus-visible {
    outline: 2px solid var(--hn-accent);
    outline-offset: 3px;
  }

  .hn-next .hn-review-item p {
    padding: 0 10px 17px;
    color: var(--hn-secondary);
    font-size: 14px;
    line-height: 1.8;
  }

  .hn-next .hn-outro {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    padding-top: 29px;
    color: var(--hn-muted);
    font-size: 12px;
  }

  .hn-next .hn-outro p { max-width: 64ch; }
  .hn-next .hn-outro span { white-space: nowrap; }

  @media (max-width: 1050px) {
    .hn-next { padding: 52px 32px 36px; }
    .hn-next .hn-intro { gap: 35px; }
    .hn-next .hn-section { gap: 32px; }
  }

  @media (max-width: 800px) {
    .hn-next .hn-intro,
    .hn-next .hn-section,
    .hn-next .hn-section-reverse {
      grid-template-columns: minmax(0, 1fr);
    }

    .hn-next .hn-direction { max-width: 550px; }
    .hn-next .hn-section { padding-block: 44px; }
    .hn-next .hn-section-reverse .hn-copy,
    .hn-next .hn-section-reverse .hn-preview { order: initial; }
    .hn-next .hn-copy { max-width: 68ch; }
  }

  @media (max-width: 480px) {
    .hn-next { padding: 36px 20px 28px; }
    .hn-next h1 { font-size: 43px; }
    .hn-next .hn-lead { font-size: 16px; }
    .hn-next .hn-intro { padding-bottom: 36px; }
    .hn-next .hn-preview-header,
    .hn-next .hn-caption { padding-inline: 16px; }
    .hn-next .hn-workflow { padding-inline: 15px; }
    .hn-next .hn-workflow > li { gap: 10px; }
    .hn-next .hn-material { padding: 13px; }
    .hn-next .hn-course-path { padding: 23px 16px; gap: 10px; }
    .hn-next .hn-path-arrow { width: 24px; }
    .hn-next .hn-course-code { font-size: 22px; }
    .hn-next .hn-review-heading { padding-inline: 16px; }
    .hn-next .hn-review-list { margin-inline: 16px; }
    .hn-next .hn-outro { flex-direction: column; gap: 12px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .hn-next *, .hn-next *::before, .hn-next *::after {
      transition: none !important;
    }
  }
`;

function QuasarPreview() {
  return (
    <figure className="hn-preview" aria-label="Illustrative Quasar workflow">
      <div className="hn-preview-header">
        <span className="hn-preview-name">QUASAR / STUDY WORKSPACE</span>
        <span className="hn-preview-state">INTERFACE CONCEPT</span>
      </div>

      <ol className="hn-workflow">
        <li>
          <span className="hn-step-number" aria-hidden="true">01</span>
          <div>
            <p className="hn-step-label">Student question</p>
            <p className="hn-question">
              Why does finding an element in a singly linked list take O(n)?
            </p>
          </div>
        </li>

        <li>
          <span className="hn-step-number" aria-hidden="true">02</span>
          <div>
            <p className="hn-step-label">Retrieved course material · example</p>
            <div className="hn-material">
              <div className="hn-material-heading">
                CS310 / LINKED LISTS
              </div>
              <p>
                Each node contains data and a link to the next node.
                Searching follows these links from the head until a match
                is found or the list ends.
              </p>
            </div>
          </div>
        </li>

        <li>
          <span className="hn-step-number" aria-hidden="true">03</span>
          <div>
            <p className="hn-step-label">Grounded explanation · example</p>
            <p className="hn-answer">
              You cannot jump directly to an arbitrary node by its position.
              You follow the links one at a time. In the worst case, the
              search visits all <strong>n nodes</strong>, so the work grows
              linearly: <strong>O(n)</strong>.
            </p>
          </div>
        </li>
      </ol>

      <figcaption className="hn-caption">
        Illustrative content, not a live response or a quotation from a
        retrieved source. The local RAG prototype is not connected to
        this page or integrated into the public website.
      </figcaption>
    </figure>
  );
}

function PrerequisitePreview() {
  return (
    <figure
      className="hn-preview"
      aria-label="Planned concept connections from CS367 to CS465"
    >
      <div className="hn-preview-header">
        <span className="hn-preview-name">KNOWLEDGE CONNECTIONS</span>
        <span className="hn-preview-state">PLANNED FEATURE</span>
      </div>

      <div className="hn-course-path">
        <div>
          <p className="hn-course-tag">Build on earlier learning</p>
          <p className="hn-course-code">CS367</p>
          <p className="hn-course-title">
            Computer Systems and Programming
          </p>
        </div>

        <svg
          className="hn-path-arrow"
          viewBox="0 0 44 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 12h40m-7-7 7 7-7 7"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div>
          <p className="hn-course-tag">Prepare for deeper study</p>
          <p className="hn-course-code">CS465</p>
          <p className="hn-course-title">
            Computer Systems Architecture
          </p>
        </div>
      </div>

      <p className="hn-review-heading">
        EXAMPLE REVIEW CONNECTIONS / EXPAND TO EXPLORE
      </p>

      <div className="hn-review-list">
        <details className="hn-review-item">
          <summary>Data representation</summary>
          <p>
            Revisit binary values, signed integers, and bitwise operations.
            These ideas provide context for understanding how hardware
            represents and operates on data.
          </p>
        </details>

        <details className="hn-review-item">
          <summary>Instructions and execution</summary>
          <p>
            Revisit registers, machine instructions, and how a program
            executes. Use that foundation when studying processor
            organization and instruction execution in greater detail.
          </p>
        </details>

        <details className="hn-review-item">
          <summary>Memory and locality</summary>
          <p>
            Revisit addresses, memory access, and spatial and temporal
            locality. Connect those ideas to cache behavior and the
            performance of the memory hierarchy.
          </p>
        </details>
      </div>

      <figcaption className="hn-caption">
        Illustrative study connections for a planned feature—not an
        implemented recommendation engine or an official prerequisite
        determination. The expandable notes demonstrate the proposed
        reading experience.
      </figcaption>
    </figure>
  );
}

export default function WhatsNext() {
  return (
    <article className="hn-next" aria-labelledby="hn-next-title">
      <style>{styles}</style>

      <header className="hn-intro">
        <div>
          <p className="hn-eyebrow">Hyperlane / Future Direction</p>

          <h1 id="hn-next-title">
            What's Next
            <br />
            for <em>Hyperlane</em>
          </h1>

          <p className="hn-lead">
            Hyperlane started as a way to connect computer science coursework
            to real-world careers. The next step is helping students understand
            how the knowledge they gain builds from one course to the next.
          </p>
        </div>

        <aside className="hn-direction" aria-label="Future direction overview">
          <span className="hn-eyebrow">The next connection</span>
          <p>
            <strong>From finding your direction</strong>
            to understanding the knowledge that gets you there.
          </p>
          <p>
            Two directions under exploration. Both are future additions
            to the public Hyperlane experience.
          </p>
        </aside>
      </header>

      <section className="hn-section" aria-labelledby="hn-quasar-title">
        <div className="hn-copy">
          <p className="hn-eyebrow">01 / Planned Integration</p>

          <h2 id="hn-quasar-title">
            Quasar AI — Your Course Study Assistant
          </h2>

          <p>
            Quasar AI is a locally tested retrieval-augmented generation
            (RAG) prototype. It currently explores CS310 linked-list
            concepts using retrieved educational material.
          </p>

          <p>
            The planned integration will bring textbook-grounded
            explanations and career connections into Hyperlane,
            eventually supporting more GMU CS courses.
          </p>

          <div className="hn-status">
            Locally tested prototype · Public integration planned
          </div>
        </div>

        <QuasarPreview />
      </section>

      <section
        className="hn-section hn-section-reverse"
        aria-labelledby="hn-knowledge-title"
      >
        <div className="hn-copy">
          <p className="hn-eyebrow">02 / Planned Feature</p>

          <h2 id="hn-knowledge-title">
            Connecting Prerequisite Knowledge
          </h2>

          <p>
            Explore how concepts from earlier courses connect to
            more advanced coursework.
          </p>

          <p>
            For example, students taking CS483 could identify relevant
            concepts from CS310, understand why those concepts matter,
            and discover what to review.
          </p>

          <p>
            The accompanying CS367 → CS465 concept preview illustrates
            another possible connection: revisiting systems fundamentals
            before studying computer architecture in greater depth.
          </p>

          <div className="hn-status">
            Planned concept · Not implemented
          </div>
        </div>

        <PrerequisitePreview />
      </section>

      <footer className="hn-outro">
        <p>
          A look at where Hyperlane could go next. These previews describe
          future direction, not features currently available on the public site.
        </p>
        <span>HYPERLANE / FUTURE DIRECTION</span>
      </footer>
    </article>
  );
}