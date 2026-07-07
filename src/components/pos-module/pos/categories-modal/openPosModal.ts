type BootstrapModal = {
  show: () => void;
};

type BootstrapWindow = Window & {
  bootstrap?: {
    Modal?: {
      getOrCreateInstance: (element: Element) => BootstrapModal;
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

export function openPosModal(modalId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }

  const bootstrap = (window as BootstrapWindow).bootstrap;
  if (bootstrap?.Modal) {
    bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }

  showModalElement(modal);
}
