import { useRef, useState } from "react";
import QRCode from "react-qr-code";

export default function QrCodeGenerator() {
  // Default value — your GitHub
  const [text, setText] = useState("https://github.com/fadixsrourr");
  const qrRef = useRef(null);

  const handleDownload = () => {
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    // Create a safe filename
    const cleanName = text
      .replace(/^https?:\/\//, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 30)
      .toLowerCase() || "qr-code";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${cleanName}-qr.png`;
      link.click();

      window.dispatchEvent(
        new CustomEvent("app:toast", { detail: `QR saved as ${cleanName}-qr.png ✅` })
      );
    };

    img.src = url;
  };

  return (
    <div>
      <label className="label">Enter text or URL</label>
      <textarea
        className="textarea mono"
        rows={3}
        placeholder="Type text or link to generate QR..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="actions">
        <button
          className="btn"
          onClick={handleDownload}
          disabled={!text.trim()}
          title={!text.trim() ? "Enter text first" : "Download QR Code"}
        >
          Download PNG
        </button>
      </div>

      <div
        ref={qrRef}
        className="preview"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "clamp(160px, 50vw, 240px)",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QRCode
            value={text || " "}
            size={220}
            style={{
              maxWidth: "100%",
              height: "auto",
              width: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
