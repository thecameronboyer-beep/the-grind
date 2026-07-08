export default function Header({ app, onTitleTap }) {
  return (
    <header className="header">
      <div className="eyebrow">{app.eyebrow}</div>
      <h1 className="title" data-text={app.name} onClick={onTitleTap}>
        {app.name}
      </h1>
      <div className="tagline">{app.tagline}</div>
    </header>
  );
}
