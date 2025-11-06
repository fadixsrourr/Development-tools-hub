import React from "react";
import { motion } from "framer-motion";
import Spinner from "./Spinner.jsx";

export default function ToolShell({ title, children, loading = false }) {
  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24 }}
      style={{ position: "relative" }}
    >
      <header className="panel-head">
        <h2 className="panel-title">{title}</h2>
      </header>
      <div className="panel-body" style={{ position: "relative" }}>
        {children}
      </div>

      {loading && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "color-mix(in srgb, var(--elev) 80%, transparent)",
            backdropFilter: "blur(2px)",
            display: "grid",
            placeItems: "center",
            borderRadius: 16,
          }}
        >
          <Spinner />
        </div>
      )}
    </motion.section>
  );
}
