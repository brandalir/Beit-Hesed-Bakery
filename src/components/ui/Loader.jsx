export default function Loader({ label = 'Cargando' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__mark" />
      {label}
    </div>
  );
}
