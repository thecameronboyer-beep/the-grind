export default function BigTwo({ strings, buttons, onPre, onPost }) {
  return (
    <>
      <button className={`btn big ${strings.preAccent}`} type="button" onClick={onPre}>
        {buttons.pre}
      </button>
      <div className="gap" />
      <button className={`btn big ${strings.postAccent}`} type="button" onClick={onPost}>
        {buttons.post}
      </button>
      <p className="hint">{strings.hint}</p>
    </>
  );
}
