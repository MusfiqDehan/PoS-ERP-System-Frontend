"use client";

export default function EditStoreModal() {
  return (
    <div className="modal fade" id="edit-store">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Edit Store</h4>
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
          <form>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">
                  Store Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Electro Mart"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  User Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="johnsmith"
                />
              </div>
              <div className="input-blocks mb-3">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="pass-group">
                  <input
                    type="password"
                    className=" pass-input"
                    defaultValue="********"
                  />
                  <span className="fas toggle-password fa-eye-slash" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="electromart@example.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={+12498345785}
                />
              </div>
              <div className="mb-0">
                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                  <span className="status-label ">Status</span>
                  <input
                    type="checkbox"
                    id="user1"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="user1" className="checktoggle" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary fs-13 fw-medium p-2 px-3"
              >
                save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
