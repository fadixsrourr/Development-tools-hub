export function triggerToast(text = "Copied!") {
  window.dispatchEvent(new CustomEvent("app:toast", { detail: String(text) }));
}