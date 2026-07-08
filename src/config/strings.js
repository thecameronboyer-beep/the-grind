// Every user-facing string that is not part of the editable settings
// object lives here. Wording is ported from reference/gym-bestie.html.
// Accents: a1 = mood row + PRE, a2 = effort row + POST, a3 = food row
// + update station (matching the reference's mag/vio/ice assignments).

export const UI = {
  sourceFile: {
    accent: 'a2',
    title: '📄 SOURCE FILE',
    subsec: 'lives here now · everything below bundles it automatically',
    summary: 'the whole app is this text',
    copyFile: 'copy file',
    reset: 'reset to default',
    savedTag: 'saved ✓',
    resetConfirm: 'Reset the source file to the default? Her edits will be gone gone.',
  },
  deck: {
    accent: 'a1',
    title: 'EMOJI DECK',
    subsec: 'tap = copied · tap two rows and they copy together (💀 🍳)',
    rows: [
      { kind: 'mood',   label: 'MOOD · PRE-WORKOUT',       accent: 'a1' },
      { kind: 'effort', label: 'EFFORT · POST-WORKOUT',    accent: 'a2' },
      { kind: 'food',   label: 'FOOD MODE · POST-WORKOUT', accent: 'a3' },
    ],
    selbarPrefix: 'on clipboard:',
    clear: 'clear ×',
  },
  bigTwo: {
    accent: 'a2',
    title: 'THE BIG TWO',
    subsec: 'fresh Gemini chat → tap → paste. done.',
    hint: 'tip: tap a mood chip first and PRE bakes it in. leave it blank and you pick inside Gemini instead.',
    preAccent: 'a1',
    postAccent: 'a2',
  },
  updateStation: {
    accent: 'a3',
    title: '🔧 UPDATE STATION',
    subsec: 'type the change → copy → paste in Gemini → it returns the whole new file',
    button: 'copy update prompt',
    hint: 'when Gemini sends the new file back: copy it → paste it into 📄 SOURCE FILE up top → it auto-saves. that IS the update.',
    sections: [
      { key: 'rules', head: 'RULES', section: 'RULES',
        placeholder: 'e.g. drop the raccoon bit (but why would you)', accent: 'a1' },
      { key: 'split', head: 'SPLIT', section: 'MY SPLIT',
        placeholder: 'e.g. move core to sunday, wed becomes rest', accent: 'a2' },
      { key: 'food', head: 'FOOD', section: 'FOOD PROFILE',
        placeholder: 'e.g. add thai + korean, drop the 15-min limit', accent: 'a3' },
      { key: 'music', head: 'MUSIC', section: 'MUSIC TASTE and MOOD MAPPING',
        placeholder: 'e.g. add crystal castles, map trap to cruising too', accent: 'a1' },
    ],
  },
  fallback: {
    help: 'clipboard said no — long-press inside, Select all, Copy:',
    done: 'done',
  },
};

export const DEV = {
  title: 'DEV MODE',
  subsec: 'values only · structure is law',
  groups: [
    { key: 'app', label: 'APP', accent: 'a2' },
    { key: 'colors', label: 'COLORS', accent: 'a3' },
    { key: 'mood', label: 'MOOD CHIPS', accent: 'a1' },
    { key: 'effort', label: 'EFFORT CHIPS', accent: 'a2' },
    { key: 'food', label: 'FOOD CHIPS', accent: 'a3' },
    { key: 'buttons', label: 'BUTTONS', accent: 'a1' },
    { key: 'footer', label: 'FOOTER', accent: 'a2' },
  ],
  appFields: [
    { key: 'name', label: 'name' },
    { key: 'eyebrow', label: 'eyebrow' },
    { key: 'tagline', label: 'tagline' },
  ],
  colorFields: [
    { key: 'bg', label: 'background' },
    { key: 'card', label: 'card' },
    { key: 'border', label: 'border' },
    { key: 'text', label: 'text' },
    { key: 'muted', label: 'muted text' },
    { key: 'accent1', label: 'accent 1 · mood + pre' },
    { key: 'accent2', label: 'accent 2 · effort + post' },
    { key: 'accent3', label: 'accent 3 · food + updates' },
  ],
  chipFields: [
    { key: 'emoji', label: 'emoji' },
    { key: 'label', label: 'label' },
    { key: 'name', label: 'full name (empty = emoji only)' },
  ],
  buttonFields: [
    { key: 'pre', label: 'pre-workout' },
    { key: 'post', label: 'post-workout' },
  ],
  footerFields: [
    { key: 'laws', label: 'laws' },
    { key: 'rac', label: 'raccoon line' },
  ],
  save: 'SAVE',
  close: 'CLOSE',
  reset: 'RESET TO DEFAULTS',
  settingsGroup: { label: 'SETTINGS', accent: 'a3' },
  copySettings: 'copy settings',
  pasteSettings: 'paste settings',
  pasteLabel: 'paste the settings JSON here',
  pasteApply: 'APPLY',
  pasteCancel: 'CANCEL',
  settingsCopiedToast: 'settings copied — share the fit',
  pasteRejectToast: "that paste wasn't settings, bestie — nothing changed",
  pasteAppliedToast: 'settings applied',
  undo: 'UNDO',
  undoneToast: 'undone — back to the old fit',
  countdown: (n) => `${n} ${n === 1 ? 'tap' : 'taps'} from dev mode…`,
  enteredToast: 'dev mode unlocked',
  savedToast: 'saved — new fit locked in',
  resetConfirm: 'Reset every setting to THE GRIND defaults?',
  resetToast: 'defaults restored',
};

// Combo Matrix — a read-only dev-mode reference for what every emoji
// combo means. Ported verbatim from the source file's build spec; the
// deck itself never explains prefixes (mystery is the point), so this
// lives here, dev-only. One const, one row per line: adding a row later
// is a one-line change. Every glyph is a single codepoint except 🍽️,
// which keeps its variation selector — no ZWJ sequences anywhere.
export const COMBO_MATRIX = {
  accent: 'a3',
  title: 'COMBO MATRIX',
  subsec: 'read-only · what each combo does · dev-only, never shown on the deck',
  grids: [
    {
      key: 'prefixes',
      accent: 'a1',
      label: 'PREFIX PAIRS',
      note: '4×4 · diagonal = sent alone · order never matters',
      rows: [
        { combo: '👴 alone', meaning: 'disappointed week review' },
        { combo: '👵 alone', meaning: 'worried week review' },
        { combo: '🤓 alone', meaning: 'stats week review' },
        { combo: '🤮 alone', meaning: 'repulsed week review' },
        { combo: '👴+👵', meaning: 'argue over what I meant, then go' },
        { combo: '👴+🤓', meaning: 'boomer rant, with citations' },
        { combo: '👴+🤮', meaning: 'gross AND overpriced' },
        { combo: '👵+🤓', meaning: 'fussing, with footnotes' },
        { combo: '👵+🤮', meaning: '"honey I can\'t watch you eat that"' },
        { combo: '🤓+🤮', meaning: 'disgust, with sources' },
      ],
    },
    {
      key: 'effortfood',
      accent: 'a2',
      label: 'EFFORT × FOOD',
      note: '3×3',
      rows: [
        { combo: '🚶🍳', meaning: 'light + quick cook' },
        { combo: '🚶🍽️', meaning: 'light order' },
        { combo: '🚶🧊', meaning: 'light fridge fix (asks first)' },
        { combo: '💪🍳', meaning: 'protein cook' },
        { combo: '💪🍽️', meaning: 'protein order' },
        { combo: '💪🧊', meaning: 'protein fridge fix (asks first)' },
        { combo: '💀🍳', meaning: 'max recovery, minimum steps' },
        { combo: '💀🍽️', meaning: 'biggest recovery order' },
        { combo: '💀🧊', meaning: 'laziest recovery food (asks first)' },
      ],
    },
  ],
  note: 'a prefix wraps ANY workflow combo (👴 💀 🍽️ = grandpa delivers the big recovery order). Voice never changes the pick.',
};

export const TOASTS = {
  fileCopied: 'file copied — back it up in Keep',
  factoryReset: 'back to factory settings',
  comboCopied: (combo) => 'copied ' + combo + ' — no cap',
  selectionCleared: 'selection cleared',
  cleared: 'cleared',
  preCopied: 'PRE prompt copied — go paste it, bestie ⚡',
  postCopied: 'POST copied — feed her, Gemini 🍴',
  updateEmpty: 'type the changes first, bestie',
  updateCopied: (section) => section.split(' ')[0] + ' update copied — paste in Gemini 🔧',
};
