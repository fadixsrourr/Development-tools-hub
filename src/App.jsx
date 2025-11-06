import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import ToolShell from "./components/ToolShell.jsx";
import Toast from "./components/Toast.jsx";

import TextCounter from "./tools/TextCounter.jsx";
import JsonFormatter from "./tools/JsonFormatter.jsx";
import MarkdownEditor from "./tools/MarkdownEditor.jsx";
import UrlEncoder from "./tools/UrlEncoder.jsx";
import ColorPicker from "./tools/ColorPicker.jsx";
import HtmlToMarkdown from "./tools/HtmlToMarkdown.jsx";
import GradientGenerator from "./tools/GradientGenerator.jsx";
import BoxShadowGenerator from "./tools/BoxShadowGenerator.jsx";
import CssFormatter from "./tools/CssFormatter.jsx";
import QrCodeGenerator from "./tools/QrCodeGenerator.jsx";

import useLocalStorage from "./hooks/useLocalStorage.js";

const TOOLS = [
  { id: "text", label: "Text Counter", component: TextCounter },
  { id: "json", label: "JSON Formatter", component: JsonFormatter },
  { id: "md", label: "Markdown Previewer", component: MarkdownEditor },
  { id: "url", label: "URL Encoder / Decoder", component: UrlEncoder },
  { id: "color", label: "Color Picker & Palette", component: ColorPicker },
  { id: "html2md", label: "HTML → Markdown", component: HtmlToMarkdown },
  { id: "gradient", label: "Gradient Generator", component: GradientGenerator },
  { id: "shadow", label: "Box Shadow Generator", component: BoxShadowGenerator },
  { id: "cssfmt", label: "CSS Minifier / Beautifier", component: CssFormatter },
  { id: "qr", label: "QR Code Generator", component: QrCodeGenerator },
  // optional: placeholder tool at the bottom (see section 3)
  { id: "soon", label: "More Tools (Soon)", component: SoonTile },
];

function SoonTile() {
  return (
    <div className="tool">
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="stat-value">🚧 Coming soon</div>
        <div className="stat-label">Regex Tester, JWT Decoder, Timestamp Converter, Diff Viewer…</div>
      </div>
      <p className="muted">
        Have an idea? Open an issue on GitHub or send a PR. Let’s make this even better.
      </p>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useLocalStorage("activeTool", "text");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  // Focus search with "/"
  useEffect(() => {
    const onSlash = (e) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        document.getElementById("tool-search")?.focus();
      }
    };
    window.addEventListener("keydown", onSlash);
    return () => window.removeEventListener("keydown", onSlash);
  }, []);

  // Toast listener
  useEffect(() => {
    const handler = (e) => setToast(e.detail || "Done");
    window.addEventListener("app:toast", handler);
    return () => window.removeEventListener("app:toast", handler);
  }, []);

  // Show loader briefly when the active tool changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 220);
    return () => clearTimeout(t);
  }, [activeId]);

  // Shareable URL (?tool=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromUrl = params.get("tool");
    if (fromUrl) {
      const valid = TOOLS.find((t) => t.id === fromUrl);
      if (valid) setActiveId(fromUrl);
    }
    const onPop = () => {
      const p = new URLSearchParams(location.search);
      const id = p.get("tool");
      if (id && TOOLS.some((t) => t.id === id)) setActiveId(id);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("tool", activeId);
    const newUrl = `${location.pathname}?${params.toString()}`;
    history.replaceState({}, "", newUrl);
  }, [activeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? TOOLS.filter((t) => t.label.toLowerCase().includes(q)) : TOOLS;
  }, [query]);

  const activeTool = TOOLS.find((t) => t.id === activeId) || TOOLS[0];
  const ActiveTool = activeTool.component;

  return (
    <div className="app">
      <Navbar onSearch={setQuery} />
      <div className="container">
        <Sidebar tools={filtered} activeId={activeId} onSelect={setActiveId} />
        <main className="main">
          <ToolShell title={activeTool.label} loading={loading}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 30,
                  mass: 0.6,
                }}
              >
                <ActiveTool />
              </motion.div>
            </AnimatePresence>
          </ToolShell>
        </main>
      </div>
      <Footer />
      <Toast text={toast} />
    </div>
  );
}
