import { useEffect, useState } from "react";

export default function Toast({ text }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!text) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, [text]);

  return <div className={`toast ${show ? "show" : ""}`}>{text}</div>;
}