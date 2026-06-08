"use client";

export default function CreateFolderModal() {
  return (
        <div className="modal fade" id="add_folder">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Create Folder</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form action="file-manager.html">
                <div className="modal-body">
                  <div className="mb-0">
                    <label className="form-label">Folder Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add New Folder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
}
