import { DEFAULTS } from '../config/defaults.js';
import { store, KEYS } from './storage.js';

// Structure always comes from DEFAULTS; saved values are adopted only
// where the leaf is a string. A stale or partial saved object can never
// break the fixed settings shape.
function mergeInto(base, saved) {
  if (typeof base === 'string') return typeof saved === 'string' ? saved : base;
  if (Array.isArray(base)) {
    return base.map((item, i) => mergeInto(item, Array.isArray(saved) ? saved[i] : undefined));
  }
  const out = {};
  for (const key of Object.keys(base)) {
    out[key] = mergeInto(base[key], saved && typeof saved === 'object' ? saved[key] : undefined);
  }
  return out;
}

export function loadSettings() {
  const raw = store.get(KEYS.settings);
  if (raw === null) return DEFAULTS;
  try {
    return mergeInto(DEFAULTS, JSON.parse(raw));
  } catch {
    return DEFAULTS;
  }
}

export function saveSettings(settings) {
  store.set(KEYS.settings, JSON.stringify(settings));
}

function leavesAreStrings(value) {
  if (typeof value === 'string') return true;
  if (Array.isArray(value)) return value.every(leavesAreStrings);
  if (value && typeof value === 'object') return Object.values(value).every(leavesAreStrings);
  return false; // numbers, booleans, null — not valid settings leaves
}

// Validate pasted settings text. Returns a settings object rebuilt on
// the DEFAULTS structure, or null if the paste isn't acceptable:
// valid JSON, the five top-level keys, chip rows exactly 6/3/3, and
// every leaf a string.
export function parseSettings(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  for (const key of ['app', 'colors', 'chips', 'buttons', 'footer']) {
    if (!(key in parsed)) return null;
  }
  const rows = { mood: 6, effort: 3, food: 3 };
  if (!parsed.chips || typeof parsed.chips !== 'object') return null;
  for (const [row, count] of Object.entries(rows)) {
    if (!Array.isArray(parsed.chips[row]) || parsed.chips[row].length !== count) return null;
  }
  if (!leavesAreStrings(parsed)) return null;
  return mergeInto(DEFAULTS, parsed);
}
