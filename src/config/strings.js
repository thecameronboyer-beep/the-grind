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
    subsec: 'tap = copied · tap two rows and they copy together (💀 🧑‍🍳)',
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
