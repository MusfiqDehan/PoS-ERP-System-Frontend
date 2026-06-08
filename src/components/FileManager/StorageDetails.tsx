"use client";

export default function StorageDetails() {
  return (
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="mb-2">Storage Details</h4>
                    <span className="badge badge-success mb-2">Used 77%</span>
                  </div>
                  <div id="storage-chart" />
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-md bg-info-transparent">
                        <i className="ti ti-music fs-20 text-info" />
                      </span>
                      <div className="overflow-hidden ms-2">
                        <h6 className="text-truncate">Music</h6>
                        <p className="text-truncate">35 Files</p>
                      </div>
                    </div>
                    <p className="text-title">8.5 GB</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-md bg-warning-transparent">
                        <i className="fa-regular fa-file-audio fs-20 text-warning" />
                      </span>
                      <div className="overflow-hidden ms-2">
                        <h6 className="text-truncate">Video</h6>
                        <p className="text-truncate">145 Files</p>
                      </div>
                    </div>
                    <p className="text-title">2 GB</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-md bg-secondary-transparent">
                        <i className="ti ti-file-description fs-20 text-secondary" />
                      </span>
                      <div className="overflow-hidden ms-2">
                        <h6 className="text-truncate">Documents</h6>
                        <p className="text-truncate">487 Files</p>
                      </div>
                    </div>
                    <p className="text-title">24.5 GB</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-md bg-purple-transparent">
                        <i className="ti ti-photo fs-20 text-purple" />
                      </span>
                      <div className="overflow-hidden ms-2">
                        <h6 className="text-truncate">Photos</h6>
                        <p className="text-truncate">35 Files</p>
                      </div>
                    </div>
                    <p className="text-title">8.5 GB</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-0">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-md bg-purple-transparent">
                        <i className="ti ti-file-type-doc fs-20 text-pink" />
                      </span>
                      <div className="overflow-hidden ms-2">
                        <h6 className="text-truncate">Other</h6>
                        <p className="text-truncate">487 Files</p>
                      </div>
                    </div>
                    <p className="text-title">16.2 GB</p>
                  </div>
                </div>
              </div>
  );
}
