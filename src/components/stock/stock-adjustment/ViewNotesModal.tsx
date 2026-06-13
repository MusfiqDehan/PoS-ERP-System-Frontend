"use client";

export default function ViewNotesModal() {
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
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              The Jordan brand is owned by Nike (owned by the Knight family),
              as, at the time, the company was building its strategy to work
              with athletes to launch shows that could inspire consumers.Although
              Jordan preferred Converse and Adidas, they simply could not match
              the offer Nike made. Jordan also signed with Nike because he
              loved the way they wanted to market him with the banned colored
              shoes. Nike promised to cover the fine Jordan would receive from
              the NBA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
