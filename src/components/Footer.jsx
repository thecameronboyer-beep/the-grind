export default function Footer({ footer }) {
  return (
    <footer className="footer">
      <hr />
      <div className="laws">{footer.laws}</div>
      <div className="rac">{footer.rac}</div>
    </footer>
  );
}
