export default function Toast({ message, show, action, onAction }) {
  return (
    <div className={`toast${show ? ' show' : ''}`} role="status" aria-live="polite">
      {message}
      {action && (
        <button className="toast-action" type="button" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}
