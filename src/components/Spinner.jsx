export default function Spinner({ label = "Loading…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "grid",
        placeItems: "center",
        gap: 10,
        padding: 20,
        color: "var(--muted)",
      }}
    >
      <div className="spin" />
      <div style={{ fontSize: 12 }}>{label}</div>
    </div>
  );
}
