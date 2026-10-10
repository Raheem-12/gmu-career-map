import { useRef, useState } from "react";
import "./ai-learning.css";

const FOUNDATIONS = [
  "Variables and types",
  "Conditions",
  "Loops",
  "Functions",
  "Parameters and return values",
  "Arrays / lists",
  "Dictionaries / maps",
  "Classes / objects",
  "Modules / imports",
  "Exceptions",
  "Files",
];
const READING_QUESTIONS = [
  "What enters this function?",
  "What does it return?",
  "What variables change?",
  "What other functions does it call?",
  "Where does the data come from?",
  "Where does the data go?",
  "What assumptions does the code make?",
  "What could fail?",
];
const FLOW = [
  ["User action", "A student submits a question."],
  ["Frontend", "Collect the input and show a loading state."],
  ["HTTP request", "Send a method, URL, headers, and request body."],
  ["API", "Check the endpoint’s contract and validate the input."],
  ["Backend", "Coordinate the work on the server."],
  ["Business logic", "Apply the rules needed to answer this request."],
  [
    "Database / external service",
    "Read or write information, if the operation needs it.",
  ],
  ["Response", "Return a status code and a defined response body."],
  [
    "Frontend",
    "Read the response and display the result or an actionable error.",
  ],
];
const ARCHITECTURE = [
  [
    "Frontend",
    "Lets people interact with the product. It exchanges requests and responses with APIs.",
  ],
  [
    "Backend",
    "Runs server-side rules and coordinates data access and external services.",
  ],
  [
    "APIs",
    "Define how components communicate: inputs, outputs, endpoints, and errors.",
  ],
  [
    "Databases",
    "Keep information beyond a single request or process. The backend reads and writes it.",
  ],
  [
    "Authentication",
    "Establishes who a user is. Authorization separately determines what they may do.",
  ],
  [
    "External services",
    "Provide capabilities your application calls through another system’s interface.",
  ],
  [
    "Environment variables",
    "Supply configuration that differs between environments. Keep secrets server-side.",
  ],
  [
    "Containers",
    "Package an application and its runtime dependencies so it can run consistently.",
  ],
  [
    "Cloud infrastructure",
    "Provides the compute, networking, and storage that host the application.",
  ],
  [
    "Logging",
    "Records events and failures so you can investigate what happened across components.",
  ],
  ["CI/CD", "Automates repeatable checks, builds, and delivery of changes."],
];
const DEBUG_STEPS = [
  [
    "Reproduce",
    "Write the smallest reliable sequence that triggers the failure.",
  ],
  [
    "Identify layer",
    "Find the last confirmed success and the first observed failure.",
  ],
  [
    "Gather evidence",
    "Inspect the request, status code, logs, inputs, and outputs. Remove secrets before sharing.",
  ],
  [
    "Narrow failure",
    "Reduce the input or isolate one dependency. Change one variable at a time.",
  ],
  [
    "Form hypothesis",
    "State what you think is failing, why, and what observation would contradict it.",
  ],
  [
    "Test",
    "Run a small check that distinguishes your hypothesis from another explanation.",
  ],
  [
    "Fix",
    "Make the smallest justified change and explain why it addresses the cause.",
  ],
  [
    "Verify",
    "Repeat the original steps, check nearby behavior, and add a useful regression test.",
  ],
];
const LAYERS = [
  ["Browser", "Console messages and the action that triggered the error."],
  [
    "Frontend",
    "Event handlers, state, and how the request body is constructed.",
  ],
  [
    "Network",
    "Destination, method, payload, status, timing, and connectivity.",
  ],
  ["Backend", "Route handling, validation, request IDs, and the traceback."],
  ["Database", "Connection, query, permissions, and expected records."],
  [
    "External API",
    "Credentials, response body, limits, and service availability.",
  ],
  [
    "Infrastructure",
    "Process health, ports, networking, configuration, and deployment logs.",
  ],
];
const RULES = [
  "Attempt the problem before prompting AI.",
  "Don’t keep important AI-generated code you cannot roughly explain.",
  "Ask why something is failing before immediately requesting replacement code.",
  "Debug by layer.",
  "Give AI evidence: logs, status codes, inputs, outputs, and attempted fixes.",
  "Form your own hypothesis.",
  "Ask for hints and explanations when learning instead of always requesting complete solutions.",
  "Modify AI-generated code yourself.",
  "Learn to use official documentation.",
  "Build real projects and intentionally debug them in a safe development environment.",
];
const CAREER_FOCUS = {
  software: [
    "Code reading",
    "APIs",
    "Application architecture",
    "Testing",
    "Debugging",
    "Databases",
  ],
  cloud: [
    "Application architecture",
    "Linux",
    "Networking",
    "Containers",
    "Deployment",
    "Automation",
    "Logs",
    "Tracing failures between applications and infrastructure",
  ],
  cyber: [
    "Program behavior",
    "Networking",
    "Operating systems",
    "Inputs",
    "Trust boundaries",
    "Vulnerabilities",
    "Code reading",
  ],
  systems: [
    "Operating systems",
    "Networking",
    "Configuration",
    "Scripting",
    "Service logs",
    "Tracing failures across systems",
  ],
};
const DEBUGGING_TEMPLATE = `Expected behavior:
What should happen?

Actual behavior:
What happened instead?

Layer:
Frontend / Network / Backend / Database / External API / Infrastructure

Evidence:
Errors, logs, status codes, console output, etc. Remove secrets and personal data.

What I already tested:
What have I ruled out?

My hypothesis:
What do I currently think is wrong? What evidence would contradict it?

What I need help with:
What specifically do I want AI to help me understand?`;

function Stage({ number, title, children }) {
  return (
    <section className="ai-strategy-stage" id={`strategy-${number}`}>
      <div className="ai-strategy-stage-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Flow({ items, label }) {
  return (
    <ol className="ai-strategy-flow" aria-label={label}>
      {items.map(([title, explanation], index) => (
        <li key={`${title}-${index}`}>
          <span className="ai-strategy-step-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{title}</h3>
            <p>{explanation}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function CourseLearningTip({ course, onOpenStrategy }) {
  if (typeof course?.aiLearningTip !== "string" || !course.aiLearningTip.trim())
    return null;
  return (
    <section className="ai-strategy-course-tip">
      <h3>Apply the AI-Era Strategy to {course.code}</h3>
      <p>{course.aiLearningTip}</p>
      <button type="button" onClick={onOpenStrategy}>
        Open AI-Era Learning Strategy
      </button>
    </section>
  );
}
export default function AiLearningStrategy({ careers }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const templateRef = useRef(null);
  async function copyTemplate() {
    setCopying(true);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(DEBUGGING_TEMPLATE);
      setCopyStatus("Template copied.");
    } catch {
      templateRef.current?.focus();
      templateRef.current?.select();
      setCopyStatus(
        "Automatic copy is unavailable. The template is selected; press Ctrl+C or Command+C to copy.",
      );
    } finally {
      setCopying(false);
    }
  }
  return (
    <div className="ai-strategy-page">
      <header className="ai-strategy-hero">
        <p className="ai-strategy-eyebrow">Hyperlane / Engineering readiness</p>
        <h1>AI-Era Learning Strategy</h1>
        <p className="ai-strategy-lead">
          Use AI to extend your ability. Build the understanding to stay in
          control.
        </p>
        <blockquote>
          You don’t need to write everything from memory. You should understand
          the system well enough to design it, read the code, trace what it’s
          doing, debug it, modify it, and tell AI precisely where you need help.
        </blockquote>
        <p>
          AI can make a knowledgeable developer significantly more productive.
          Your responsibility is to evaluate, debug, maintain, and modify what
          it produces. Develop that understanding alongside your use of AI.
        </p>
      </header>
      <nav className="ai-strategy-jump" aria-label="Learning strategy sections">
        {[
          "Programming fluency",
          "Read code",
          "Trace data",
          "Architecture",
          "Debug systematically",
          "Hypotheses",
          "AI coding rules",
        ].map((label, i) => (
          <a
            key={label}
            href={`#strategy-${i + 1}`}
            onClick={(event) => {
              event.preventDefault();
              document
                .getElementById(`strategy-${i + 1}`)
                ?.scrollIntoView({ behavior: "auto", block: "start" });
            }}
          >
            {String(i + 1).padStart(2, "0")} / {label}
          </a>
        ))}
      </nav>
      <Stage number={1} title="Programming fluency">
        <p>
          Learn what these ideas do and how they interact. Syntax is something
          you can look up; the behavior is something you should be able to
          explain.
        </p>
        <ul className="ai-strategy-chips">
          {FOUNDATIONS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="ai-strategy-callout">
          <h3>Understand the idea before the spelling</h3>
          <p>
            Forgetting whether Python uses <code>.append()</code> is not a major
            problem. Not understanding what a list is, why it is used, or how
            data flows through a loop is a gap to work on.
          </p>
          <p>
            Practice: explain a short function in plain language, predict its
            output, then change one input and check your prediction.
          </p>
        </div>
      </Stage>
      <Stage number={2} title="Learn to read code">
        <p>
          When AI generates part of an application, reading unfamiliar code
          becomes essential. Trace a small function before accepting or changing
          it.
        </p>
        <ul className="ai-strategy-question-grid">
          {READING_QUESTIONS.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
        <p>
          Practice: annotate the inputs, transformations, side effects, and
          return value. Ask AI to explain a specific line only after you have
          made your own prediction.
        </p>
      </Stage>
      <Stage number={3} title="Learn to trace data">
        <p>
          Follow a single action through its boundaries. At each transition,
          identify what is passed, what receives it, and what could fail.
        </p>
        <Flow
          items={FLOW}
          label="Example application request and response flow"
        />
        <p className="ai-strategy-note">
          This is a general architecture example. Not every application uses a
          database or external service, and these components are not being added
          to Hyperlane by this page.
        </p>
      </Stage>
      <Stage number={4} title="Understand how applications fit together">
        <p>
          You do not need to master every component immediately. Learn why each
          exists and what it communicates with.
        </p>
        <dl className="ai-strategy-architecture">
          {ARCHITECTURE.map(([title, explanation]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{explanation}</dd>
            </div>
          ))}
        </dl>
      </Stage>
      <Stage number={5} title="Debug systematically">
        <p>
          Move from “something is broken” to a specific, testable explanation. A
          status code is a clue, not a diagnosis.
        </p>
        <Flow items={DEBUG_STEPS} label="Systematic debugging process" />
        <h3>Locate the failure by layer</h3>
        <Flow items={LAYERS} label="Debugging investigation layers" />
        <p className="ai-strategy-note">
          These are investigation boundaries, not a mandatory request sequence.
          Database and external API calls may be alternatives; infrastructure
          supports the whole application.
        </p>
        <div className="ai-strategy-comparison">
          <article>
            <span className="ai-strategy-eyebrow">Weak AI usage</span>
            <h3>An error without an investigation</h3>
            <blockquote>“Here’s the error. Fix it.”</blockquote>
            <p>
              This leaves AI to guess the system, the inputs, and what you
              already ruled out.
            </p>
          </article>
          <article>
            <span className="ai-strategy-eyebrow">
              Strong AI-assisted debugging
            </span>
            <h3>Evidence and a testable hypothesis</h3>
            <blockquote>
              “I’m getting a 500 error from POST /api/ask.
              <br />
              <br />
              The frontend successfully sends the request. The backend receives
              it. Logging shows the failure occurs when retrieve() executes.
              <br />
              <br />I think the problem is between the backend and vector
              database. Here is the traceback. Help me test that hypothesis.”
            </blockquote>
            <p>
              This developer is using AI too. They are practicing how to isolate
              failures and reason about the system.
            </p>
          </article>
        </div>
        <p className="ai-strategy-note">
          The retrieval example describes a hypothetical future system. It does
          not indicate that Hyperlane has a working RAG pipeline.
        </p>
      </Stage>
      <Stage number={6} title="Form technical hypotheses">
        <blockquote>“I think X is failing because Y.”</blockquote>
        <p>
          Then name a check that could support or contradict your explanation.
          Being wrong is useful when the result narrows the search.
        </p>
        <div className="ai-strategy-callout">
          <h3>Example: a backend cannot be reached</h3>
          <p>
            <strong>Hypothesis:</strong> the frontend is sending the request to
            the wrong port.
          </p>
          <p>
            <strong>Evidence to gather:</strong> compare the actual request URL
            in the browser’s Network panel with the backend’s listening address.
          </p>
          <p>
            <strong>Test:</strong> call the backend’s known health endpoint
            directly. If that succeeds but the frontend request targets a
            different port, check the client configuration. If the addresses
            match, investigate the next explanation rather than repeatedly
            changing the port.
          </p>
        </div>
      </Stage>
      <Stage number={7} title="Rules for coding with AI">
        <ol className="ai-strategy-rules">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </Stage>
      <section className="ai-strategy-stage">
        <div className="ai-strategy-template-header">
          <h2>Your debugging assistance template</h2>
          <button type="button" onClick={copyTemplate} disabled={copying}>
            {copying ? "Copying…" : "Copy template"}
          </button>
        </div>
        <p>
          Investigate first. Fill in what you know, say what remains uncertain,
          and ask for the next useful test.
        </p>
        <label className="ai-strategy-eyebrow" htmlFor="ai-debugging-template">
          Copyable debugging template
        </label>
        <textarea
          id="ai-debugging-template"
          ref={templateRef}
          readOnly
          value={DEBUGGING_TEMPLATE}
          rows={23}
          spellCheck={false}
        />
        <p role="status" aria-live="polite">
          {copyStatus}
        </p>
      </section>
      <section className="ai-strategy-stage">
        <h2>Adapt the strategy to your destination</h2>
        <p>The reasoning stays the same. The systems you investigate change.</p>
        <div className="ai-strategy-careers">
          {Object.values(careers)
            .filter((career) => CAREER_FOCUS[career.id])
            .map((career) => (
              <article key={career.id}>
                <h3>{career.name}</h3>
                <ul>
                  {CAREER_FOCUS[career.id].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {career.status === "research-pending" && (
                  <p className="ai-strategy-note">
                    General skill focus only. This destination’s course registry
                    remains pending research.
                  </p>
                )}
              </article>
            ))}
        </div>
      </section>
      <footer className="ai-strategy-finish">
        <p className="ai-strategy-eyebrow">
          From course knowledge to engineering ability
        </p>
        <p>
          Course concepts → what they mean → real technologies → workplace
          scenarios → projects → career relevance → how to actually develop the
          skill.
        </p>
        <p>
          Choose one small feature. Explain it, trace it, change it, and verify
          it. Then use AI to challenge your reasoning.
        </p>
      </footer>
    </div>
  );
}
