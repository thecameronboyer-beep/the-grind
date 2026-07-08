export default function EmojiDeck({ strings, chips, sel, combo, onToggle, onClear }) {
  return (
    <div className="card">
      {strings.rows.map((row) => (
        <div key={row.kind}>
          <div className="rowlabel">{row.label}</div>
          <div className={`chips ${chips[row.kind].length === 6 ? 'six' : 'three'}`}>
            {chips[row.kind].map((chip, i) => (
              <button
                key={i}
                type="button"
                className={`chip ${row.accent}`}
                aria-pressed={sel[row.kind] === i}
                onClick={() => onToggle(row.kind, i)}
              >
                <span className="chip-emoji">{chip.emoji}</span>
                <span className="chip-label">{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className={`selbar${combo ? ' show' : ''}`}>
        {strings.selbarPrefix} <span className="combo">{combo}</span>
        <button type="button" onClick={onClear}>
          {strings.clear}
        </button>
      </div>
    </div>
  );
}
