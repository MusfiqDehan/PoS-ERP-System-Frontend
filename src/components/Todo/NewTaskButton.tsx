"use client";

export default function NewTaskButton() {
  return (
                <div className="mb-3">
                  <button
                    className="btn bg-primary-transparent border-dashed border-primary w-100 text-start"
                    data-bs-toggle="modal"
                    data-inert={true}
                    data-bs-target="#edit-note-units"
                  >
                    <i className="ti ti-plus me-2" />
                    New task
                  </button>
                </div>
  );
}
