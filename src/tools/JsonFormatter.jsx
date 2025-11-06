import { useState } from "react";
import { triggerToast } from "../utils/toast.js";

export default function JsonFormatter() {
  const [raw, setRaw] = useState("");
  const [pretty, setPretty] = useState("");
  const [error, setError] = useState("");

  function format() {
    setError("");
    try {
      const obj = JSON.parse(raw);
      setPretty(JSON.stringify(obj, null, 2));
    } catch (e) {
      setPretty("");
      setError(e.message);
    }
  }

  function minify() {
    setError("");
    try {
      const obj = JSON.parse(raw);
      setPretty(JSON.stringify(obj));
    } catch (e) {
      setPretty("");
      setError(e.message);
    }
  }

  function copy() {
    navigator.clipboard
      .writeText(pretty || raw)
      .then(() => triggerToast("Copied JSON"));
  }

  return (
    <div className="tool grid-2">
      <div>
        <label className="label">JSON Input</label>
        <textarea
          className="textarea mono"
          rows={10}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder='{"name":"Fadi","skills":["React","Python"]}'
        />
        <div className="actions">
          <button className="btn" onClick={format}>Format</button>
          <button className="btn" onClick={minify}>Minify</button>
          <button className="btn" onClick={() => setRaw("")}>Clear</button>
        </div>
        {error && <p className="muted">Error: {error}</p>}
      </div>

      <div>
        <label className="label">Output</label>
        <textarea
          className="textarea mono"
          rows={10}
          value={pretty}
          onChange={(e) => setPretty(e.target.value)}
          placeholder="Formatted JSON will appear here…"
        />
        <div className="actions">
          <button className="btn" onClick={copy}>Copy</button>
        </div>
      </div>
    </div>
  );
}
