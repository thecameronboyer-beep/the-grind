import { useEffect, useState } from 'react';
import { DEV } from '../config/strings.js';
import Header from './Header.jsx';

export default function DevMode({
  settings,
  onChange,
  onSave,
  onClose,
  onReset,
  onCopySettings,
  onPasteApply,
}) {
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');

  // full-screen surface: keep the page behind from scrolling
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // structure is fixed — every edit clones, mutates one leaf, hands back
  function edit(mutate) {
    const next = structuredClone(settings);
    mutate(next);
    onChange(next);
  }

  function textField(id, label, value, apply) {
    return (
      <label className="dev-field" key={id}>
        <span>{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => edit((s) => apply(s, e.target.value))}
        />
      </label>
    );
  }

  function chipGroup(kind) {
    return settings.chips[kind].map((chip, i) => (
      <div className="dev-chiprow" key={i}>
        {DEV.chipFields.map((f) => (
          <label className={`dev-field ${f.key === 'emoji' ? 'dev-emoji' : ''}`} key={f.key}>
            <span>{f.label}</span>
            <input
              type="text"
              value={chip[f.key]}
              onChange={(e) => edit((s) => (s.chips[kind][i][f.key] = e.target.value))}
            />
          </label>
        ))}
      </div>
    ));
  }

  const groupBody = {
    app: DEV.appFields.map((f) =>
      textField(`app-${f.key}`, f.label, settings.app[f.key], (s, v) => (s.app[f.key] = v))
    ),
    colors: (
      <div className="dev-colors">
        {DEV.colorFields.map((f) => (
          <label className="dev-color" key={f.key}>
            <input
              type="color"
              value={settings.colors[f.key]}
              onChange={(e) => edit((s) => (s.colors[f.key] = e.target.value))}
            />
            <span>{f.label}</span>
          </label>
        ))}
      </div>
    ),
    mood: chipGroup('mood'),
    effort: chipGroup('effort'),
    food: chipGroup('food'),
    buttons: DEV.buttonFields.map((f) =>
      textField(`btn-${f.key}`, f.label, settings.buttons[f.key], (s, v) => (s.buttons[f.key] = v))
    ),
    footer: DEV.footerFields.map((f) =>
      textField(`footer-${f.key}`, f.label, settings.footer[f.key], (s, v) => (s.footer[f.key] = v))
    ),
  };

  return (
    <div className="devmode" role="dialog" aria-label={DEV.title}>
      <div className="devmode-inner">
        <div className="dev-preview">
          <Header app={settings.app} />
        </div>

        <div className="sec a3">
          <b>{DEV.title}</b>
        </div>
        <p className="subsec">{DEV.subsec}</p>

        {DEV.groups.map((group) => (
          <section key={group.key}>
            <div className={`sec ${group.accent} dev-sec`}>
              <b>{group.label}</b>
            </div>
            {groupBody[group.key]}
          </section>
        ))}

        <section>
          <div className={`sec ${DEV.settingsGroup.accent} dev-sec`}>
            <b>{DEV.settingsGroup.label}</b>
          </div>
          <div className="dev-share">
            <button className="btn small a3" type="button" onClick={onCopySettings}>
              {DEV.copySettings}
            </button>
            <button
              className="btn small ghost"
              type="button"
              onClick={() => setPasteOpen((v) => !v)}
            >
              {DEV.pasteSettings}
            </button>
          </div>
          {pasteOpen && (
            <div className="dev-paste">
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={DEV.pasteLabel}
                aria-label={DEV.pasteLabel}
                spellCheck="false"
              />
              <div className="dev-paste-actions">
                <button
                  className="btn small a3"
                  type="button"
                  onClick={() => {
                    if (onPasteApply(pasteText)) {
                      setPasteOpen(false);
                      setPasteText('');
                    }
                  }}
                >
                  {DEV.pasteApply}
                </button>
                <button
                  className="btn small ghost"
                  type="button"
                  onClick={() => {
                    setPasteOpen(false);
                    setPasteText('');
                  }}
                >
                  {DEV.pasteCancel}
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="dev-actions">
          <button className="btn big a3" type="button" onClick={onSave}>
            {DEV.save}
          </button>
          <button className="btn big ghost dev-close" type="button" onClick={onClose}>
            {DEV.close}
          </button>
          <button className="btn small ghost dev-reset" type="button" onClick={onReset}>
            {DEV.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
