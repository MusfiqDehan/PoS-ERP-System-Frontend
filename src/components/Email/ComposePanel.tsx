"use client";

import { Chips } from "primereact/chips";
import Link from "next/link";

type ComposePanelProps = {
  show: boolean;
  onClose: () => void;
  value: string[];
  onValueChange: (value: string[]) => void;
};

export default function ComposePanel({
  show,
  onClose,
  value,
  onValueChange,
}: ComposePanelProps) {
  const customChip = (item: string) => (
    <div>
      <span className="tag label label-info">{item}</span>
    </div>
  );

  return (
      <div id="compose-view" className={show ? 'show' : ''}>
        <div className="bg-white border-0 rounded compose-view">
          <div className="compose-header d-flex align-items-center justify-content-between bg-dark p-3">
            <h5 className="text-white">Compose New Email</h5>
            <div className="d-flex align-items-center">
              <Link
                href="#"
                className="d-inline-flex me-2 text-white fs-16"
              >
                <i className="ti ti-minus" />
              </Link>
              <Link
                href="#"
                className="d-inline-flex me-2 fs-16 text-white"
              >
                <i className="ti ti-maximize" />
              </Link>
              <button
                type="button"
                className="btn-close custom-btn-close p-0 bg-transparent fs-16 text-white position-static"
                id="compose-close"
                onClick={onClose}
              >
                <i className="ti ti-x" />
              </button>
            </div>
          </div>
          <form >
            <div className="p-3 position-relative pb-2 border-bottom chip-with-image">
              <div className="tag-with-img d-flex align-items-center">
                <label className="form-label me-2">To</label>
                {/* <input
            className="input-tags form-control border-0 h-100"
            id="inputBox"
            type="text"
            data-role="tagsinput"
            name="Label"
            defaultValue="Angela Thomas"
          /> */}
                <Chips value={value} className="input-tags form-control border-0 h-100 w-100" onChange={(e: { value: string[] }) => onValueChange(e.value)} itemTemplate={customChip} />
              </div>
              <div className="d-flex align-items-center email-cc">
                <Link href="#" className="d-inline-flex me-2">
                  Cc
                </Link>
                <Link href="#" className="d-inline-flex">
                  Bcc
                </Link>
              </div>
            </div>
            <div className="p-3 border-bottom">
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="mb-0">
                <textarea
                  rows={7}
                  className="form-control"
                  placeholder="Compose Email"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="p-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-paperclip" />
                </Link>
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-photo" />
                </Link>
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-link" />
                </Link>
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-pencil" />
                </Link>
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-mood-smile" />
                </Link>
              </div>
              <div className="d-flex align-items-center compose-footer">
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-calendar-repeat" />
                </Link>
                <Link
                  href="#"
                  className="btn btn-icon btn-sm rounded-circle"
                >
                  <i className="ti ti-trash" />
                </Link>
                <button
                  type="button"
                  className="btn btn-primary d-inline-flex align-items-center ms-2"
                >
                  Send <i className="ti ti-arrow-right ms-2" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}
