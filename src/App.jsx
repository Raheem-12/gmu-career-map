import AiLearningStrategy, { CourseLearningTip } from "./features/ai-learning/AiLearningStrategy.jsx";
import {

  useCallback,

  useEffect,

  useMemo,

  useRef,

  useState,

} from "react";



import {

  Background,

  Controls,

  Handle,

  MiniMap,

  Position,

  ReactFlow,

  ReactFlowProvider,

  useNodesInitialized,

  useReactFlow,

} from "@xyflow/react";



import "@xyflow/react/dist/style.css";



/*

 * HYPERLANE V1

 * George Mason University — Computer Science, BS

 *

 * One academic scope, multiple career destinations.

 *

 * Existing Software Engineering, Cloud & DevOps, and

 * Cybersecurity registries are preserved, with CS483 added

 * only to Software Engineering.

 *

 * IT & Systems is an infrastructure career destination.

 * Its course registry remains empty pending source review.

 *

 * SWE437 remains part of the supplied CS-BS career mapping.

 * Academic scope is not determined solely by course prefix.

 *

 * Hyperlanes are conceptual learning connections, not a

 * complete or official prerequisite graph.

 */



/* ============================================================

   CAREER REGISTRIES

   ============================================================ */



const CAREERS = {

  software: {

    id: "software",

    short: "SWE",

    name: "Software Engineering",

    status: "available",

    description:

      "Turn requirements into reliable software that a team can build, test, deploy, and maintain.",

    launchpad:

      "Software engineering is broader than writing code. The strongest launchpad combines programming fundamentals, data structures, systems knowledge, team-based software engineering, testing, and software architecture.",

    courses: [

      "CS112",

      "CS211",

      "CS310",

      "CS367",

      "CS321",

      "SWE437",

      "CS475",

      "CS483",

    ],

  },



  cloud: {

    id: "cloud",

    short: "CLOUD",

    name: "Cloud & DevOps",

    status: "available",

    description:

      "Understand the systems beneath the cloud, then design and operate dependable services.",

    launchpad:

      "Cloud platforms abstract infrastructure, but engineers still need to understand what is underneath. Programming, operating systems, networking, distributed systems, and software deployment form the launchpad for cloud and DevOps work.",

    courses: [

      "CS112",

      "CS211",

      "CS310",

      "CS367",

      "CS455",

      "CS471",

      "CS475",

    ],

  },



  cyber: {

    id: "cyber",

    short: "CYBER",

    name: "Cybersecurity",

    status: "available",

    description:

      "Learn to identify, explain, and reduce weaknesses in applications and computer systems.",

    launchpad:

      "Security becomes easier to understand when you first understand the systems being protected. Programming, systems, secure development, networking, and operating-system concepts provide a practical launchpad for security engineering.",

    courses: [

      "CS112",

      "CS211",

      "CS310",

      "CS367",

      "CS468",

      "CS471",

    ],

  },



  systems: {

    id: "systems",

    short: "SYSTEMS",

    name: "IT & Systems",

    status: "research-pending",

    description:

      "Explore a career destination in systems administration, systems engineering, enterprise infrastructure, and technical operations from the GMU Computer Science BS.",

    launchpad: null,

    courses: [],

    research: {

      summary:

        "Course recommendations for this destination are awaiting source review. No course equivalencies or recommendations have been assumed.",

      methodology:

        "Official GMU CS course information + industry career and skill evidence + AI synthesis.",

      requirements: [

        "Confirm that each proposed course belongs within the GMU Computer Science BS academic scope.",

        "Identify the course concepts using official GMU course information.",

        "Connect those concepts to documented infrastructure or systems responsibilities.",

        "Record the supporting sources and explain the recommendation.",

      ],

    },

  },

};



/* ============================================================

   COURSE CATALOG



   Existing CS-BS records are preserved.

   The separate IT-major records have been removed.

   ============================================================ */



const COURSE_CATALOG = {

  CS112: {

    code: "CS 112",

    title: "Introduction to Computer Programming",

    tier: "FOUNDATION",

    degree: "CS",

    summary:

      "You learn how to turn a problem into instructions a computer can execute. That means working with variables, data types, conditionals, loops, functions, basic data structures, input/output, and debugging. More importantly, you begin learning computational thinking: breaking a larger problem into smaller steps, tracing what a program is doing, and correcting it when the behavior does not match your intent.",

    why:

      "Programming is the language through which later software, systems, cloud, and security concepts become concrete.",

    launch:

      "Focus less on memorizing syntax and more on variables, control flow, functions, problem decomposition, and debugging.",

    skills: ["Programming", "Problem Solving", "Debugging"],

  },



  CS211: {

    code: "CS 211",

    title: "Object-Oriented Programming",

    tier: "FOUNDATION",

    degree: "CS",

    summary:

      "You move from small introductory programs toward larger programs made of interacting objects and components. You learn how classes, objects, methods, interfaces, inheritance, encapsulation, and abstraction help organize software. The deeper lesson is how to divide a program into pieces with clear responsibilities so that the code is easier to understand, change, test, and reuse.",

    why:

      "Real systems contain interacting components. This course moves programming beyond isolated introductory exercises.",

    launch:

      "Pay attention to abstraction, classes, interfaces, program structure, and how multiple components interact.",

    skills: ["OOP", "Abstraction", "Software Design"],

  },



  CS310: {

    code: "CS 310",

    title: "Data Structures",

    tier: "FOUNDATION",

    degree: "CS",

    summary:

      "You learn different ways to organize data and the algorithms used to work with it. Lists, stacks, queues, trees, hash tables, graphs, searching, and sorting are not just structures to memorize; each creates different performance and design tradeoffs. You also learn to reason about how choices affect runtime, memory use, and the behavior of software as the amount of data grows.",

    why:

      "Data structures affect the performance and architecture of software ranging from applications to infrastructure tooling.",

    launch:

      "The career value is not just implementing structures from memory. Learn when each structure is useful and what tradeoffs it creates.",

    skills: ["Data Structures", "Algorithms", "Complexity"],

  },



  CS367: {

    code: "CS 367",

    title: "Computer Systems and Programming",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn what happens beneath high-level application code. Working closer to the machine exposes memory layout, pointers, C programming, data representation, compilation, and the relationship between a running program and the underlying computer system. The course helps replace the idea that code simply 'runs' with a clearer model of how software uses memory and system resources.",

    why:

      "Cloud, security, and production software become easier to reason about when you understand what programs are doing beneath high-level abstractions.",

    launch:

      "Treat this as a bridge between application code and the operating-system, memory, and machine-level concepts underneath it.",

    skills: ["Systems", "Memory", "C", "Low-Level Computing"],

  },



  CS321: {

    code: "CS 321",

    title: "Software Engineering",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn how software is engineered as a team rather than written as a one-person programming assignment. The course connects requirements, design, architecture, version control, implementation, testing, documentation, and iterative development. You practice turning an idea or customer need into a maintainable system while coordinating technical decisions with other developers.",

    why:

      "Professional software is built by teams under requirements, deadlines, and changing constraints rather than as isolated programming assignments.",

    launch:

      "Connect requirements, Git workflows, team development, architecture, testing, and iterative delivery to the way real engineering organizations work.",

    skills: ["Software Engineering", "Team Development", "Requirements"],

  },



  SWE437: {

    code: "SWE 437",

    title: "Software Testing and Maintenance",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn how engineers gain confidence that software behaves correctly and continues behaving correctly as it changes. That includes systematic testing, selecting useful test cases, reasoning about failures, regression testing, and maintaining existing software. The focus shifts from 'does my code run?' to 'how can a team repeatedly verify that this system still works?'",

    why:

      "Production engineering is not complete when code runs once. Teams need repeatable ways to detect regressions and maintain software safely.",

    launch:

      "Think about how testing fits into CI/CD, release confidence, and long-term software reliability.",

    skills: ["Testing", "Quality", "Maintenance"],

  },



  CS455: {

    code: "CS 455",

    title: "Computer Communications and Networking",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn how data travels between computers and how network protocols make communication reliable and understandable. Topics connect application communication to transport, addressing, routing, packet delivery, and the layered network model. The goal is to understand what must happen between a client sending a request and a remote service receiving and responding to it.",

    why:

      "Cloud applications, distributed services, and enterprise infrastructure all depend on networking.",

    launch:

      "Translate protocols into practical questions: how does traffic reach a service, where can communication fail, and how would you diagnose it?",

    skills: ["Networking", "Protocols", "Internet"],

  },



  CS468: {

    code: "CS 468",

    title: "Secure Programming and Systems",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn how security problems emerge in software and computer systems and how secure design reduces those risks. The course connects secure programming with cryptographic foundations, authentication and protection mechanisms, common weaknesses, and attacker thinking. Instead of treating security as a product added at the end, you learn to reason about what can go wrong while a system is being designed and implemented.",

    why:

      "Security engineers need to understand how weaknesses emerge in software and systems before they can reduce them.",

    launch:

      "Connect vulnerabilities and cryptographic concepts to the broader question of how systems fail and how secure design reduces attack surface.",

    skills: ["Security", "Secure Programming", "Cryptography"],

  },



  CS471: {

    code: "CS 471",

    title: "Operating Systems",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn how an operating system manages the computer underneath your applications. That includes how processes are created and scheduled, how multiple threads execute concurrently, how memory is allocated and isolated, how files and storage are managed, and how programs share hardware and system resources. These concepts explain much of what is happening between application code and the physical machine.",

    why:

      "Servers, containers, virtual machines, and cloud workloads ultimately rely on operating-system behavior.",

    launch:

      "Processes, threads, memory, and synchronization are especially valuable concepts for cloud infrastructure, security, and systems engineering.",

    skills: ["Operating Systems", "Processes", "Memory", "Concurrency"],

  },



  CS475: {

    code: "CS 475",

    title: "Concurrent and Distributed Systems",

    tier: "DIRECT",

    degree: "CS",

    summary:

      "You learn what changes when computation happens at the same time or across multiple machines. Concurrency introduces coordination, synchronization, races, and shared-state problems; distributed systems add networking, partial failures, communication delays, and multiple independent machines. The course teaches you to reason about systems where there is no longer one simple sequence of execution.",

    why:

      "Modern applications increasingly run across multiple processes, services, and machines rather than inside one isolated program.",

    launch:

      "Connect concurrency and distributed-system concepts to microservices, cloud architecture, scalability, and failure handling.",

    skills: ["Distributed Systems", "Concurrency", "Scalability"],

  },



  CS483: {

    code: "CS 483",

    title: "Analysis of Algorithms",

    tier: "DIRECT",

    degree: "CS",

    credits: 3,

    summary:

      "You learn how to analyze algorithms mathematically instead of judging them only by whether they produce the correct answer. You compare how runtime and resource requirements grow with input size, study major algorithmic strategies, and justify why an approach is efficient or inefficient. This turns data-structure knowledge into a stronger ability to evaluate competing solutions before or alongside implementation.",

    why:

      "Algorithm analysis supports reasoning about software efficiency and problem-solving tradeoffs. Algorithms and data structures also appear in Amazon's published software-development interview preparation topics.",

    launch:

      "Connect CS 310's data-structure knowledge to explaining why an algorithm works and how its resource requirements grow. Practice comparing alternatives, rather than memorizing a single solution.",

    skills: [

      "Algorithm Analysis",

      "Computational Resources",

      "Algorithm Improvement",

      "Data-Structure Tradeoffs",

    ],

    workflow:

      "A practical application is comparing candidate solutions, explaining their expected resource costs, and checking those expectations against measurements before choosing an implementation.",

    cost:

      "Weak analysis can make it harder to justify an algorithm choice or recognize an approach that becomes expensive as the input grows. This is a preparation gap, not a guaranteed hiring outcome.",

    artifacts: [

      "Algorithm comparison notes",

      "Complexity analyses",

      "Benchmark results",

      "Pull-request explanations of algorithm choices",

    ],

    evidence: {

      status: "source-supported",

      mappingType: "AI synthesis",

      rationale:

        "GMU identifies algorithm and resource analysis as course content. Amazon lists algorithms and data structures among software-development interview topics. Their overlap supports this Software Engineering recommendation; it is not an official GMU career prescription.",

      sources: [

        {

          label: "GMU catalog — CS 483",

          url: "https://catalog.gmu.edu/courses/cs/",

          kind: "Official course information",

        },

        {

          label: "Amazon — Software development interview topics",

          url: "https://www.amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics",

          kind: "Industry skill evidence",

        },

      ],

    },

  },

};


const COURSE_CAREER_INTELLIGENCE = {
  software: {
    CS112: {
      work: "Programming fundamentals appear everywhere in software work: implementing features, reading existing code, debugging defects, writing scripts, and understanding application logic.",
      relevance: "Software engineering begins with the ability to translate requirements into working logic. These fundamentals become the base for object-oriented design, data structures, frameworks, testing, and larger production codebases.",
      launch: "Treat this as the point where problem solving becomes executable. Strong control flow, functions, decomposition, and debugging make every later software course and project easier to reason about.",
    },
    CS211: {
      work: "Production applications are split into classes, services, modules, and components that collaborate. Object-oriented ideas show up when developers model domain objects, define interfaces, reuse behavior, and refactor large codebases.",
      relevance: "Software engineers rarely maintain one giant block of code. Abstraction and separation of responsibilities help teams change one part of a system without breaking everything around it.",
      launch: "Use OOP as a design tool, not just syntax. Practice explaining why a class or interface exists and what responsibility it owns.",
    },
    CS310: {
      work: "Data structures appear behind application features such as search, caching, scheduling, indexing, navigation, dependency graphs, and fast lookup. Engineers choose structures based on the operations the software performs most often.",
      relevance: "A software engineer needs to recognize when a design will become slow or unnecessarily complex as data grows. This course gives you the vocabulary to compare implementation choices rather than choosing them by habit.",
      launch: "Connect each structure to a real use case and its tradeoffs. The goal is to be able to say why a hash table, tree, queue, graph, or other structure fits a particular problem.",
    },
    CS367: {
      work: "Low-level behavior surfaces when debugging crashes, memory problems, performance issues, native libraries, system calls, or software that interacts closely with an operating system.",
      relevance: "Even when you write high-level application code, understanding memory and execution helps you debug difficult failures and understand what runtimes, compilers, and operating systems are doing beneath your program.",
      launch: "This course gives software engineers a systems mental model. Carry forward the connection between source code, memory, execution, and the OS instead of treating those layers as a black box.",
    },
    CS321: {
      work: "This resembles everyday product development: teams interpret requirements, plan work, use Git, review changes, test features, document decisions, and iterate as requirements evolve.",
      relevance: "This is one of the clearest bridges from programming coursework to professional software engineering because the job is as much about building maintainable software with other people as it is about writing code.",
      launch: "Treat the team process as part of the technical skill. Requirements, version control, architecture, testing, reviews, and iterative delivery are all part of shipping reliable software.",
    },
    SWE437: {
      work: "Testing appears in unit and integration test suites, pull requests, CI pipelines, regression checks, bug fixes, and release processes. Maintenance work also dominates much of a real product's lifetime.",
      relevance: "Software engineers are responsible for changing systems without repeatedly breaking existing behavior. Testing provides fast feedback and gives teams confidence to refactor and release more safely.",
      launch: "Connect testing directly to CI/CD and release confidence. A useful portfolio project should show not only that the app runs, but that important behavior can be verified repeatedly.",
    },
    CS475: {
      work: "Backend services, microservices, job workers, databases, messaging systems, and cloud applications often perform work concurrently or communicate across machines.",
      relevance: "Modern software frequently extends beyond one process on one computer. Understanding synchronization and distributed failure modes helps engineers design services that remain correct when many things happen at once.",
      launch: "Think beyond a single program. Connect concurrency and distributed systems to service boundaries, coordination, scalability, reliability, and failure handling.",
    },
    CS483: {
      work: "Engineers use algorithmic reasoning when comparing implementations, reviewing performance-sensitive code, optimizing expensive operations, and explaining technical tradeoffs. Algorithms and data structures are also common in software-engineering interviews.",
      relevance: "Correct code can still become impractical when input grows. Algorithm analysis helps software engineers predict scaling behavior and defend why one solution is a better engineering choice than another.",
      launch: "Connect CS 310's structures to the question 'how well does this solution scale?' Practice comparing alternatives and explaining their time and space costs rather than memorizing one implementation.",
    },
  },
  cloud: {
    CS112: {
      work: "Cloud engineers still automate work with code: deployment scripts, serverless functions, infrastructure utilities, API integrations, and small tools that remove repetitive manual tasks.",
      relevance: "Cloud platforms provide consoles, but automation is what makes infrastructure repeatable. Programming fundamentals let you move from clicking through tasks manually to expressing operational logic in scripts and tools.",
      launch: "You do not need to become an application specialist to benefit from programming. Focus on functions, control flow, data handling, APIs, and debugging—the pieces most useful for automation.",
    },
    CS211: {
      work: "Object-oriented structure appears in SDKs, automation tools, internal platforms, and infrastructure codebases. Cloud engineers also need to read application code well enough to understand what they are deploying and supporting.",
      relevance: "Cloud and DevOps work sits close to software teams. Understanding how applications are organized makes it easier to automate deployments, diagnose configuration problems, and communicate with developers.",
      launch: "Use this course to become comfortable navigating structured codebases. The career payoff is being able to understand the software your infrastructure is expected to run.",
    },
    CS310: {
      work: "Queues, maps, trees, graphs, and caching ideas appear inside schedulers, dependency systems, routing logic, orchestration tools, monitoring platforms, and distributed services.",
      relevance: "Cloud engineers do not implement every data structure from scratch, but understanding them helps explain why infrastructure and platform tools behave the way they do and why certain operations scale differently.",
      launch: "Keep the conceptual tradeoffs. Recognizing queues, graphs, caching, and lookup structures makes unfamiliar cloud systems easier to reason about.",
    },
    CS367: {
      work: "Systems knowledge appears when working with Linux servers, processes, memory usage, binaries, system calls, containers, and difficult application failures on virtual machines.",
      relevance: "Cloud resources are abstractions over real computing systems. Understanding memory and execution makes EC2 instances, containers, logs, and resource problems less mysterious.",
      launch: "This is a bridge from code to infrastructure. Carry forward the mental model of what a program needs from the machine underneath it.",
    },
    CS455: {
      work: "Networking appears constantly in VPCs, subnets, IP addressing, routing tables, DNS, load balancers, firewalls/security groups, ports, HTTP services, VPNs, and connectivity troubleshooting.",
      relevance: "A large share of cloud failures look like 'service A cannot reach service B.' Networking knowledge lets you trace the path instead of randomly changing cloud settings.",
      launch: "Translate protocol concepts into traffic-flow questions: source, destination, address, port, route, name resolution, and filtering. That becomes a practical cloud troubleshooting framework.",
    },
    CS471: {
      work: "Cloud applications ultimately run on operating systems, usually Linux. When you deploy to an EC2 instance, inspect a process consuming memory, manage files and permissions, diagnose a stopped service, or work with containers, you are interacting with OS concepts.",
      relevance: "Cloud abstracts physical hardware, but it does not eliminate operating systems. Understanding processes, memory, files, concurrency, and resource management lets you reason about what is happening inside VMs and containers instead of treating the cloud as a collection of buttons.",
      launch: "Processes, threads, memory, synchronization, file systems, and resource allocation connect directly to Linux, EC2/VMs, Docker, Kubernetes, monitoring, and production troubleshooting.",
    },
    CS475: {
      work: "Distributed-system ideas appear in microservices, container clusters, replicated services, queues, databases, autoscaling systems, and applications spread across availability zones or regions.",
      relevance: "Cloud architecture is inherently distributed. Machines and networks can fail independently, so engineers need to think about coordination, retries, state, scalability, and what happens when only part of a system is healthy.",
      launch: "This course helps you move from administering one server to reasoning about a service made of many components. Connect the theory to microservices, orchestration, resilience, and scaling.",
    },
  },
  cyber: {
    CS112: {
      work: "Security work often requires reading code, writing small analysis or automation scripts, reproducing bugs, parsing data, and understanding how program logic can be abused.",
      relevance: "You cannot reason deeply about software vulnerabilities without understanding the logic that software executes. Programming fundamentals let you inspect behavior rather than treating applications as opaque boxes.",
      launch: "Focus on control flow, input handling, functions, and debugging. Security frequently begins with asking what input reaches which code and what assumptions the programmer made.",
    },
    CS211: {
      work: "Application security reviews involve navigating classes, APIs, components, and trust boundaries in large codebases. Object-oriented structure also influences where validation and security controls are implemented.",
      relevance: "Security engineers need to understand how application components interact before they can identify unsafe assumptions or determine where a control should live.",
      launch: "Use abstraction and interfaces to think about boundaries: what a component exposes, what it trusts, and what another component is allowed to do.",
    },
    CS310: {
      work: "Security tooling and systems use structures such as graphs, queues, maps, trees, and indexes for dependency analysis, scanning, event processing, identity relationships, and fast lookup.",
      relevance: "Efficient structures matter when security tools process large logs, dependency graphs, network relationships, or collections of indicators. Algorithms also sharpen the problem-solving needed to reason about attacker and defender workflows.",
      launch: "Keep the ability to recognize structure and complexity. It helps you understand both how security tools organize information and how expensive an analysis may become at scale.",
    },
    CS367: {
      work: "Memory layout and low-level execution matter in vulnerability classes such as memory corruption, unsafe pointer use, and crashes. Systems knowledge also helps when analyzing binaries, processes, and host behavior.",
      relevance: "Many serious vulnerabilities make sense only after you understand how programs use memory and interact with the machine. This course gives you the foundation for understanding why low-level implementation mistakes can become security problems.",
      launch: "Connect C, memory, pointers, and execution to attack surface. The goal is to understand what the program is really doing when an abstraction fails.",
    },
    CS468: {
      work: "The material maps directly to secure coding, vulnerability analysis, cryptographic protections, authentication, threat reduction, and reviewing how software can fail under malicious input or misuse.",
      relevance: "This is the most explicitly security-focused course in the V1 path. It teaches you to think about both the mechanism protecting a system and the assumptions an attacker may try to violate.",
      launch: "Treat security as a design property rather than a final checklist. Practice connecting each weakness to its root cause, realistic impact, and a mitigation that reduces the attack surface.",
    },
    CS471: {
      work: "Security teams investigate processes, permissions, memory behavior, files, services, isolation, and resource access on endpoints and servers. OS concepts also underpin containers and many host-security controls.",
      relevance: "The operating system is a major security boundary. Understanding how it isolates processes and manages resources helps explain privilege, persistence, process behavior, and what host-based defenses are trying to protect.",
      launch: "Connect processes, memory, files, permissions, and isolation to endpoint security, Linux hardening, incident investigation, containers, and privilege boundaries.",
    },
  },
};



/* ============================================================

   DISPLAY METADATA

   ============================================================ */



const CAREER_COLORS = {

  software: "#d6a35e",

  cloud: "#69b5d5",

  cyber: "#cbbb71",

  systems: "#67bb98",

};



const NEUTRAL_COLOR = "#8295a9";



const LAUNCHPAD_DEFINITION =

  "LAUNCHPAD: A mission-critical course providing the exact foundational thrust, core skills, and upward momentum required to successfully launch a student into the modern tech industry.";



const LAUNCHPAD_COURSES = {

  software: ["CS310", "CS321", "CS483"],

  cloud: ["CS367", "CS471", "CS475"],

  cyber: ["CS468"],

  systems: [],

};



const DEFINITIONS = {

  Direct:

    "Courses whose material maps closely to skills or concepts used in the selected career field.",

  Foundation:

    "Courses that build the technical base needed to understand more specialized career material.",

  Supplementary:

    "Useful supporting knowledge that can strengthen the path but is less central than Direct or Foundation coursework.",

  Hyperlane:

    "A conceptual learning connection between courses. A Hyperlane is not automatically an official GMU prerequisite.",

  Launchpad:

    "The practical bridge between university coursework and the skills, projects, and concepts you should carry into career preparation.",

  Registry:

    "The curated set of courses displayed for a selected career trajectory.",

  Constellation:

    "The visual network of courses and learning connections associated with a career trajectory.",

};



/*

 * The default galaxy is derived from active V1 registries.

 * Unreferenced catalog records cannot silently appear.

 */

const V1_COURSE_IDS = Array.from(

  new Set(Object.values(CAREERS).flatMap((career) => career.courses)),

);



const V1_COURSE_SET = new Set(V1_COURSE_IDS);



const ALL_LAUNCHPAD_COURSES = new Set(

  Object.values(LAUNCHPAD_COURSES)

    .flat()

    .filter((id) => V1_COURSE_SET.has(id)),

);



/* ============================================================

   CONSTELLATION COORDINATES



   Compact, irregular coordinates improve initial readability

   while retaining a branching constellation.

   ============================================================ */



const GALAXY_COORDINATES = {
  CS112: { x: -520, y: 90 },
  CS211: { x: -500, y: -135 },
  CS310: { x: -235, y: 10 },
  CS367: { x: 30, y: -15 },

  CS321: { x: 30, y: -245 },
  SWE437: { x: 295, y: -250 },
  CS475: { x: 560, y: -90 },

  CS455: { x: 290, y: 105 },
  CS471: { x: 560, y: 145 },
  CS468: { x: 20, y: 225 },

  CS483: { x: -235, y: -220 },
};


/*

 * Existing CS connections are preserved.

 * CS310 -> CS483 is a conceptual learning connection.

 * It is not a complete representation of CS483 prerequisites.

 */

const HYPERLANES = [

  ["CS112", "CS211"],

  ["CS211", "CS310"],

  ["CS310", "CS367"],



  ["CS367", "CS321"],

  ["CS321", "SWE437"],

  ["SWE437", "CS475"],



  ["CS367", "CS455"],

  ["CS455", "CS471"],

  ["CS471", "CS475"],



  ["CS367", "CS468"],

  ["CS468", "CS471"],



  ["CS310", "CS483"],

];



/* ============================================================

   SHARED EXPLORATION CONTEXT



   No backend is invented here.

   A future chat integration can serialize this same context.

   ============================================================ */



function createExplorationContext(careerId, courseId) {

  const career = careerId ? CAREERS[careerId] : null;

  const registry = career ? career.courses : V1_COURSE_IDS;



  const validCourseId =

    courseId && registry.includes(courseId) ? courseId : null;



  const course = validCourseId

    ? COURSE_CATALOG[validCourseId]

    : null;

  const careerCourseIntelligence =
    careerId && validCourseId
      ? COURSE_CAREER_INTELLIGENCE[careerId]?.[validCourseId] ?? null
      : null;



  return {

    academicScope: "George Mason University — Computer Science, BS",

    activeCareerId: careerId,

    activeCareer: career,

    registryStatus: career?.status ?? "available",

    selectedCourseId: validCourseId,

    selectedCourse: course,

    registry,

    courseIntelligence: course

      ? {

          overview: course.summary,

          workplaceConnection: careerCourseIntelligence?.work ?? course.why,

          careerRelevance:
            careerCourseIntelligence?.relevance ?? course.why,

          launchpadInsight:
            careerCourseIntelligence?.launch ?? course.launch,

          skills: course.skills,

          realWorldWorkflow: course.workflow ?? null,

          costOfMissingKnowledge: course.cost ?? null,

          industryArtifacts: course.artifacts ?? [],

          evidence: course.evidence ?? null,

        }

      : null,

    trackLaunchpadInsight: career?.launchpad ?? null,

    launchpadDefinition: LAUNCHPAD_DEFINITION,

    connectionMeaning: DEFINITIONS.Hyperlane,

    research: career?.research ?? null,

  };

}



/* ============================================================

   SMALL UI COMPONENTS

   ============================================================ */



const CONTROL_CLASS =

  "inline-flex min-h-10 items-center justify-center gap-2 border " +

  "border-slate-700/70 bg-[#080e17]/95 px-3 py-2 text-[12px] " +

  "leading-5 tracking-[0.02em] text-slate-300 transition-colors " +

  "hover:border-slate-400 hover:text-white " +

  "focus-visible:outline focus-visible:outline-2 " +

  "focus-visible:outline-offset-2 focus-visible:outline-emerald-300";



function ExpandIcon({ collapse = false }) {

  return (

    <svg

      viewBox="0 0 20 20"

      width="15"

      height="15"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.3"

      aria-hidden="true"

    >

      {collapse ? (

        <path d="M3 8h5V3M12 3v5h5M17 12h-5v5M8 17v-5H3" />

      ) : (

        <path d="M8 3H3v5M12 3h5v5M17 12v5h-5M8 17H3v-5" />

      )}

    </svg>

  );

}



function OrbitalMark() {

  return (

    <svg

      viewBox="0 0 48 48"

      className="h-10 w-10 shrink-0 text-emerald-400"

      fill="none"

      aria-hidden="true"

      style={{ filter: "drop-shadow(0 0 7px #34d39944)" }}

    >

      <circle cx="24" cy="24" r="5" fill="currentColor" />

      <circle

        cx="24"

        cy="24"

        r="14"

        stroke="currentColor"

        strokeWidth="1"

        opacity="0.55"

      />

      <ellipse

        cx="24"

        cy="24"

        rx="22"

        ry="8"

        transform="rotate(-35 24 24)"

        stroke="currentColor"

        strokeWidth="1.4"

      />

      <circle cx="40" cy="13" r="2" fill="currentColor" />

    </svg>

  );

}



function Eyebrow({ children, className = "" }) {

  return (

    <div

      className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-400 ${className}`}

    >

      {children}

    </div>

  );

}



function TierBadge({ tier }) {

  const term = {

    DIRECT: "Direct",

    FOUNDATION: "Foundation",

    SUPPLEMENTARY: "Supplementary",

  }[tier];



  return (

    <span

      title={DEFINITIONS[term]}

      className="inline-flex border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-slate-400"

    >

      {term || tier}

    </span>

  );

}



function LaunchpadPanel({ children }) {

  return (

    <section className="border border-[#cbbb71]/25 bg-[#cbbb71]/[0.035] p-5">

      <h3 className="text-[12px] font-semibold tracking-[0.12em] text-[#cbbb71]">

        LAUNCHPAD INSIGHT

      </h3>



      <div className="mt-3 leading-[1.85] text-slate-300">

        {children}

      </div>



      <p className="mt-4 border-t border-[#cbbb71]/15 pt-3 text-[11px] leading-6 text-slate-500">

        {LAUNCHPAD_DEFINITION}

      </p>

    </section>

  );

}



function ContentSection({ number, title, children }) {

  return (

    <section className="border-t border-slate-800 pt-6">

      <div className="flex items-baseline gap-3">

        <span className="text-[12px] tracking-[0.08em] text-emerald-400">

          {number}

        </span>



        <h3 className="text-[15px] font-semibold leading-7 text-slate-100">

          {title}

        </h3>

      </div>



      <div className="mt-3 leading-[1.9] text-slate-400">

        {children}

      </div>

    </section>

  );

}

/* ============================================================
   CAREER CONTROLS
   ============================================================ */

function TrackingHeader() {
  return (
    <header className="relative z-30 flex min-h-[72px] shrink-0 items-center justify-between gap-4 border-b border-slate-800 bg-[#060b12] px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <OrbitalMark />

        <div className="min-w-0">
          <div className="whitespace-nowrap text-[18px] font-bold tracking-[0.1em] text-slate-100">
            HYPERLANE <span className="text-[#cbbb71]">/</span>
          </div>

          <div className="mt-1 text-[10px] tracking-[0.13em] text-slate-400">
            MASON CS CAREER MAP
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-4 border-l border-emerald-400/30 pl-6 lg:flex">
        <span className="text-3xl font-black text-[#cbbb71]">M</span>

        <div>
          <div className="text-[12px] tracking-[0.08em] text-slate-300">
            GEORGE MASON UNIVERSITY
          </div>

          <div className="mt-1 text-[12px] text-slate-400">
            Computer Science, BS
          </div>
        </div>
      </div>

      <div className="hidden shrink-0 text-right sm:block">
        <div className="text-[10px] tracking-[0.1em] text-slate-400">
          EXPLORER EDITION
        </div>

        <div className="mt-1 text-[10px] tracking-[0.06em] text-slate-500">
          V1.0 / 2026-27 REFERENCE
        </div>
      </div>
    </header>
  );
}

function CareerSelector({ selectedCareer, onSelect }) {
  return (
    <nav
      aria-label="Career destinations"
      className="flex min-w-0 flex-wrap gap-2"
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={!selectedCareer}
        className={`${CONTROL_CLASS} ${
          !selectedCareer ? "!border-slate-400 !text-white" : ""
        }`}
      >
        All Careers
      </button>

      {Object.values(CAREERS).map((career) => {
        const active = selectedCareer === career.id;
        const pending = career.status === "research-pending";
        const accent = CAREER_COLORS[career.id];

        return (
          <button
            key={career.id}
            type="button"
            onClick={() => onSelect(career.id)}
            aria-pressed={active}
            title={
              pending
                ? `${career.name}: course mapping awaiting source review`
                : career.description
            }
            className={CONTROL_CLASS}
            style={
              active
                ? {
                    color: accent,
                    borderColor: accent,
                    backgroundColor: `${accent}0d`,
                  }
                : undefined
            }
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: active ? accent : "#64748b",
              }}
            />

            {career.name}

            {pending && (
              <span className="text-[9px] uppercase tracking-[0.06em] opacity-70">
                Pending
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function TrajectoryHeader({
  selectedCareer,
  onSelectCareer,
  viewMode,
}) {
  return (
    <section className="shrink-0 border-b border-slate-800 bg-[#060b12]/90 px-4 py-3 sm:px-6">
      {viewMode !== "galaxy" && (
        <div className="mb-4 flex items-start justify-between gap-5">
          <div>
            <Eyebrow>
              Your degree. A universe of possibilities.
            </Eyebrow>

            <h1 className="mt-2 text-[27px] font-semibold leading-tight tracking-tight text-slate-100 sm:text-[32px]">
              Find your trajectory
              <span className="text-emerald-400">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-[13px] leading-6 text-slate-400">
              Trace the connection between your next class and your
              future career.
            </p>
          </div>

          <div className="hidden shrink-0 pt-1 text-right text-[11px] leading-6 tracking-[0.06em] text-slate-500 xl:block">
            <div className="text-slate-300">GMU / CS</div>
            <div>38.8315 N · 77.3110 W</div>
          </div>
        </div>
      )}

      <CareerSelector
        selectedCareer={selectedCareer}
        onSelect={onSelectCareer}
      />
    </section>
  );
}

/* ============================================================
   COURSE INTELLIGENCE
   ============================================================ */

function ResearchPendingPanel({ career }) {
  return (
    <section className="space-y-5">
      <div>
        <Eyebrow>Career destination / Research pending</Eyebrow>

        <h2 className="mt-3 text-2xl font-semibold leading-8 text-slate-100">
          {career.name}
        </h2>

        <p className="mt-4 leading-[1.9] text-slate-400">
          {career.description}
        </p>
      </div>

      <div className="border border-slate-700 bg-slate-900/30 p-5">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-200">
          Course mapping awaiting review
        </h3>

        <p className="mt-3 leading-[1.9] text-slate-400">
          {career.research.summary}
        </p>
      </div>

      <section className="border-t border-slate-800 pt-5">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-300">
          Recommendation methodology
        </h3>

        <p className="mt-3 leading-[1.9] text-slate-400">
          {career.research.methodology}
        </p>

        <ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-7 text-slate-400">
          {career.research.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </section>

      <p className="border-t border-slate-800 pt-5 text-[12px] leading-7 text-slate-500">
        This destination remains part of Hyperlane V1. Its constellation
        will appear after the CS-BS course recommendations and their
        supporting evidence have been reviewed.
      </p>
    </section>
  );
}

function FrameworkIntroduction() {
  return (
    <div className="space-y-6">
      <div>
        <Eyebrow>One degree. Multiple career destinations.</Eyebrow>

        <h2 className="mt-3 text-2xl font-semibold leading-9 text-slate-100">
          Choose a career.
          <br />
          Follow its constellation.
        </h2>

        <p className="mt-4 leading-[1.9] text-slate-400">
          Explore career connections within the George Mason University
          Computer Science BS. Select a career above the galaxy, then
          choose a course to understand its relevance.
        </p>
      </div>

      <section className="space-y-5 border-t border-slate-800 pt-5">
        <Eyebrow>Three questions. One clearer direction.</Eyebrow>

        <div>
          <h3 className="font-semibold text-slate-200">
            01. What am I learning?
          </h3>
          <p className="mt-2 leading-[1.9] text-slate-400">
            Start with the actual concepts, systems, and technical skills
            inside the course rather than the course number alone.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-200">
            02. Where does this show up at work?
          </h3>
          <p className="mt-2 leading-[1.9] text-slate-400">
            Connect those concepts to the software, infrastructure,
            security, data, or enterprise systems professionals work with.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-200">
            03. Why is it relevant to this career?
          </h3>
          <p className="mt-2 leading-[1.9] text-slate-400">
            Turn the concept into something observable: a project, lab,
            deployment, troubleshooting exercise, or stronger technical
            explanation.
          </p>
        </div>
      </section>

      <LaunchpadPanel>
        <p>
          Select an available career trajectory to reveal the launchpad
          connecting its university coursework to practical industry
          preparation.
        </p>
      </LaunchpadPanel>

      <p className="text-[12px] leading-7 text-slate-500">
        Explore freely. Progress tracking is optional. Advanced courses
        remain available without marking earlier courses complete.
      </p>
    </div>
  );
}

function CareerOverview({ career, onSelectCourse }) {
  if (career.status === "research-pending") {
    return <ResearchPendingPanel career={career} />;
  }

  const launchpadIds = (LAUNCHPAD_COURSES[career.id] ?? []).filter(
    (id) => career.courses.includes(id) && COURSE_CATALOG[id],
  );

  return (
    <div className="space-y-6">
      <div>
        <Eyebrow>Selected career destination</Eyebrow>

        <h2 className="mt-3 text-2xl font-semibold leading-9 text-slate-100">
          {career.name}
        </h2>

        <p className="mt-4 leading-[1.9] text-slate-400">
          {career.description}
        </p>

        <p className="mt-3 text-[11px] leading-6 text-slate-500">
          ACADEMIC ROUTE / GMU COMPUTER SCIENCE, BS
        </p>
      </div>

      {career.launchpad && (
        <LaunchpadPanel>
          <p>{career.launchpad}</p>
        </LaunchpadPanel>
      )}

      {launchpadIds.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-[12px] font-semibold tracking-[0.08em] text-slate-300">
            DEFINING MILESTONES
          </h3>

          {launchpadIds.map((id) => {
            const course = COURSE_CATALOG[id];

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectCourse(id)}
                title={LAUNCHPAD_DEFINITION}
                className="block w-full border-l border-slate-700 py-1 pl-4 text-left transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              >
                <span className="block text-[13px] font-semibold leading-6 text-slate-200">
                  {course.code} / {course.title}
                </span>

                <span className="mt-2 block text-[13px] leading-7 text-slate-400">
                  {course.launch}
                </span>
              </button>
            );
          })}
        </section>
      )}

      <p className="border-t border-slate-800 pt-5 leading-7 text-slate-200">
        Start exploring: Click a highlighted course node to begin.
      </p>
    </div>
  );
}

function EvidencePanel({ evidence }) {
  if (!evidence) return null;

  return (
    <section className="border-t border-slate-800 pt-6">
      <Eyebrow>Sources and mapping rationale</Eyebrow>

      <p className="mt-3 text-[13px] leading-7 text-slate-400">
        {evidence.rationale}
      </p>

      <div className="mt-3 text-[11px] leading-6 text-slate-500">
        MAPPING / {evidence.mappingType}
      </div>

      <ul className="mt-4 space-y-4">
        {evidence.sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[13px] leading-6 text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 hover:text-emerald-200"
            >
              {source.label}
            </a>

            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              {source.kind}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CourseInspector({
  context,
  progressEnabled,
  completed,
  onToggleCompleted,
  onBackToCareer,
  onOpenStrategy,
}) {
  const course = context.selectedCourse;
  const career = context.activeCareer;
  const intelligence = context.courseIntelligence;

  if (!course || !intelligence) return null;

  return (
    <article className="space-y-6">
      <div>
        {career && (
          <button
            type="button"
            onClick={onBackToCareer}
            className="mb-5 text-left text-[12px] leading-6 text-slate-400 underline decoration-slate-700 underline-offset-4 hover:text-slate-200"
          >
            Return to {career.name} overview
          </button>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Eyebrow>CS-BS / Course signal</Eyebrow>
          <TierBadge tier={course.tier} />
        </div>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          {course.code}
        </h2>

        <p className="mt-2 text-[18px] leading-8 text-slate-300">
          {course.title}
        </p>

        {course.credits != null && (
          <p className="mt-2 text-[12px] leading-6 text-slate-400">
            {course.credits} credits
          </p>
        )}

        {career && (
          <p className="mt-3 text-[11px] leading-6 text-slate-500">
            ACTIVE DESTINATION / {career.name}
          </p>
        )}
      </div>

      <ContentSection number="01" title="What am I learning?">
        <p>{intelligence.overview}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Course skills">
          {intelligence.skills.map((skill) => (
            <li
              key={skill}
              className="border border-slate-800 bg-slate-900/30 px-2 py-1 text-[12px] leading-6 text-slate-400"
            >
              {skill}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        number="02"
        title="Where does this show up at work?"
      >
        <p>{intelligence.workplaceConnection}</p>
      </ContentSection>

      <ContentSection
        number="03"
        title="Why is it relevant to this career?"
      >
        {career && (
          <div className="mb-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-300">
              {career.name}
            </p>
            <p className="mt-2">{intelligence.careerRelevance}</p>
          </div>
        )}

        <LaunchpadPanel>
          <p>{intelligence.launchpadInsight}</p>
        </LaunchpadPanel>

        {intelligence.realWorldWorkflow && (
          <section className="mt-6">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-200">
              The Real-World Workflow
            </h4>
            <p className="mt-3">{intelligence.realWorldWorkflow}</p>
          </section>
        )}

        {intelligence.costOfMissingKnowledge && (
          <section className="mt-6">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-200">
              The Cost of Missing This
            </h4>
            <p className="mt-3">{intelligence.costOfMissingKnowledge}</p>
          </section>
        )}

        {intelligence.industryArtifacts.length > 0 && (
          <section className="mt-6">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-200">
              Key Industry Artifacts
            </h4>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {intelligence.industryArtifacts.map((artifact) => (
                <li key={artifact}>{artifact}</li>
              ))}
            </ul>
          </section>
        )}
      </ContentSection>

      <CourseLearningTip course={course} onOpenStrategy={onOpenStrategy} />

      <EvidencePanel evidence={intelligence.evidence} />

      {progressEnabled && (
        <section className="border-t border-slate-800 pt-5">
          <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-7 text-slate-300">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggleCompleted(context.selectedCourseId)}
              className="mt-1.5 h-4 w-4 accent-emerald-400"
            />
            Mark {course.code} as completed
          </label>

          <p className="mt-2 text-[11px] leading-6 text-slate-500">
            Personal session tracking only. This does not verify
            prerequisite eligibility.
          </p>
        </section>
      )}
    </article>
  );
}

function RegistryList({
  ids,
  selectedCourse,
  onSelectCourse,
  completedCourses,
  progressEnabled,
}) {
  if (ids.length === 0) return null;

  return (
    <section className="mt-8 border-t border-slate-800 pt-6">
      <Eyebrow>Complete registry / {ids.length} courses</Eyebrow>

      <div className="mt-4 space-y-1">
        {ids.map((id) => {
          const course = COURSE_CATALOG[id];
          const selected = selectedCourse === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectCourse(id)}
              aria-pressed={selected}
              className={`flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                selected
                  ? "border-white/70 bg-white/[0.035]"
                  : "border-transparent hover:border-slate-700 hover:bg-white/[0.02]"
              }`}
            >
              <span className="w-[74px] shrink-0 text-[12px] font-semibold leading-6 text-slate-300">
                {course.code}
              </span>

              <span className="min-w-0 flex-1 text-[12px] leading-6 text-slate-400">
                {course.title}
              </span>

              {progressEnabled && completedCourses.has(id) && (
                <span className="text-[10px] leading-6 text-slate-300">
                  DONE
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Sidebar({
  onOpenStrategy,
  context,
  viewMode,
  onChangeView,
  onSelectCourse,
  onBackToCareer,
  progressEnabled,
  completedCourses,
  onToggleCompleted,
}) {
  const expanded = viewMode === "intelligence";
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [context.selectedCourseId, context.activeCareerId]);

  return (
    <aside
      id="course-intelligence"
      aria-label="Course Intelligence"
      className={`flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-slate-800 bg-[#070d16] ${
        expanded ? "" : "border-b md:border-b-0 md:border-r"
      }`}
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-5">
        <div>
          <div className="text-[10px] tracking-[0.1em] text-slate-500">
            MISSION STATUS MONITOR
          </div>

          <h2 className="mt-1 text-[12px] font-semibold tracking-[0.08em] text-slate-300">
            COURSE INTELLIGENCE
          </h2>
        </div>

        <button
          type="button"
          className={CONTROL_CLASS}
          onClick={() => onChangeView(expanded ? "split" : "intelligence")}
          aria-expanded={expanded}
          aria-controls="intelligence-reading-surface"
        >
          <ExpandIcon collapse={expanded} />
          {expanded ? "Return to Galaxy" : "Expand"}
        </button>
      </div>

      <div
        ref={scrollRef}
        id="intelligence-reading-surface"
        tabIndex={0}
        aria-label="Scrollable course information"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain focus-visible:outline focus-visible:outline-1 focus-visible:outline-emerald-300"
      >
        <div
          className={`mx-auto w-full ${
            expanded
              ? "max-w-[960px] px-6 py-8 text-[16px] sm:px-12 sm:py-10"
              : "px-5 py-6 text-[14px]"
          }`}
        >
          {context.selectedCourse ? (
            <CourseInspector
              onOpenStrategy={onOpenStrategy}
              context={context}
              progressEnabled={progressEnabled}
              completed={completedCourses.has(context.selectedCourseId)}
              onToggleCompleted={onToggleCompleted}
              onBackToCareer={onBackToCareer}
            />
          ) : context.activeCareer ? (
            <CareerOverview
              career={context.activeCareer}
              onSelectCourse={onSelectCourse}
            />
          ) : (
            <FrameworkIntroduction />
          )}

          <RegistryList
            ids={context.registry}
            selectedCourse={context.selectedCourseId}
            onSelectCourse={onSelectCourse}
            completedCourses={completedCourses}
            progressEnabled={progressEnabled}
          />

          <details className="mt-8 border-t border-slate-800 pt-5 text-[13px]">
            <summary className="cursor-pointer text-slate-400">
              Reading the map
            </summary>

            <dl className="mt-5 space-y-4">
              {Object.entries(DEFINITIONS).map(([term, description]) => (
                <div key={term}>
                  <dt className="font-semibold text-slate-300">
                    {term}
                  </dt>
                  <dd className="mt-1 leading-7 text-slate-400">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </div>
    </aside>
  );
}

/* ============================================================
   COURSE STAR SYSTEMS
   ============================================================ */

function CourseNode({ data }) {
  const {
    course,
    accent,
    focused,
    launchpad,
    completed,
    progressEnabled,
  } = data;

  const handleStyle = {
    width: 5,
    height: 5,
    top: 29,
    left: 26,
    right: "auto",
    background: accent,
    border: 0,
    opacity: 0,
    pointerEvents: "none",
  };

  return (
    <div
      className="relative w-[232px] px-3 py-3"
      style={{
        color: accent,
        border: `1px solid ${focused ? "#ffffff" : "transparent"}`,
        background: focused ? "rgba(8, 15, 26, 0.8)" : "transparent",
      }}
      title={`${course.code}: ${course.title}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={false}
        style={handleStyle}
      />

      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{
            border: `1px solid ${accent}88`,
            boxShadow: `0 0 18px ${accent}20`,
          }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 12px ${accent}aa`,
            }}
          />

          {launchpad && (
            <span
              className="absolute -inset-1 rounded-full"
              style={{ border: `1px solid ${accent}44` }}
            />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-[21px] font-semibold leading-7 tracking-[0.02em]">
            {course.code}
          </div>

          <div className="mt-1 text-[14px] leading-[1.5] text-slate-300">
            {course.title}
          </div>

          <div className="mt-2 text-[10px] tracking-[0.06em] text-slate-400">
            {course.tier}
          </div>

          {launchpad && (
            <span
              className="mt-1 inline-block border-b border-dotted text-[10px] tracking-[0.03em]"
              style={{ borderColor: `${accent}88` }}
              title={`${LAUNCHPAD_DEFINITION}\n\n${course.launch}`}
            >
              LAUNCHPAD INSIGHT
            </span>
          )}

          {progressEnabled && completed && (
            <div className="mt-1 text-[10px] tracking-[0.06em] text-slate-200">
              COMPLETED
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={false}
        style={handleStyle}
      />
    </div>
  );
}

const NODE_TYPES = {
  course: CourseNode,
};

/* ============================================================
   GALAXY BACKGROUND
   ============================================================ */

const STAR_FIELD = Array.from({ length: 90 }, (_, index) => ({
  id: index,
  left: `${(index * 37.31 + 7) % 100}%`,
  top: `${(index * 61.73 + 11) % 100}%`,
  size: index % 11 === 0 ? 2 : 1,
  opacity: 0.12 + (index % 5) * 0.065,
}));

function GalaxyBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute -inset-[12%] motion-safe:animate-[hyperlane-nebula_40s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse at 18% 28%, rgba(25,88,86,0.15), transparent 38%)",
            "radial-gradient(ellipse at 77% 30%, rgba(39,57,109,0.18), transparent 40%)",
            "radial-gradient(ellipse at 63% 82%, rgba(69,43,93,0.10), transparent 35%)",
          ].join(","),
        }}
      />

      <div className="absolute -inset-[3%] motion-safe:animate-[hyperlane-stars_60s_linear_infinite_alternate]">
        {STAR_FIELD.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-slate-300"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   TELEMETRY LEGEND
   ============================================================ */

function TelemetryLegend() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={CONTROL_CLASS}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Map Telemetry Legend
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="telemetry-legend-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setOpen(false);
          }
        }}
        className="m-auto max-h-[85dvh] w-[min(480px,calc(100vw-32px))] overflow-y-auto border border-slate-600 bg-[#080f19] p-0 text-slate-300 shadow-2xl backdrop:bg-black/70"
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-700 p-5">
          <h2
            id="telemetry-legend-title"
            className="text-[13px] font-semibold tracking-[0.06em]"
          >
            MAP TELEMETRY LEGEND
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className={CONTROL_CLASS}
          >
            Close
          </button>
        </div>

        <dl className="space-y-5 p-5 text-[14px] leading-7">
          <div>
            <dt className="font-semibold text-slate-100">
              Highlighted Hyperlanes
            </dt>
            <dd className="mt-1 text-slate-400">
              Core active career trajectory paths.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-100">
              White Node Border
            </dt>
            <dd className="mt-1 text-slate-400">
              Currently focused course.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-100">
              Launchpad Tag
            </dt>
            <dd className="mt-1 text-slate-400">
              Critical industry springboard milestone.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-100">
              Optional / Secondary Hyperlane
            </dt>
            <dd className="mt-1 text-slate-400">
              A dashed supplementary learning connection, when present.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-100">
              Research Pending
            </dt>
            <dd className="mt-1 text-slate-400">
              A career destination whose course recommendations have not
              yet been established through source review.
            </dd>
          </div>
        </dl>

        <div className="space-y-4 border-t border-slate-800 p-5 text-[12px] leading-7 text-slate-400">
          <p>{LAUNCHPAD_DEFINITION}</p>
          <p>{DEFINITIONS.Hyperlane}</p>
          <p>Academic scope: GMU Computer Science, BS.</p>
        </div>
      </dialog>
    </>
  );
}

/* ============================================================
   CAMERA AND CONTAINER RESIZING
   ============================================================ */

function animationDuration() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : 450;
}

function GalaxyFitController({
  containerRef,
  selectedCareer,
  viewMode,
  hasCourses,
}) {
  const flow = useReactFlow();
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    const container = containerRef.current;

    if (
      !container ||
      !hasCourses ||
      !nodesInitialized ||
      viewMode === "intelligence"
    ) {
      return undefined;
    }

    let timeoutId;
    let frameId;
    let disposed = false;

    const scheduleFit = () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);

      timeoutId = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(() => {
          if (
            disposed ||
            container.clientWidth === 0 ||
            container.clientHeight === 0
          ) {
            return;
          }

          void flow.fitView({
            padding: 0.12,
            minZoom: 0.08,
            maxZoom: 1.2,
            duration: animationDuration(),
          });
        });
      }, 150);
    };

    const observer = new ResizeObserver(scheduleFit);
    observer.observe(container);
    scheduleFit();

    return () => {
      disposed = true;
      observer.disconnect();
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [
    containerRef,
    flow,
    nodesInitialized,
    selectedCareer,
    viewMode,
    hasCourses,
  ]);

  return null;
}

/* ============================================================
   GALAXY
   ============================================================ */

function GalaxyMap({
  selectedCareer,
  selectedCourse,
  onSelectCourse,
  onResetCareer,
  viewMode,
  onChangeView,
  progressEnabled,
  completedCourses,
}) {
  const canvasRef = useRef(null);
  const { fitView, getNodes, setCenter } = useReactFlow();

  const [positions, setPositions] = useState(GALAXY_COORDINATES);

  const expanded = viewMode === "galaxy";
  const career = selectedCareer ? CAREERS[selectedCareer] : null;
  const pending = career?.status === "research-pending";

  const accent = selectedCareer
    ? CAREER_COLORS[selectedCareer]
    : NEUTRAL_COLOR;

  const activeIds = useMemo(
    () =>
      new Set(
        selectedCareer
          ? CAREERS[selectedCareer].courses
          : V1_COURSE_IDS,
      ),
    [selectedCareer],
  );

  const hasCourses = activeIds.size > 0;

  const launchpadIds = useMemo(
    () =>
      selectedCareer
        ? new Set(LAUNCHPAD_COURSES[selectedCareer] ?? [])
        : ALL_LAUNCHPAD_COURSES,
    [selectedCareer],
  );

  const nodes = useMemo(
    () =>
      Array.from(activeIds).map((id) => ({
        id,
        type: "course",
        position: positions[id],
        selected: selectedCourse === id,
        ariaLabel: `${COURSE_CATALOG[id].code}, ${COURSE_CATALOG[id].title}`,
        data: {
          course: COURSE_CATALOG[id],
          accent,
          focused: selectedCourse === id,
          launchpad: launchpadIds.has(id),
          completed: completedCourses.has(id),
          progressEnabled,
        },
      })),
    [
      activeIds,
      positions,
      selectedCourse,
      accent,
      launchpadIds,
      completedCourses,
      progressEnabled,
    ],
  );

  const edges = useMemo(
    () =>
      HYPERLANES.filter(
        ([source, target]) =>
          V1_COURSE_SET.has(source) &&
          V1_COURSE_SET.has(target) &&
          activeIds.has(source) &&
          activeIds.has(target),
      ).map(([source, target]) => {
        const supplementary =
          COURSE_CATALOG[source].tier === "SUPPLEMENTARY" ||
          COURSE_CATALOG[target].tier === "SUPPLEMENTARY";

        return {
          id: `hyperlane-${source}-${target}`,
          source,
          target,
          type: "straight",
          selectable: false,
          focusable: false,
          style: {
            stroke: selectedCareer ? accent : "#64748b",
            strokeWidth: selectedCareer ? 1.8 : 1.2,
            strokeOpacity: selectedCareer ? 0.85 : 0.5,
            strokeDasharray: supplementary ? "5 6" : undefined,
            filter: selectedCareer
              ? `drop-shadow(0 0 3px ${accent}55)`
              : undefined,
          },
        };
      }),
    [activeIds, selectedCareer, accent],
  );

  const onNodesChange = useCallback((changes) => {
    const positionChanges = changes.filter(
      (change) => change.type === "position" && change.position,
    );

    if (positionChanges.length === 0) return;

    setPositions((current) => {
      const updated = { ...current };

      for (const change of positionChanges) {
        updated[change.id] = change.position;
      }

      return updated;
    });
  }, []);

  const fitEntireGalaxy = useCallback(() => {
    if (!hasCourses) return;

    void fitView({
      padding: 0.12,
      minZoom: 0.08,
      maxZoom: 1.2,
      duration: animationDuration(),
    });
  }, [fitView, hasCourses]);

  /*
   * Recenter preserves a readable scale when the full overview
   * would make labels too small. Fit All remains available for
   * seeing the complete constellation at once.
   */
  const recenterGalaxy = useCallback(() => {
    const visibleNodes = getNodes().filter((node) =>
      activeIds.has(node.id),
    );

    if (visibleNodes.length === 0) return;

    const selectedNode = visibleNodes.find(
      (node) => node.id === selectedCourse,
    );

    if (selectedNode) {
      const width = selectedNode.measured?.width ?? 232;
      const height = selectedNode.measured?.height ?? 160;

      void setCenter(
        selectedNode.position.x + width / 2,
        selectedNode.position.y + height / 2,
        {
          zoom: 1,
          duration: animationDuration(),
        },
      );
      return;
    }

    const minX = Math.min(...visibleNodes.map((node) => node.position.x));
    const minY = Math.min(...visibleNodes.map((node) => node.position.y));
    const maxX = Math.max(
      ...visibleNodes.map(
        (node) => node.position.x + (node.measured?.width ?? 232),
      ),
    );
    const maxY = Math.max(
      ...visibleNodes.map(
        (node) => node.position.y + (node.measured?.height ?? 160),
      ),
    );

    void setCenter((minX + maxX) / 2, (minY + maxY) / 2, {
      zoom: 0.85,
      duration: animationDuration(),
    });
  }, [activeIds, getNodes, selectedCourse, setCenter]);

  return (
    <section
      id="galaxy-workspace"
      aria-label="Interactive CS-BS career constellation"
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#03060c]"
    >
      <div className="relative z-20 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 bg-[#060b13] px-3 py-2 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          {selectedCareer ? (
            <button
              type="button"
              onClick={onResetCareer}
              className={CONTROL_CLASS}
            >
              Back to All Careers
            </button>
          ) : (
            <span className="px-1 text-[11px] leading-6 tracking-[0.06em] text-slate-400">
              ALL SECTORS / {activeIds.size} SYSTEMS
            </span>
          )}

          {career && (
            <span
              className="hidden text-[11px] tracking-[0.04em] xl:inline"
              style={{ color: accent }}
            >
              {career.name.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {expanded && (
            <button
              type="button"
              onClick={() => onChangeView("intelligence")}
              className={CONTROL_CLASS}
            >
              Course Intelligence
            </button>
          )}

          <button
            type="button"
            onClick={() => onChangeView(expanded ? "split" : "galaxy")}
            className={CONTROL_CLASS}
            aria-expanded={expanded}
            aria-controls="galaxy-canvas"
          >
            <ExpandIcon collapse={expanded} />
            {expanded ? "Exit Expanded Galaxy" : "Expand Galaxy"}
          </button>
        </div>
      </div>

      <div
        ref={canvasRef}
        id="galaxy-canvas"
        className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
      >
        <GalaxyBackdrop />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          onNodesChange={onNodesChange}
          onNodeClick={(_, node) => onSelectCourse(node.id)}
          onPaneClick={() => onSelectCourse(null)}
          nodesDraggable
          nodesConnectable={false}
          edgesFocusable={false}
          nodesFocusable
          elementsSelectable
          selectionOnDrag={false}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          minZoom={0.08}
          maxZoom={2.5}
          deleteKeyCode={null}
          fitView
          fitViewOptions={{
            padding: 0.12,
            minZoom: 0.08,
            maxZoom: 1.2,
          }}
          style={{ background: "transparent" }}
        >
          <Background gap={42} size={0.65} color="#253044" />

          <GalaxyFitController
            containerRef={canvasRef}
            selectedCareer={selectedCareer}
            viewMode={viewMode}
            hasCourses={hasCourses}
          />

          {hasCourses && (
            <>
              <Controls
                position="top-right"
                showInteractive={false}
                className="!m-3 !border !border-slate-700 !bg-[#080e17] !shadow-none"
              />

              <MiniMap
                position="bottom-right"
                pannable
                zoomable
                nodeColor={() => accent}
                nodeStrokeColor={(node) =>
                  node.id === selectedCourse ? "#ffffff" : accent
                }
                nodeStrokeWidth={2}
                maskColor="rgba(3, 6, 12, 0.72)"
                className="!m-3 !h-[76px] !w-[116px] !border !border-slate-800 !bg-[#060c15] sm:!h-[92px] sm:!w-[146px]"
              />
            </>
          )}
        </ReactFlow>

        {hasCourses && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[calc(100%-80px)] text-[10px] leading-6 tracking-[0.06em] text-slate-400">
            DRAG TO EXPLORE · SCROLL TO ZOOM · SELECT A STAR
          </div>
        )}

        {pending && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 pb-24 pt-5">
            <div
              role="status"
              className="pointer-events-auto max-h-full w-full max-w-lg overflow-y-auto border border-slate-700 bg-[#080f19]/95 p-6 shadow-2xl sm:p-8"
            >
              <Eyebrow>IT & Systems / Research pending</Eyebrow>

              <h2 className="mt-4 text-2xl font-semibold leading-9 text-slate-100">
                A career destination.
                <br />
                A CS-BS route under review.
              </h2>

              <p className="mt-4 text-[14px] leading-7 text-slate-400">
                {career.research.summary}
              </p>

              <p className="mt-4 text-[12px] leading-7 text-slate-500">
                {career.research.methodology}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onChangeView("intelligence")}
                  className={CONTROL_CLASS}
                >
                  View Research Criteria
                </button>

                <button
                  type="button"
                  onClick={onResetCareer}
                  className={CONTROL_CLASS}
                >
                  Back to All Careers
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`absolute bottom-3 left-3 z-20 flex flex-col items-start gap-2 ${
            hasCourses
              ? "max-w-[calc(100%-150px)]"
              : "max-w-[calc(100%-24px)]"
          }`}
        >
          {hasCourses && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={recenterGalaxy}
                className={CONTROL_CLASS}
                title="Center the selected course or constellation at a readable zoom"
              >
                Recenter Galaxy
              </button>

              <button
                type="button"
                onClick={fitEntireGalaxy}
                className={CONTROL_CLASS}
                title="Fit every course in the current constellation"
              >
                Fit All
              </button>
            </div>
          )}

          <TelemetryLegend />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TELEMETRY STATUS
   ============================================================ */

function StatusBar({
  selectedCareer,
  selectedCourse,
  viewMode,
  progressEnabled,
  onToggleProgress,
  completedCourses,
}) {
  const career = selectedCareer ? CAREERS[selectedCareer] : null;
  const registry = career ? career.courses : V1_COURSE_IDS;
  const pending = career?.status === "research-pending";

  const completedCount = registry.filter((id) =>
    completedCourses.has(id),
  ).length;

  return (
    <footer className="relative z-30 flex shrink-0 flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-slate-800 bg-[#060b12] px-4 py-2 text-[10px] leading-6 tracking-[0.02em] text-slate-400">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />
          GMU / CS BS
        </span>

        <span>
          {pending
            ? "COURSE MAPPING / RESEARCH PENDING"
            : `${registry.length} COURSE SYSTEMS`}
        </span>

        <span className="hidden lg:inline">FOG OF WAR / OFF</span>

        {selectedCourse && registry.includes(selectedCourse) && (
          <span className="text-slate-200">
            FOCUS / {COURSE_CATALOG[selectedCourse].code}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={progressEnabled}
            onChange={onToggleProgress}
            className="h-3.5 w-3.5 accent-emerald-400"
          />
          Enable Progress Tracking Mode
        </label>

        {progressEnabled && !pending && (
          <span>
            {completedCount}/{registry.length} COMPLETE · SESSION
          </span>
        )}

        <span className="hidden uppercase xl:inline">
          VIEW / {viewMode}
        </span>
      </div>
    </footer>
  );
}

/* ============================================================
   APPLICATION STATE
   ============================================================ */

function AppContent({ active, onOpenStrategy }) {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState("split");

  const [progressEnabled, setProgressEnabled] = useState(false);
  const [completedCourses, setCompletedCourses] = useState(
    () => new Set(),
  );

  const context = useMemo(
    () => createExplorationContext(selectedCareer, selectedCourse),
    [selectedCareer, selectedCourse],
  );

  const selectCareer = useCallback((careerId) => {
    if (careerId !== null && !CAREERS[careerId]) return;

    setSelectedCareer(careerId);
    setSelectedCourse(null);
  }, []);

  const selectCourse = useCallback(
    (courseId) => {
      if (courseId === null) {
        setSelectedCourse(null);
        return;
      }

      const registry = selectedCareer
        ? CAREERS[selectedCareer].courses
        : V1_COURSE_IDS;

      if (registry.includes(courseId) && COURSE_CATALOG[courseId]) {
        setSelectedCourse(courseId);
      }
    },
    [selectedCareer],
  );

  const changeView = useCallback((mode) => {
    if (["split", "intelligence", "galaxy"].includes(mode)) {
      setViewMode(mode);
    }
  }, []);

  const toggleCompleted = useCallback((courseId) => {
    if (!V1_COURSE_SET.has(courseId)) return;

    setCompletedCourses((current) => {
      const updated = new Set(current);

      if (updated.has(courseId)) {
        updated.delete(courseId);
      } else {
        updated.add(courseId);
      }

      return updated;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        !active ||
        event.key !== "Escape" ||
        event.defaultPrevented ||
        document.querySelector("dialog[open]")
      ) {
        return;
      }

      setViewMode("split");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <div className="flex h-full w-full min-w-[320px] flex-col overflow-hidden bg-[#03060c] font-mono text-slate-100">
      <style>{`
        @keyframes hyperlane-nebula {
          from {
            transform: translate3d(-1%, -1%, 0) scale(1);
          }
          to {
            transform: translate3d(2%, 1%, 0) scale(1.05);
          }
        }

        @keyframes hyperlane-stars {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(1.5%, -1%, 0);
          }
        }
      `}</style>

      <TrackingHeader />

      <main
        className={
          viewMode === "split"
            ? "grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,0.36fr)_minmax(0,0.64fr)] overflow-hidden md:grid-cols-[330px_minmax(0,1fr)] md:grid-rows-1 xl:grid-cols-[380px_minmax(0,1fr)]"
            : "grid min-h-0 flex-1 grid-cols-1 grid-rows-1 overflow-hidden"
        }
      >
        <div
          className={
            viewMode === "galaxy"
              ? "hidden"
              : "min-h-0 min-w-0 overflow-hidden"
          }
        >
          <Sidebar
            onOpenStrategy={onOpenStrategy}
            context={context}
            viewMode={viewMode}
            onChangeView={changeView}
            onSelectCourse={selectCourse}
            onBackToCareer={() => setSelectedCourse(null)}
            progressEnabled={progressEnabled}
            completedCourses={completedCourses}
            onToggleCompleted={toggleCompleted}
          />
        </div>

        <div
          className={
            viewMode === "intelligence"
              ? "hidden"
              : "flex min-h-0 min-w-0 flex-col overflow-hidden"
          }
        >
          <TrajectoryHeader
            selectedCareer={selectedCareer}
            onSelectCareer={selectCareer}
            viewMode={viewMode}
          />

          <GalaxyMap
            selectedCareer={selectedCareer}
            selectedCourse={context.selectedCourseId}
            onSelectCourse={selectCourse}
            onResetCareer={() => selectCareer(null)}
            viewMode={viewMode}
            onChangeView={changeView}
            progressEnabled={progressEnabled}
            completedCourses={completedCourses}
          />
        </div>
      </main>

      <StatusBar
        selectedCareer={selectedCareer}
        selectedCourse={context.selectedCourseId}
        viewMode={viewMode}
        progressEnabled={progressEnabled}
        onToggleProgress={() => setProgressEnabled((current) => !current)}
        completedCourses={completedCourses}
      />
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("map");
  const strategyRef = useRef(null);
  const mapButtonRef = useRef(null);
  const openStrategy = useCallback(() => setActivePage("strategy"), []);

  useEffect(() => {
    if (activePage === "strategy") strategyRef.current?.focus();
  }, [activePage]);

  return (
    <ReactFlowProvider>
      <div className="ai-strategy-shell">
        <nav className="ai-strategy-navigation" aria-label="Hyperlane navigation">
          <button ref={mapButtonRef} type="button" aria-current={activePage === "map" ? "page" : undefined} aria-controls="hyperlane-map-page" onClick={() => setActivePage("map")}>Career Map</button>
          <button type="button" aria-current={activePage === "strategy" ? "page" : undefined} aria-controls="hyperlane-strategy-page" onClick={openStrategy}>AI-Era Learning Strategy</button>
        </nav>
        <div className="ai-strategy-workspace">
          <div id="hyperlane-map-page" className="ai-strategy-map-surface" data-active={activePage === "map"} inert={activePage !== "map"} aria-hidden={activePage !== "map"}>
            <AppContent active={activePage === "map"} onOpenStrategy={openStrategy} />
          </div>
          <main id="hyperlane-strategy-page" ref={strategyRef} tabIndex={-1} className="ai-strategy-reading-surface" hidden={activePage !== "strategy"} aria-label="AI-Era Learning Strategy" onKeyDown={event => {
            if (event.key === "Escape") {
              event.preventDefault();
              setActivePage("map");
              mapButtonRef.current?.focus();
            }
          }}>
            <AiLearningStrategy careers={CAREERS} />
          </main>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
