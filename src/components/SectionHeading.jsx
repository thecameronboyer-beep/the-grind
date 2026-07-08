export default function SectionHeading({ accent, title, subsec }) {
  return (
    <>
      <div className={`sec ${accent}`}>
        <b>{title}</b>
      </div>
      {subsec && <p className="subsec">{subsec}</p>}
    </>
  );
}
