/* Presentation content — copy is drawn from the Numena brand strategy and docs/03–05. */

export const nav = [
  { id: "brand-idea", label: "Idea" },
  { id: "purpose-audience", label: "Purpose" },
  { id: "positioning", label: "Positioning" },
  { id: "principles", label: "Principles" },
  { id: "logo", label: "Logo" },
  { id: "typography", label: "Type" },
  { id: "color", label: "Color" },
  { id: "visual", label: "Visual language" },
  { id: "product", label: "Product" },
  { id: "voice", label: "Voice" },
] as const;

export const principles = [
  {
    title: "Complexity deserves careful treatment",
    body: "People cannot be fully understood through isolated observations, fixed categories, or premature conclusions. Numena should help organize complexity without pretending to eliminate it — preserving the context and nuance that give information meaning.",
    question: "Does this make complex information easier to understand without oversimplifying it?",
  },
  {
    title: "Observation is not interpretation",
    body: "What is noticed, what is inferred, and what is concluded are different kinds of information. Numena should make these distinctions clear wherever they matter, so interpretations never become indistinguishable from the observations that informed them.",
    question: "Can a psychologist distinguish what they observed from what they believe it might mean?",
  },
  {
    title: "Understanding develops over time",
    body: "Initial impressions can be useful starting points, but they are not necessarily complete explanations. Numena should support revisiting earlier interpretations, considering alternatives, and incorporating new information rather than treating revision as a failure.",
    question: "Does this support the development of understanding, or does it encourage premature closure?",
  },
  {
    title: "Uncertainty should be acknowledged, not concealed",
    body: "Incomplete information is a normal part of complex reasoning, and hiding it can make an interpretation appear more reliable than it is. Numena should communicate limitations clearly and represent uncertainty in ways that help psychologists decide what needs further consideration.",
    question: "Does this accurately communicate what is known, what is inferred, and what remains unresolved?",
  },
  {
    title: "Professional judgment remains with the psychologist",
    body: "Technology can help organize information and explore possibilities, but it should not obscure responsibility for professional decisions. Numena should support reasoning, provide opportunities for review, and never present automated suggestions as authoritative conclusions.",
    question: "Does this support the psychologist's judgment while preserving their ability to question, reject, or revise a suggestion?",
  },
  {
    title: "Structure should serve understanding",
    body: "Organization is valuable when it helps people see relationships, identify gaps, and work more clearly. Structure becomes counterproductive when it imposes unnecessary complexity or forces human experience into unsuitable categories.",
    question: "Does this structure help the psychologist think or work better, or does it simply add another layer of administration?",
  },
  {
    title: "Trust must be earned through behavior",
    body: "A professional product should not rely on authoritative language, visual polish, or claims of intelligence to establish credibility. Trust comes from clarity, consistency, transparency about limitations, and careful treatment of information.",
    question: "Can the product substantiate the confidence its interface and messaging invite?",
  },
] as const;

export const strategyNeeds = [
  {
    title: "Structure without oversimplification",
    body: "Organize complex information without reducing a person's experience to disconnected fields, rigid categories, or a single explanation.",
  },
  {
    title: "Connections between observations",
    body: "Examine how information relates, recognize possible patterns, and distinguish what has been observed from what has been inferred.",
  },
  {
    title: "Room for multiple explanations",
    body: "Explore hypotheses and alternatives without treating an initial interpretation as an established conclusion.",
  },
  {
    title: "Continuity over time",
    body: "Revisit information, track changes in understanding, and preserve the development of professional reasoning.",
  },
  {
    title: "Transparency and professional control",
    body: "Keep source information, interpretations, uncertainty, and decisions distinct — the psychologist retains responsibility for professional judgment.",
  },
] as const;

export const strategyPromiseList = [
  "Information should be easier to organize and revisit.",
  "Observations should remain distinguishable from interpretations and hypotheses.",
  "Possible explanations should not be presented as established facts.",
  "Uncertainty should be visible where it matters.",
  "Changes in understanding should be possible to examine over time.",
  "Psychologists should retain control over their reasoning and professional decisions.",
] as const;

export const colors = [
  {
    name: "Deep purple",
    hex: "#462279",
    role: "Identity and primary action",
    signals: "Depth, seriousness, distinction.",
  },
  {
    name: "Pale lavender",
    hex: "#EBE7F0",
    role: "Space and rest",
    signals: "A quiet surface. Room to pause and think.",
  },
  {
    name: "Soft peach",
    hex: "#F39D72",
    role: "Warmth — human moments only",
    signals: "The person behind the case.",
  },
  {
    name: "Bright cyan",
    hex: "#47DDF3",
    role: "Connection",
    signals: "Something links outward to a source.",
  },
  {
    name: "Bright lilac",
    hex: "#AE6DF0",
    role: "Focus",
    signals: "Where attention is right now.",
  },
] as const;

export const neutrals = [
  { name: "White", hex: "#FFFFFF", note: "Surface" },
  { name: "Charcoal", hex: "#2B2B33", note: "Text — proposed" },
] as const;

export const typeScale = [
  {
    name: "H1 — page headline",
    spec: "Tiempos Text Bold · 48 / 56 · −0.01em",
    sample: "The reasoning behind the work is visible",
    className: "ts-h1",
  },
  {
    name: "H2 — section headline",
    spec: "Tiempos Text Bold · 36 / 44 · −0.01em",
    sample: "Trace a hypothesis back to its source",
    className: "ts-h2",
  },
  {
    name: "H3 — subsection headline",
    spec: "Tiempos Text Bold · 28 / 36",
    sample: "What the evidence suggests",
    className: "ts-h3",
  },
  {
    name: "H4 — minor heading",
    spec: "Albert Sans Medium · 20 / 28",
    sample: "Current hypothesis",
    className: "ts-h4",
  },
  {
    name: "Body large",
    spec: "Albert Sans Regular · 18 / 28",
    sample:
      "Clinical reasoning is mostly invisible. Numena gives that reasoning a place to live — observations, themes, hypotheses, and decisions kept together and in view.",
    className: "ts-body-large",
  },
  {
    name: "Body",
    spec: "Albert Sans Regular · 16 / 24",
    sample:
      "The serif appears where attention is earned; the sans carries everything that has to work. Body text never drops below 16.",
    className: "ts-body",
  },
  {
    name: "Small",
    spec: "Albert Sans Regular · 14 / 20",
    sample: "Secondary text and dense tables. Nothing goes below 12.",
    className: "ts-small",
  },
  {
    name: "Label, button, navigation",
    spec: "Albert Sans Medium · 14 / 20",
    sample: "Working hypothesis",
    className: "ts-label",
  },
  {
    name: "Caption, metadata",
    spec: "Albert Sans Regular · 12 / 16 · +0.01em",
    sample: "Revised three times · May 2026",
    className: "ts-caption",
  },
] as const;

export const voicePrinciples = [
  {
    title: "Be thoughtful",
    body: "We don't rush to conclusions. We make space for complexity without making things unnecessarily complicated, and we avoid absolute claims the evidence doesn't support.",
  },
  {
    title: "Be human",
    body: "Speak one-to-one — you, your, we, our. Contractions are fine. Write as though you're speaking with a thoughtful professional, not presenting to an audience.",
  },
  {
    title: "Be rigorous",
    body: "Say what we know and don't hide uncertainty. Words like might, possible and uncertain aren't weaknesses when they're accurate. Explain the reasoning.",
  },
  {
    title: "Be quietly confident",
    body: "Assured, not authoritative. The confidence should come from the idea itself — quiet confidence is still confidence.",
  },
] as const;

export const voiceExamples = [
  "Your notes contain more than documentation. They contain the reasoning behind your work.",
  "This pattern appears in three sessions. It's worth investigating, but it's not enough to establish an explanation.",
  "See which observations support a pattern, which contradict it, and what information is still missing.",
  "Less time reconstructing your reasoning. More time thinking about it.",
] as const;

export const voicePairs = [
  {
    avoid: "Understand your clients better with AI.",
    prefer: "See patterns across your work, while keeping the context behind them in view.",
    why: "Make room for nuance — say what the product actually does.",
  },
  {
    avoid: "Unlock deeper clinical insights.",
    prefer: "Trace a hypothesis back to the observations that informed it.",
    why: "It tells you something; the other only sounds like marketing.",
  },
] as const;

export const avoidWords = [
  "leverage",
  "optimize workflows",
  "unlock insights",
  "drive efficiency",
  "empower practitioners",
  "next-generation",
  "AI-powered",
] as const;

export const weAreNot = [
  ["Thoughtful", "Vague"],
  ["Clear", "Simplistic"],
  ["Human", "Casual"],
  ["Rigorous", "Academic"],
  ["Curious", "Uncertain"],
  ["Confident", "Arrogant"],
  ["Warm", "Cheerful for the sake of it"],
  ["Reflective", "Introspective to the point of abstraction"],
  ["Precise", "Technical"],
  ["Quiet", "Bland"],
] as const;

export const voiceTest = [
  ["Is it clear?", "Could someone understand it without knowing our terminology?"],
  ["Is it honest?", "Are we claiming more than we can support?"],
  ["Is it human?", "Would a psychologist actually say this?"],
  ["Is it useful?", "Does the reader learn something, or understand what the product does?"],
  ["Is it ours?", "Could any generic AI startup say the same thing? If yes, rewrite it."],
] as const;

export const reasoningChain = [
  { label: "Observation", icon: "eye" },
  { label: "Theme", icon: "label" },
  { label: "Hypothesis", icon: "compass" },
  { label: "Evidence", icon: "quote" },
  { label: "Decision", icon: "triangle-flag" },
] as const;