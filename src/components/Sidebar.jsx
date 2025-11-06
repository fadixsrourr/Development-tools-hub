export default function Sidebar({ tools, activeId, onSelect }) {
  return (
    <nav className="sidebar" aria-label="Tools">
      {tools.map((t) => (
        <button
          key={t.id}
          className={`tool-item ${activeId === t.id ? "active" : ""}`}
          onClick={() => onSelect(t.id)}
          aria-current={activeId === t.id ? "page" : undefined}
        >
          {t.label}
        </button>
      ))}

      {tools.length === 0 && (
        <div className="card" style={{ textAlign: "center" }}>
          <div className="muted">No tools match your search.</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Try: “json”, “qr”, “css”
          </div>
        </div>
      )}

      {/* Sidebar footer promo */}
      <div className="card" style={{ marginTop: 12 }}>
        <div className="stat-value" style={{ fontSize: 16 }}>🚀 More coming soon</div>
        <div className="stat-label">
          Regex Tester, JWT Decoder, Timestamp Converter, Diff Viewer…
        </div>
      </div>
    </nav>
  );
}
