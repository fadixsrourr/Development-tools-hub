import { useState } from "react";
import TurndownService from "turndown";
import { triggerToast } from "../utils/toast.js";

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

export default function HtmlToMarkdown() {
  const [html, setHtml] = useState(`<h1>Hello</h1><p><strong>Fadi</strong> here!</p>`);
  const [md, setMd] = useState("");

  function convert() {
    try {
      const result = td.turndown(html);
      setMd(result);
      triggerToast("Converted");
    } catch (e) {
      setMd(`/* Error: ${e.message} */`);
      triggerToast("Conversion failed");
    }
  }

  function copy(out = "md") {
    const val = out === "md" ? md : html;
    navigator.clipboard.writeText(val).then(() => triggerToast("Copied"));
  }

  return (
    <div className="tool grid-2">
      <div>
        <label className="label">HTML</label>
        <textarea
          className="textarea mono"
          rows={12}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<h1>Hello</h1>"
        />
        <div className="actions">
          <button className="btn" onClick={convert}>Convert → Markdown</button>
          <button className="btn" onClick={() => { setHtml(""); setMd(""); triggerToast("Cleared"); }}>Clear</button>
          <button className="btn" onClick={() => copy("html")}>Copy HTML</button>
        </div>
      </div>
      <div>
        <label className="label">Markdown</label>
        <textarea className="textarea mono" rows={12} value={md} readOnly placeholder="Converted Markdown…" />
        <div className="actions">
          <button className="btn" onClick={() => copy("md")}>Copy Markdown</button>
        </div>
      </div>
    </div>
  );
}
