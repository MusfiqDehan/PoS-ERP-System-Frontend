"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function ImportTransferModal() {
  return (
      <div className="modal fade" id="view-notes">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Import Transfer</h4>
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
                <div className="modal-body custom-modal-body">
                  <div className="row">
                    <div className="col-lg-4 col-sm-6 col-12">
                      <div className="input-blocks">
                        <label>From</label>
                        <select className="react-select">
                          <option>Choose</option>
                          <option>Store 1</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12">
                      <div className="input-blocks">
                        <label>To</label>
                        <select className="react-select">
                          <option>Choose</option>
                          <option>Store 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12">
                      <div className="input-blocks">
                        <label>Satus</label>
                        <select className="react-select">
                          <option>Choose</option>
                          <option>Sent</option>
                          <option>Pending</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-6 col-12">
                      <div className="row">
                        <div>
                          {/* <div className="input-blocks download">
                        <Link className="btn btn-submit">Download Sample File</Link>
                    </div> */}
                          <div className="modal-footer-btn download-file">
                            <Link href="#" className="btn btn-submit">
                              Download Sample File
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-blocks image-upload-down">
                        <label> Upload CSV File</label>
                        <div className="image-upload download">
                          <input type="file" />
                          <div className="image-uploads">
                            <img
                              src="assets/img/download-img.png"
                              alt="img"
                            />
                            <h4>
                              Drag and drop a <span>file to upload</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-6 col-12">
                      <div className="input-blocks">
                        <label>Shipping</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks summer-description-box transfer">
                      <label>Description</label>
                      <div id="summernote3"></div>
                      <p>Maximum 60 Characters</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="modal-footer-btn">
                      <Link
                        href="#"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <Link href="/purchase-list" className="btn btn-submit">
                        Submit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
