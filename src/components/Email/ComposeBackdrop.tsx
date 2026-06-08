"use client";

type ComposeBackdropProps = {
  show: boolean;
};

export default function ComposeBackdrop({ show }: ComposeBackdropProps) {
  if (!show) return null;
  return <div className="modal-backdrop fade show" />;
}
