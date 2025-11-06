import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { triggerToast } from "../utils/toast.js";

export default function ColorPicker() {
  const [color, setColor] = useState("#22c55e");
  const [palette, setPalette] = useLocalStorage("palette", []);

  function addColor() {
    if (!palette.includes(color)) {
      setPalette([...palette, color]);
      triggerToast("Saved color");
    } else {
      triggerToast("Already saved");
    }
  }

  function removeColor(c) {
    setPalette(palette.filter((x) => x !== c));
    triggerToast("Removed");
  }

  function copyColor(c) {
    navigator.clipboard.writeText(c).then(() => triggerToast(`${c} copied`));
  }

  return (
    <div className="tool">
      <label className="label">Pick Color</label>
      <div className="row">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Color picker"
        />
        <input
          className="input mono"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button className="btn" onClick={addColor}>Save</button>
        <button className="btn" onClick={() => { setPalette([]); triggerToast("Cleared all"); }}>
          Clear All
        </button>
      </div>

      <div className="swatches">
        {palette.map((c) => (
          <button
            key={c}
            className="swatch"
            style={{ background: c }}
            title={`${c} (click to copy, right-click to remove)`}
            onClick={() => copyColor(c)}
            onContextMenu={(e) => { e.preventDefault(); removeColor(c); }}
            aria-label={`Color ${c}. Click to copy. Right-click to remove.`}
          />
        ))}
        {palette.length === 0 && <div className="muted">No saved colors yet.</div>}
      </div>
    </div>
  );
}
