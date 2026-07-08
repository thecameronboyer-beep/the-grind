import { useEffect, useRef } from 'react';

export default function CopyFallback({ strings, text, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  return (
    <div className="fallback">
      <p>{strings.help}</p>
      <textarea ref={ref} value={text} readOnly />
      <button className="btn big a2" type="button" onClick={onClose}>
        {strings.done}
      </button>
    </div>
  );
}
