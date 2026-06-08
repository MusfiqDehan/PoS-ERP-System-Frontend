"use client";

import SelectField from "@/core/common/form/SelectField";
import FormCol from "@/core/common/form/FormCol";
import { PaperSize } from "@/core/common/selectOption/selectOption";

export default function BarcodePrintSettings() {
  return (
    <div className="paper-search-size">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <form className="mb-0">
            <SelectField
              label="Paper Size"
              required
              options={PaperSize}
              placeholder="Choose"
              classNamePrefix="react-select"
            />
          </form>
        </div>
        <div className="col-lg-6 pt-3">
          <div className="row">
            <FormCol sm={4}>
              <div className="search-toggle-list">
                <p>Show Store Name</p>
                <div className="m-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <input
                      type="checkbox"
                      id="user7"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="user7" className="checktoggle mb-0" />
                  </div>
                </div>
              </div>
            </FormCol>
            <FormCol sm={4}>
              <div className="search-toggle-list">
                <p>Show Product Name</p>
                <div className="m-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <input
                      type="checkbox"
                      id="user8"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="user8" className="checktoggle mb-0" />
                  </div>
                </div>
              </div>
            </FormCol>
            <FormCol sm={4}>
              <div className="search-toggle-list">
                <p>Show Price</p>
                <div className="m-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <input
                      type="checkbox"
                      id="user9"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="user9" className="checktoggle mb-0">
                      {" "}
                    </label>
                  </div>
                </div>
              </div>
            </FormCol>
          </div>
        </div>
      </div>
    </div>
  );
}
