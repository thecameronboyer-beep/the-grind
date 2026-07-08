import { useEffect, useRef, useState } from 'react';
import { store, KEYS } from '../lib/storage.js';

export default function SourceFile({ strings, value, firstRun, onChange, onCopyFile, onReset }) {
  // always starts collapsed; firstRun still drives the attention glow
  const [open, setOpen] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const saveTimer = useRef();
  const flashTimer = useRef();

  useEffect(() => () => {
    clearTimeout(saveTimer.current);
    clearTimeout(flashTimer.current);
  }, []);

  function handleInput(e) {
    const v = e.target.value;
    onChange(v);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      store.set(KEYS.file, v);
      setSavedFlash(true);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setSavedFlash(false), 1500);
    }, 400);
  }

  function handleReset() {
    if (window.confirm(strings.resetConfirm)) {
      clearTimeout(saveTimer.current);
      onReset();
    }
  }

  return (
    <details
      className={`filebox${firstRun ? ' first-run' : ''}`}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        {strings.summary} <span className="chev">▶</span>
      </summary>
      <div className="filebody">
        <textarea
          className="srcfile"
          value={value}
          onChange={handleInput}
          spellCheck="false"
          aria-label={strings.title}
        />
        <div className="filebar">
          <button className="btn small ghost" type="button" onClick={onCopyFile}>
            {strings.copyFile}
          </button>
          <button className="btn small ghost" type="button" onClick={handleReset}>
            {strings.reset}
          </button>
          <span className={`saved${savedFlash ? ' show' : ''}`}>{strings.savedTag}</span>
        </div>
      </div>
    </details>
  );
}
