import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}