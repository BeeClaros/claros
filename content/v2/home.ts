export const homeV2Content = {
  opening: {
    headlinePart1: "Most AI projects deliver activity.",
    headlinePart2: "Few deliver results.",
    supporting:
      "We find the work worth changing, then build the solution that makes it stick.",
    primaryCta: "Start a conversation",
    secondaryCta: "See how we work",
    metrics: [
      { label: "Time to value", value: "8-12 wks" },
      { label: "Use cases assessed", value: "Dozens" },
      { label: "Systems connected", value: "Existing" },
      { label: "People in control", value: "Always" },
    ],
  },

  discover: {
    intro: "We start with your operation, not a vendor catalogue.",
    questions: [
      "Where does work slow down or break down?",
      "Which decisions are made without the right information?",
      "What would a 20% improvement in one area actually be worth?",
    ],
    statement:
      "The answers shape the work. The technology follows from there.",
  },

  focus: {
    headline: "Some problems are worth solving. Some are not.",
    supporting:
      "Each opportunity is measured against four questions before any work begins.",
    quadrants: {
      highImpactLowEffort: {
        label: "Start here",
        description: "High impact, available data, short path to results.",
      },
      highImpactHighEffort: {
        label: "Plan carefully",
        description: "Large upside but requires meaningful investment.",
      },
      lowImpactLowEffort: {
        label: "Only if quick",
        description: "Useful for learning, not for strategic progress.",
      },
      lowImpactHighEffort: {
        label: "Set aside",
        description: "The effort outweighs what success would deliver.",
      },
    },
    axes: {
      x: "Effort",
      y: "Impact",
    },
  },

  blueprint: {
    headline: "Good solutions are designed before they are built.",
    supporting:
      "We map the full flow from the original need to the final result before writing a line of code.",
    steps: [
      {
        id: "trigger",
        label: "Trigger",
        description: "Something enters the workflow.",
      },
      {
        id: "context",
        label: "Context",
        description: "Relevant data is gathered automatically.",
      },
      {
        id: "model",
        label: "AI layer",
        description: "The model produces a structured output.",
      },
      {
        id: "review",
        label: "Human review",
        description: "A person decides where judgement is needed.",
      },
      {
        id: "action",
        label: "Action",
        description: "The result feeds into the existing system.",
      },
      {
        id: "signal",
        label: "Signal",
        description: "Performance becomes visible and measurable.",
      },
    ],
  },

  phases: {
    headline: "Three stages. No surprises.",
    items: [
      {
        number: "01",
        title: "Assess",
        copy: "Understand the operation and identify where AI creates genuine value.",
        detail: "Diagnostic, opportunity selection, and business case.",
      },
      {
        number: "02",
        title: "Build",
        copy: "Design the workflow, connect the systems, and deliver a working solution.",
        detail: "Architecture, integration, and deployment.",
      },
      {
        number: "03",
        title: "Operate",
        copy: "Measure what happens, improve what does not work, and scale what does.",
        detail: "Monitoring, iteration, and ongoing delivery.",
      },
    ],
    note: "Start with the full assessment, or bring a use case that is already defined.",
  },

  intelligence: {
    headline: "The model is the smallest part of the system.",
    supporting:
      "What surrounds the model - the data, the decisions, the integrations, the feedback - determines whether it delivers lasting value.",
    stack: [
      {
        id: "data",
        label: "Data",
        description: "Clean inputs from the systems already in use.",
      },
      {
        id: "model",
        label: "Model",
        description: "Structured output matched to the specific task.",
      },
      {
        id: "decision",
        label: "Decision",
        description: "Human judgement applied where it matters.",
      },
      {
        id: "action",
        label: "Action",
        description: "The result returned to the business system.",
      },
      {
        id: "feedback",
        label: "Feedback",
        description: "Performance tracked and used to improve.",
      },
    ],
  },

  path: {
    headline: "Where should we begin?",
    supporting: "Choose the starting point that fits where you are now.",
    routes: [
      {
        id: "assess",
        number: "A",
        title: "Find the right opportunity",
        description:
          "We examine the organisation, map the work, and identify where AI can create a credible result.",
        cta: "Start with an assessment",
      },
      {
        id: "build",
        number: "B",
        title: "Build a specific solution",
        description:
          "You know the use case. We design the workflow, build the solution, and put it into operation.",
        cta: "Bring us your use case",
      },
      {
        id: "improve",
        number: "C",
        title: "Fix what already exists",
        description:
          "Something is in place but not delivering. We identify the constraint and resolve it.",
        cta: "Start a conversation",
      },
    ],
  },

  closing: {
    headlinePart1: "Less noise.",
    headlinePart2: "More capability.",
    supporting:
      "We find what matters, build what works, and improve it over time.",
    primaryCta: "Start a conversation",
  },
} as const;
