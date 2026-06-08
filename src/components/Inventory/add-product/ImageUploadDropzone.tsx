"use client";

import { PlusCircle } from "react-feather";

export default function ImageUploadDropzone() {
  return (
                            <div className="mb-3">
                              <div className="image-upload">
                                <input type="file" />
                                <div className="image-uploads">
                                  <PlusCircle
                                  size={14}
                                    data-feather="plus-circle"
                                    className="plus-down-add me-0"
                                  />
                                  <h4>Add Images</h4>
                                </div>
                              </div>
                            </div>
  );
}
