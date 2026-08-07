export const homeContent = {
  opening: {
    headlinePart1: "AI activity is everywhere.",
    headlinePart2: "Value is not.",
    supporting:
      "We identify where AI is worth applying, then help put the right solutions into operation.",
    primaryCta: "Start a conversation",
    secondaryCta: "See how it works",
    floatingLabels: [
      "Request",
      "Decision",
      "Workflow",
      "Data",
      "System",
      "Outcome",
    ],
  },

  pattern: {
    questions: [
      "Where is work slowing down?",
      "What decisions depend on missing context?",
      "Which opportunities are large enough to matter?",
    ],
    statement: "We examine the work before choosing the technology.",
    explanation:
      "Processes, teams, data and systems are studied together. The result is a clear view of where intervention makes sense.",
  },

  priority: {
    headline: "Not every idea deserves investment.",
    supporting:
      "Each opportunity is tested against the effort required, the value at stake and the conditions needed to make it work.",
    lenses: {
      value: {
        label: "Value",
        explanation:
          "Focus on the work where improvement would materially affect cost, revenue, speed or quality.",
      },
      ease: {
        label: "Ease",
        explanation:
          "Prefer opportunities that fit the data, systems and skills already available.",
      },
      speed: {
        label: "Speed",
        explanation:
          "Identify what can produce useful evidence without a long transformation programme.",
      },
      risk: {
        label: "Risk",
        explanation:
          "Keep stronger controls where decisions have greater consequences.",
      },
    },
  },

  workflow: {
    headline: "Then we make it real.",
    supporting:
      "A selected use case becomes a working flow across people, systems and decisions.",
    steps: [
      { id: "need", label: "Need" },
      { id: "input", label: "Input" },
      { id: "ai-step", label: "AI step" },
      { id: "human-decision", label: "Human decision" },
      { id: "existing-system", label: "Existing system" },
      { id: "result", label: "Result" },
    ],
    statements: [
      "Define the result first.",
      "Fit the solution to the work.",
      "Keep people in control where judgement matters.",
      "Connect it to the systems already in use.",
    ],
    deliveryMessage:
      "We design, build and integrate the solution.",
  },

  phases: {
    explore: {
      title: "Explore",
      copy: "Find the work worth changing.",
      detail: "Assessment and opportunity selection.",
    },
    build: {
      title: "Build",
      copy: "Turn the chosen use case into a working solution.",
      detail: "Design, integration and delivery.",
    },
    run: {
      title: "Run",
      copy: "Measure what happens and improve what comes next.",
      detail: "Ongoing delivery and control.",
    },
    note: "Start with the full assessment, or bring an initiative that is already defined.",
  },

  operatingSystem: {
    events: [
      "A new request enters.",
      "Relevant context is collected.",
      "AI prepares a recommendation.",
      "A person reviews the decision.",
      "The result returns to the business system.",
      "Performance becomes visible.",
    ],
    headline: "The model is only one part.",
    supporting:
      "The workflow, decision rights, systems and feedback around it determine whether the initiative lasts.",
  },

  entryPoint: {
    question: "Where do you need help?",
    routes: [
      {
        id: "find",
        title: "Find the right opportunity",
        description:
          "We will examine the organisation and identify where AI can create a credible result.",
      },
      {
        id: "deliver",
        title: "Deliver a specific use case",
        description:
          "We will shape the workflow, define the solution and move it into operation.",
      },
      {
        id: "improve",
        title: "Improve what already exists",
        description:
          "We will identify what is limiting use, performance or scale.",
      },
    ],
    primaryCta: "Start a conversation",
    secondaryCta: "Share a use case",
  },

  finalState: {
    headline: "Move from AI activity to AI capability.",
    supporting:
      "Choose what matters. Build what works. Improve it over time.",
    primaryCta: "Start a conversation",
  },
} as const;
