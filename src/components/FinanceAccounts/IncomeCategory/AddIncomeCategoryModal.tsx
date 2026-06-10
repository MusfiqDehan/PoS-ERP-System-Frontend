"use client";

export default function AddIncomeCategoryModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Income Category</h4>
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
                <form>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-3 position-relative">
                        <label className="form-label">
                          Code<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control list" />
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="btn btn-primaryadd btn-generate"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="form-label">
                        Enter Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Investment"
                      />
                    </div>
                  </div>
                </form>
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
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
