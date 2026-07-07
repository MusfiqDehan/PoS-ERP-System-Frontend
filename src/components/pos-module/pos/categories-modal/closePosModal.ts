type BootstrapModal = {
  hide: () => void;
};

type BootstrapWindow = Window & {
  bootstrap?: {
    Modal?: {
      getInstance: (element: Element) => BootstrapModal | null;
    };
  };
};

function hideModalElement(modal: HTMLElement): void {
  modal.classList.remove("show");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("role");
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
  document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  modal.dispatchEvent(new Event("hidden.bs.modal"));
}

export function closePosModal(modalId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }

  const instance = (window as BootstrapWindow).bootstrap?.Modal?.getInstance(modal);
  if (instance) {
    instance.hide();
    return;
  }

  hideModalElement(modal);
}
