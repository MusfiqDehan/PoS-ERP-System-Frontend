"use client";

type Props = {
  reason: string;
};

export default function ViewNotesModal({ reason }: Props) {
  return (
    <div className="modal fade" id="view-notes">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Notes</h4>
            </div>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{reason || "No notes provided."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
