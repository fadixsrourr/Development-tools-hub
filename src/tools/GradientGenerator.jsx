import { useMemo, useState } from "react";
import { triggerToast } from "../utils/toast.js";

export default function GradientGenerator() {
  const [c1, setC1] = useState("#10b981");
  const [c2, setC2] = useState("#2563eb");
  const [angle, setAngle] = useState(45);

  const css = useMemo(() => `background: linear-gradient(${angle}deg, ${c1}, ${c2});`, [angle, c1, c2]);

  function copy() {
    navigator.clipboard.writeText(css).then(() => triggerToast("CSS copied"));
  }

  return (
    <div className="tool grid-2">
      <div>
        <label className="label">Controls</label>
        <div className="row">
          <span className="muted" style={{width:72}}>Angle</span>
          <input type="range" min="0" max="360" value={angle} onChange={e=>setAngle(+e.target.value)} />
          <input className="input mono" style={{width:90}} value={angle} onChange={e=>setAngle(+e.target.value || 0)} />
        </div>
        <div className="row" style={{marginTop:10}}>
          <span className="muted" style={{width:72}}>Color 1</span>
          <input type="color" value={c1} onChange={e=>setC1(e.target.value)} />
          <input className="input mono" value={c1} onChange={e=>setC1(e.target.value)} />
        </div>
        <div className="row" style={{marginTop:10}}>
          <span className="muted" style={{width:72}}>Color 2</span>
          <input type="color" value={c2} onChange={e=>setC2(e.target.value)} />
          <input className="input mono" value={c2} onChange={e=>setC2(e.target.value)} />
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
        <div className="preview" style={{height:260, backgroundImage:`linear-gradient(${angle}deg, ${c1}, ${c2})`}} />
      </div>
    </div>
  );
}
