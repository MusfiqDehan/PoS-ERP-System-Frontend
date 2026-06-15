export function closePosModal(modalId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }

  const bootstrap = (
    window as Window & {
      bootstrap?: {
        Modal?: { getOrCreateInstance: (el: Element) => { hide: () => void } };
      };
    }
  ).bootstrap;

  bootstrap?.Modal?.getOrCreateInstance(modal)?.hide();
}
