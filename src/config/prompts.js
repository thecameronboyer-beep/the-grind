// Prompt builders, ported verbatim from reference/gym-bestie.html.
// Only the update prompt's first sentence is renamed (per SPEC.md).
// Not editable in dev mode.

const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
export const todayName = () => DAYS[new Date().getDay()];

// a chip with an empty name copies just its emoji (the 😉 rule,
// generalized to any chip renamed that way)
export const chipText = (chip) => (chip.name ? chip.emoji + ' ' + chip.name : chip.emoji);

// bracket-list fallback built from the row's chips, skipping empty-name chips
export const bracketList = (chips) =>
  '[' + chips.filter((c) => c.name).map((c) => c.emoji + ' ' + c.name).join(' / ') + ']';

export function buildPrePrompt(file, moodChips, moodChip) {
  const mood = moodChip ? chipText(moodChip) : bracketList(moodChips);
  return (
    file +
    '\n\n———\nToday is ' + todayName() + '.' +
    '\nMood: ' + mood + '.' +
    "\nGive me today's workout with the dial applied, a 10-song playlist, and one hype line."
  );
}

export function buildPostPrompt(file, effortChips, foodChips, effortChip, foodChip) {
  const effort = effortChip ? chipText(effortChip) : bracketList(effortChips);
  const food = foodChip ? chipText(foodChip) : bracketList(foodChips);
  return (
    file +
    '\n\n———\nToday is ' + todayName() + ". Trained: today's split." +
    '\nEffort: ' + effort + '.' +
    '\nFood mode: ' + food + '.' +
    '\nFeed me.'
  );
}

export function buildUpdatePrompt(file, section, changes) {
  return (
    'Update my source file for THE GRIND. Change ONLY the ' + section +
    ' section based on my request. Keep every other section EXACTLY as it is — same wording, same order.' +
    '\n\nCHANGES I WANT:\n' + changes +
    '\n\nReply with the complete updated file in ONE plain-text code block and nothing else — no commentary. ' +
    "I'm copying it straight back into my app." +
    '\n\nMY CURRENT FILE:\n' + file
  );
}
