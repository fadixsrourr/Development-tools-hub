import { useMemo, useState } from "react";

export default function TextCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const words = (text.trim().match(/\S+/g) || []).length;
    const lines = text.split("\n").length;
    const readingMin = Math.max(1, Math.round(words / 200));
    return { chars, words, lines, readingMin };
  }, [text]);

  const handleCopy = () => navigator.clipboard.writeText(text);

  return (
    <div className="tool">
      <label className="label">Input Text</label>
      <textarea
        className="textarea"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
      />
      <div className="actions">
        <button className="btn" onClick={() => setText("")}>Reset</button>
        <button className="btn" onClick={handleCopy}>Copy</button>
      </div>

      <div className="grid stats">
        <Stat label="Characters" value={stats.chars} />
        <Stat label="Words" value={stats.words} />
        <Stat label="Lines" value={stats.lines} />
        <Stat label="Reading Time (min)" value={stats.readingMin} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
