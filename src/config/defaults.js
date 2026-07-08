// The settings object — the exact shape from SPEC.md. Dev mode edits
// values, never structure. Counts are fixed: 6/3/3 chips, 2 buttons.
export const DEFAULTS = {
  app:    { name: "THE GRIND",
            eyebrow: "THE SOURCE-FILE SYSTEM",
            tagline: "one file · two prompts · infinite gains" },
  colors: { bg: "#0E0A17", card: "#191227", border: "#35284F",
            text: "#F2EEFB", muted: "#A79BC8",
            accent1: "#FF5CA8",   // mood row + PRE
            accent2: "#9F7CFF",   // effort row + POST
            accent3: "#7DE8F0" }, // food row + update station
  chips: {
    mood: [
      { emoji: "😡", label: "rage",      name: "rage" },
      { emoji: "😤", label: "locked in", name: "locked in" },
      { emoji: "🙂", label: "cruising",  name: "cruising" },
      { emoji: "😌", label: "easy",      name: "take it easy" },
      { emoji: "😴", label: "fumes",     name: "running on fumes" },
      { emoji: "😉", label: "?",         name: "" }
    ],
    effort: [
      { emoji: "🚶", label: "lowkey", name: "lowkey" },
      { emoji: "💪", label: "solid",  name: "solid" },
      { emoji: "💀", label: "cooked", name: "absolutely cooked" }
    ],
    food: [
      { emoji: "🧑‍🍳", label: "cook",    name: "Let Her Cook" },
      { emoji: "🍽️", label: "outside", name: "We Outside" },
      { emoji: "🧊", label: "fridge",  name: "Fridge Raid" }
    ]
  },
  buttons: { pre:  "⚡ PRE-WORKOUT — copy prompt",
             post: "🍴 POST-WORKOUT — copy prompt" },
  footer:  { laws: "THE SPLIT IS LAW · MEXICAN FIRST · COMMIT TO THE BIT",
             rac:  "🦝 raccoon ankles.  jk jk." }
};
