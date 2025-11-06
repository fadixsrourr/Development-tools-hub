import { useState } from "react";
import { triggerToast } from "../utils/toast.js";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => setOutput(encodeURIComponent(input));
  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput("Invalid encoded string");
    }
  };
  const copy = () =>
    navigator.clipboard
      .writeText(output || input)
      .then(() => triggerToast("Copied"));

  return (
    <div className="tool">
      <label className="label">Input</label>
      <textarea
        className="textarea mono"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type text or encoded URL…"
      />
      <div className="actions">
        <button className="btn" onClick={encode}>Encode</button>
        <button className="btn" onClick={decode}>Decode</button>
        <button className="btn" onClick={() => { setInput(""); setOutput(""); }}>
          Clear
        </button>
        <button className="btn" onClick={copy}>Copy</button>
      </div>

      <label className="label">Output</label>
      <textarea className="textarea mono" rows={6} value={output} readOnly />
    </div>
  );
}
