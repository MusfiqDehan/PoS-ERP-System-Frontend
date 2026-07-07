type BootstrapModal = {
  show: () => void;
  hide: () => void;
};

type BootstrapWindow = Window & {
  bootstrap?: {
    Modal?: {
      getOrCreateInstance: (element: Element) => BootstrapModal;
      getInstance: (element: Element) => BootstrapModal | null;
    };
  };
};

function showModalElement(modal: HTMLElement): void {
  modal.classList.add("show");
  modal.style.display = "block";
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  document.body.classList.add("modal-open");

  if (!document.querySelector(".modal-backdrop")) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade show";
    document.body.appendChild(backdrop);
  }

  modal.dispatchEvent(new Event("shown.bs.modal"));
}

export function openBootstrapModal(modalId: string): void {
  if (typeof window === "undefined") return;

  const modal = document.getElementById(modalId);
  if (!modal) return;

  const bootstrap = (window as BootstrapWindow).bootstrap;
  if (bootstrap?.Modal) {
    bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }

  showModalElement(modal);
}

export function closeBootstrapModal(modalId: string): void {
  if (typeof window === "undefined") return;

  const modal = document.getElementById(modalId);
  if (!modal) return;

  const bootstrap = (window as BootstrapWindow).bootstrap;
  const instance = bootstrap?.Modal?.getInstance(modal);
  if (instance) {
    instance.hide();
    return;
  }

  modal.classList.remove("show");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("role");
  document.body.classList.remove("modal-open");
  document.querySelector(".modal-backdrop")?.remove();
}
