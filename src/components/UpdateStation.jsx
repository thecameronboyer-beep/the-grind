import { useRef, useState } from 'react';

export default function UpdateStation({ strings, onCopy, onEmpty }) {
  const [inputs, setInputs] = useState({});
  const refs = useRef({});

  function handleCopy(section) {
    const changes = (inputs[section.key] || '').trim();
    if (!changes) {
      onEmpty();
      refs.current[section.key]?.focus();
      return;
    }
    onCopy(section, changes);
    setInputs((s) => ({ ...s, [section.key]: '' }));
  }

  return (
    <div className="card">
      {strings.sections.map((section) => (
        <div className={`upd ${section.accent}`} key={section.key}>
          <div className="updhead">
            <b>{section.head}</b>
            <button className="btn small" type="button" onClick={() => handleCopy(section)}>
              {strings.button}
            </button>
          </div>
          <textarea
            ref={(el) => (refs.current[section.key] = el)}
            value={inputs[section.key] || ''}
            onChange={(e) => setInputs((s) => ({ ...s, [section.key]: e.target.value }))}
            placeholder={section.placeholder}
            aria-label={section.head}
          />
        </div>
      ))}
      <p className="hint">{strings.hint}</p>
    </div>
  );
}
