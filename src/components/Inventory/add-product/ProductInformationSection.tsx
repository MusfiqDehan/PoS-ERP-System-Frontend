"use client";

import FormCol from "@/core/common/form/FormCol";
import FormField from "@/core/common/form/FormField";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import TextEditor from "@/core/common/texteditor/texteditor";
import { Info, PlusCircle } from "react-feather";
import Link from "next/link";
import {
  barcodeSymbolOptions,
  brandOptions,
  categoryOptions,
  sellingTypeOptions,
  storeOptions,
  subcategoryOptions,
  unitOptions,
  warehouseOptions,
} from "./selectOptions";

export default function ProductInformationSection() {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingOne">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingOne"
          aria-expanded="true"
          aria-controls="SpacingOne"
        >
          <div className="d-flex align-items-center justify-content-between flex-fill">
            <h5 className="d-flex align-items-center">
              <Info className="text-primary me-2" />
              <span>Product Information</span>
            </h5>
          </div>
        </div>
      </h2>
      <div
        id="SpacingOne"
        className="accordion-collapse collapse show"
        aria-labelledby="headingSpacingOne"
      >
        <div className="accordion-body border-top">
          <div className="row">
            <FormCol>
              <SelectField label="Store" required options={storeOptions} />
            </FormCol>
            <FormCol>
              <SelectField
                label="Warehouse"
                required
                options={warehouseOptions}
              />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <TextField label="Product Name" required />
            </FormCol>
            <FormCol>
              <TextField label="Slug" required />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <TextField
                label="SKU"
                required
                inputClassName="list"
                action={{ label: "Generate" }}
              />
            </FormCol>
            <FormCol>
              <SelectField
                label="Selling Type"
                required
                options={sellingTypeOptions}
              />
            </FormCol>
          </div>
          <div className="addservice-info">
            <div className="row">
              <FormCol>
                <SelectField
                  label="Category"
                  required
                  options={categoryOptions}
                  labelWrapperClassName="add-newplus"
                  labelAddon={
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add-units-category"
                    >
                      <PlusCircle
                        size={14}
                        data-feather="plus-circle"
                        className="plus-down-add"
                      />
                      <span>Add New</span>
                    </Link>
                  }
                />
              </FormCol>
              <FormCol>
                <SelectField
                  label="Sub Category"
                  required
                  options={subcategoryOptions}
                />
              </FormCol>
            </div>
          </div>
          <div className="add-product-new">
            <div className="row">
              <FormCol>
                <SelectField
                  label="Brand"
                  required
                  options={brandOptions}
                  labelWrapperClassName="add-newplus"
                />
              </FormCol>
              <FormCol>
                <SelectField
                  label="Unit"
                  required
                  options={unitOptions}
                  labelWrapperClassName="add-newplus"
                />
              </FormCol>
            </div>
          </div>
          <div className="row">
            <FormCol lg={6}>
              <SelectField
                label="Barcode Symbology"
                required
                options={barcodeSymbolOptions}
              />
            </FormCol>
            <FormCol lg={6}>
              <TextField
                label="Item Code"
                required
                inputClassName="list"
                action={{ label: "Generate", type: "submit" }}
              />
            </FormCol>
          </div>
          <div className="col-lg-12">
            <FormField label="Description">
              <div className="summer-description-box">
                <TextEditor />
                <p className="fs-14 mt-1">Maximum 60 Words</p>
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}
