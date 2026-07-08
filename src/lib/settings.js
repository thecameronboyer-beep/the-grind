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
