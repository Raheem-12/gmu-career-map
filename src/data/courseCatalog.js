export const COURSE_CATALOG = {

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