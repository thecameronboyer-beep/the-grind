import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DEFAULT_FILE } from './config/defaultFile.js';
import { DEFAULTS } from './config/defaults.js';
import { UI, TOASTS, DEV } from './config/strings.js';
import { buildPrePrompt, buildPostPrompt, buildUpdatePrompt } from './config/prompts.js';
import { loadSettings, saveSettings, parseSettings } from './lib/settings.js';
import { store, KEYS } from './lib/storage.js';
import { writeClipboard } from './lib/clipboard.js';
import Header from './components/Header.jsx';
import SectionHeading from './components/SectionHeading.jsx';
import SourceFile from './components/SourceFile.jsx';
import EmojiDeck from './components/EmojiDeck.jsx';
import BigTwo from './components/BigTwo.jsx';
import UpdateStation from './components/UpdateStation.jsx';
import Toast from './components/Toast.jsx';
import CopyFallback from './components/CopyFallback.jsx';
import Footer from './components/Footer.jsx';
import DevMode from './components/DevMode.jsx';

const COLOR_VARS = {
  bg: '--bg',
  card: '--card',
  border: '--border',
  text: '--text',
  muted: '--muted',
  accent1: '--accent1',
  accent2: '--accent2',
  accent3: '--accent3',
};

export default function App() {
  const [settings, setSettings] = useState(loadSettings);
  const [fileText, setFileText] = useState(() => store.get(KEYS.file) ?? DEFAULT_FILE);
  const [firstRun] = useState(() => store.get(KEYS.file) === null);
  const [sel, setSel] = useState({ mood: null, effort: null, food: null });
  const [toast, setToast] = useState({ message: '', show: false, action: null });
  const [fallbackText, setFallbackText] = useState(null);
  const [devOpen, setDevOpen] = useState(false);
  const toastTimer = useRef();
  const taps = useRef({ count: 0, timer: null });
  const devBaseline = useRef(null);

  // the eight settings tokens are the only colors the CSS ever sees;
  // everything else derives from them via color-mix()
  useLayoutEffect(() => {
    const root = document.documentElement;
    for (const [key, cssVar] of Object.entries(COLOR_VARS)) {
      root.style.setProperty(cssVar, settings.colors[key]);
    }
    document.title = settings.app.name;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', settings.colors.bg);
  }, [settings]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function showToast(message, action = null) {
    setToast({ message, show: true, action });
    clearTimeout(toastTimer.current);
    // action toasts linger long enough to actually hit UNDO
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      action ? 6000 : 2200
    );
  }

  async function copy(text, message) {
    const ok = await writeClipboard(text);
    if (ok) showToast(message);
    else setFallbackText(text);
  }

  const getFile = () => fileText.trim();

  const comboOf = (s) =>
    UI.deck.rows
      .map(({ kind }) => (s[kind] != null ? settings.chips[kind][s[kind]].emoji : null))
      .filter(Boolean)
      .join(' ');

  function toggleChip(kind, index) {
    const next = { ...sel, [kind]: sel[kind] === index ? null : index };
    setSel(next);
    const combo = comboOf(next);
    if (combo) copy(combo, TOASTS.comboCopied(combo));
    else showToast(TOASTS.selectionCleared);
  }

  function clearSelection() {
    setSel({ mood: null, effort: null, food: null });
    showToast(TOASTS.cleared);
  }

  function handleCopyFile() {
    copy(getFile(), TOASTS.fileCopied);
  }

  function handleFileReset() {
    setFileText(DEFAULT_FILE);
    store.set(KEYS.file, DEFAULT_FILE);
    showToast(TOASTS.factoryReset);
  }

  function handlePre() {
    const moodChip = sel.mood != null ? settings.chips.mood[sel.mood] : null;
    copy(buildPrePrompt(getFile(), settings.chips.mood, moodChip), TOASTS.preCopied);
    setSel((s) => ({ ...s, mood: null }));
  }

  function handlePost() {
    const effortChip = sel.effort != null ? settings.chips.effort[sel.effort] : null;
    const foodChip = sel.food != null ? settings.chips.food[sel.food] : null;
    copy(
      buildPostPrompt(getFile(), settings.chips.effort, settings.chips.food, effortChip, foodChip),
      TOASTS.postCopied
    );
    setSel((s) => ({ ...s, effort: null, food: null }));
  }

  function handleUpdateCopy(section, changes) {
    copy(buildUpdatePrompt(getFile(), section.section, changes), TOASTS.updateCopied(section.section));
  }

  // 7 taps on the title, Android-developer-options style
  function handleTitleTap() {
    if (devOpen) return;
    clearTimeout(taps.current.timer);
    taps.current.count += 1;
    const remaining = 7 - taps.current.count;
    if (remaining <= 0) {
      taps.current.count = 0;
      devBaseline.current = settings;
      setDevOpen(true);
      showToast(DEV.enteredToast);
    } else {
      if (taps.current.count >= 4) showToast(DEV.countdown(remaining));
      taps.current.timer = setTimeout(() => {
        taps.current.count = 0;
      }, 1500);
    }
  }

  function handleDevSave() {
    saveSettings(settings);
    setDevOpen(false);
    showToast(DEV.savedToast);
  }

  function handleDevClose() {
    setSettings(devBaseline.current);
    setDevOpen(false);
  }

  function handleDevReset() {
    if (window.confirm(DEV.resetConfirm)) {
      setSettings(DEFAULTS);
      saveSettings(DEFAULTS);
      devBaseline.current = DEFAULTS;
      showToast(DEV.resetToast);
    }
  }

  function handleCopySettings() {
    copy(JSON.stringify(settings, null, 2), DEV.settingsCopiedToast);
  }

  function applySettings(next) {
    setSettings(next);
    saveSettings(next);
    devBaseline.current = next;
  }

  function handleUndoPaste() {
    const raw = store.get(KEYS.settingsBackup);
    const restored = raw ? parseSettings(raw) : null;
    if (!restored) return;
    applySettings(restored);
    showToast(DEV.undoneToast);
  }

  function handlePasteApply(text) {
    const next = parseSettings(text);
    if (!next) {
      showToast(DEV.pasteRejectToast);
      return false;
    }
    store.set(KEYS.settingsBackup, JSON.stringify(settings));
    applySettings(next);
    showToast(DEV.pasteAppliedToast, { label: DEV.undo, fn: handleUndoPaste });
    return true;
  }

  return (
    <div className="wrap">
      <Header app={settings.app} onTitleTap={handleTitleTap} />

      <SectionHeading
        accent={UI.sourceFile.accent}
        title={UI.sourceFile.title}
        subsec={UI.sourceFile.subsec}
      />
      <SourceFile
        strings={UI.sourceFile}
        value={fileText}
        firstRun={firstRun}
        onChange={setFileText}
        onCopyFile={handleCopyFile}
        onReset={handleFileReset}
      />

      <SectionHeading accent={UI.deck.accent} title={UI.deck.title} subsec={UI.deck.subsec} />
      <EmojiDeck
        strings={UI.deck}
        chips={settings.chips}
        sel={sel}
        combo={comboOf(sel)}
        onToggle={toggleChip}
        onClear={clearSelection}
      />

      <SectionHeading accent={UI.bigTwo.accent} title={UI.bigTwo.title} subsec={UI.bigTwo.subsec} />
      <BigTwo strings={UI.bigTwo} buttons={settings.buttons} onPre={handlePre} onPost={handlePost} />

      <SectionHeading
        accent={UI.updateStation.accent}
        title={UI.updateStation.title}
        subsec={UI.updateStation.subsec}
      />
      <UpdateStation
        strings={UI.updateStation}
        onCopy={handleUpdateCopy}
        onEmpty={() => showToast(TOASTS.updateEmpty)}
      />

      <Footer footer={settings.footer} />

      {devOpen && (
        <DevMode
          settings={settings}
          onChange={setSettings}
          onSave={handleDevSave}
          onClose={handleDevClose}
          onReset={handleDevReset}
          onCopySettings={handleCopySettings}
          onPasteApply={handlePasteApply}
        />
      )}

      <Toast
        message={toast.message}
        show={toast.show}
        action={toast.action?.label}
        onAction={() => toast.action?.fn()}
      />
      {fallbackText != null && (
        <CopyFallback strings={UI.fallback} text={fallbackText} onClose={() => setFallbackText(null)} />
      )}
    </div>
  );
}
