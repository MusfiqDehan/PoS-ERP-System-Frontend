"use client";

import TextEditor from "@/core/common/texteditor/texteditor";

export default function DescriptionField() {
  return (
                      <div className="col-lg-12">
                        <div className="summer-description-box">
                          <label className="form-label">Description</label>
                          <TextEditor />
                          <p className="fs-14 mt-1">Maximum 60 Words</p>
                        </div>
                      </div>
  );
}
