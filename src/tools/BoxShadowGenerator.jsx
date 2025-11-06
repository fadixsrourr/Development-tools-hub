import { useMemo, useState } from "react";
import { triggerToast } from "../utils/toast.js";

export default function BoxShadowGenerator() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(12);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(-6);
  const [color, setColor] = useState("rgba(0,0,0,0.35)");
  const [inset, setInset] = useState(false);

  const css = useMemo(() => {
    const base = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    return `box-shadow: ${inset ? "inset " : ""}${base};`;
  }, [x, y, blur, spread, color, inset]);

  function copy() {
    navigator.clipboard.writeText(css).then(() => triggerToast("CSS copied"));
  }

  return (
    <div className="tool grid-2">
      <div>
        <label className="label">Controls</label>

        {[
          ["Offset X", x, setX, -50, 50],
          ["Offset Y", y, setY, -50, 50],
          ["Blur", blur, setBlur, 0, 100],
          ["Spread", spread, setSpread, -50, 50],
        ].map(([label, val, set, min, max]) => (
          <div className="row" style={{marginTop:10}} key={label}>
            <span className="muted" style={{width:90}}>{label}</span>
            <input type="range" min={min} max={max} value={val} onChange={e=>set(+e.target.value)} />
            <input className="input mono" style={{width:110}} value={val} onChange={e=>set(+e.target.value || 0)} />
          </div>
        ))}

        <div className="row" style={{marginTop:10}}>
          <span className="muted" style={{width:90}}>Color</span>
          <input className="input mono" value={color} onChange={e=>setColor(e.target.value)} />
          <input type="color" value={toHex(color)} onChange={e=>setColor(e.target.value)} />
        </div>

        <div className="row" style={{marginTop:10}}>
          <label>
            <input type="checkbox" checked={inset} onChange={e=>setInset(e.target.checked)} /> inset
          </label>
        </div>

        <div className="actions">
          <button className="btn" onClick={copy}>Copy CSS</button>
        </div>

        <div className="card">
          <div className="muted">CSS</div>
          <pre className="mono" style={{whiteSpace:"pre-wrap"}}>{css}</pre>
        </div>
      </div>

      <div>
        <label className="label">Preview</label>
        <div className="preview" style={{height:260, display:"grid", placeItems:"center"}}>
          <div style={{
            width:180, height:120, borderRadius:16, background:"var(--surface)",
            boxShadow: css.replace("box-shadow:","").replace(";","")
          }} />
        </div>
      </div>
    </div>
  );
}

// naive rgba->hex fallback for color input
function toHex(c){
  if(/^#[0-9a-f]{6}$/i.test(c)) return c;
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(c);
  if(!m) return "#000000";
  const [r,g,b] = m.slice(1,4).map(n=>Number(n).toString(16).padStart(2,"0"));
  return `#${r}${g}${b}`;
}
