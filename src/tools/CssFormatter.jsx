import { useState } from "react";
import { triggerToast } from "../utils/toast.js";

export default function CssFormatter() {
  const [input, setInput] = useState(`.btn{background:#10b981;color:#08110e} .card{border:1px solid #23242a}`);
  const [output, setOutput] = useState("");

  function beautify() {
    const s = input
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/\n\s*\n/g, "\n");
    setOutput(s.trim());
    triggerToast("Beautified");
  }

  function minify() {
    const s = input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/;\s*/g, ";")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*,\s*/g, ",")
      .trim();
    setOutput(s);
    triggerToast("Minified");
  }

  const copy = () => navigator.clipboard.writeText(output || input).then(() => triggerToast("Copied"));

  return (
    <div className="tool grid-2">
      <div>
        <label className="label">CSS Input</label>
        <textarea className="textarea mono" rows={12} value={input} onChange={e=>setInput(e.target.value)} />
        <div className="actions">
          <button className="btn" onClick={beautify}>Beautify</button>
          <button className="btn" onClick={minify}>Minify</button>
          <button className="btn" onClick={() => { setInput(""); setOutput(""); triggerToast("Cleared"); }}>Clear</button>
        </div>
      </div>
      <div>
        <label className="label">Result</label>
        <textarea className="textarea mono" rows={12} value={output} onChange={e=>setOutput(e.target.value)} />
        <div className="actions">
          <button className="btn" onClick={copy}>Copy</button>
        </div>
      </div>
    </div>
  );
}
