import { useTheme } from "../context/ThemeContext.jsx";

function Logo() {
  // gradient circle with "FS" (Fadi Srour)
  return (
    <div
      aria-hidden
      style={{
        width: 28,
        height: 28,
        borderRadius: "9999px",
        background:
          "conic-gradient(from 180deg at 50% 50%, #10b981, #22d3ee 50%, #10b981 100%)",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,.25)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: "#0b0b0c",
          letterSpacing: 0.2,
          lineHeight: 1,
        }}
      >
        FS
      </span>
    </div>
  );
}

export default function Navbar({ onSearch }) {
  const { theme, toggle } = useTheme();
  return (
    <header className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo />
        <div className="brand">Developer Tools Hub</div>
      </div>

      <input
        id="tool-search"
        className="search"
        placeholder="Search tools…  (tip: press / to focus)"
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search tools"
      />

      <button className="btn ghost" onClick={toggle} aria-label="Toggle theme">
        {theme === "dark" ? "☀︎" : "☾"}
      </button>
    </header>
  );
}
