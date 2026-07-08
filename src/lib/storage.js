// localStorage may be blocked entirely (private mode, embedded webview,
// storage permissions) — probe once and fall back to an in-memory map
// so the app still runs; every call stays inside try/catch.
const memory = new Map();

const backing = (() => {
  try {
    localStorage.setItem('grind-test', '1');
    localStorage.removeItem('grind-test');
    return localStorage;
  } catch {
    return null;
  }
})();

export const KEYS = {
  file: 'grind-file',
  settings: 'grind-settings',
  settingsBackup: 'grind-settings-backup',
};

export const store = {
  get(key) {
    try {
      if (backing) return backing.getItem(key);
      return memory.has(key) ? memory.get(key) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      if (backing) backing.setItem(key, String(value));
      else memory.set(key, String(value));
    } catch {
      /* storage full or blocked — the session keeps working unsaved */
    }
  },
  remove(key) {
    try {
      if (backing) backing.removeItem(key);
      else memory.delete(key);
    } catch {
      /* ignore */
    }
  },
};
