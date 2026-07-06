"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SelectField from "@/core/common/form/SelectField";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import { fetchBranches, type Branch } from "@/lib/branches";
import {
  createLabelPreset,
  fetchProductPackages,
  generateLabelBatch,
  type LabelBatchPayload,
  type LabelCodeType,
  type LabelOutput,
  type LabelPrintFields,
  type ProductPackage,
} from "@/lib/labels";
import { fetchProducts, type Product } from "@/lib/inventory";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import { useLabelPresets } from "@/hooks/inventory/useLabelPresets";
import { useLabelPrintQueue } from "@/hooks/inventory/useLabelPrintQueue";
import PrintLabelModal from "./PrintLabelModal";

const SYMBology_OPTIONS = [
  { label: "Code 128", value: "code128" },
  { label: "EAN-13", value: "ean13" },
  { label: "UPC-A", value: "upca" },
];

type LabelPrintWorkspaceProps = {
  codeType: LabelCodeType;
};

export default function LabelPrintWorkspace({ codeType }: LabelPrintWorkspaceProps) {
  const { systemPresets, customPresets, loading: presetsLoading } = useLabelPresets(codeType);
  const { items, addItem, removeItem, updateQuantity, clear } = useLabelPrintQueue();

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [warehouseId, setWarehouseId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [sizeMode, setSizeMode] = useState<"preset" | "custom">("preset");
  const [presetId, setPresetId] = useState("");
  const [customWidth, setCustomWidth] = useState("50");
  const [customHeight, setCustomHeight] = useState("30");
  const [symbology, setSymbology] = useState("code128");
  const [saveCustomSize, setSaveCustomSize] = useState(false);
  const [customPresetName, setCustomPresetName] = useState("My Custom Label");
  const [printFields, setPrintFields] = useState<LabelPrintFields>({
    store_name: true,
    warehouse_name: false,
    product_name: true,
    price: true,
    ref_number: codeType === "qrcode",
  });

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLabels, setGeneratedLabels] = useState<LabelOutput[]>([]);

  useEffect(() => {
    const token = getAccessToken();
    Promise.all([fetchWarehouses(token), fetchBranches(token)]).then(
      ([whRes, brRes]) => {
        if (whRes.ok && whRes.body.data) {
          setWarehouses(extractListItems<Warehouse>(whRes.body.data));
        }
        if (brRes.ok && brRes.body.data) {
          setBranches(extractListItems<Branch>(brRes.body.data));
        }
      },
    );
  }, []);

  useEffect(() => {
    if (!presetId && systemPresets.length > 0) {
      setPresetId(systemPresets[0].id);
    }
  }, [systemPresets, presetId]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const handle = window.setTimeout(async () => {
      const result = await fetchProducts(getAccessToken(), {
        search: search.trim(),
        page_size: 10,
      });
      if (result.ok && result.body.data) {
        setSearchResults(extractListItems<Product>(result.body.data));
      }
    }, 300);
    return () => window.clearTimeout(handle);
  }, [search]);

  const presetOptions = useMemo(() => {
    const standard = systemPresets.map((p) => ({
      label: p.name,
      value: p.id,
    }));
    const saved = customPresets.map((p) => ({
      label: `${p.name} (${p.width_mm}×${p.height_mm} mm)`,
      value: p.id,
    }));
    return [
      ...standard,
      ...saved,
      { label: "Custom size…", value: "__custom__" },
    ];
  }, [systemPresets, customPresets]);

  const buildBatchPayload = useCallback((): LabelBatchPayload | null => {
    if (!warehouseId || !branchId) {
      setError("Warehouse and store are required.");
      return null;
    }
    if (items.length === 0) {
      setError("Add at least one product to the queue.");
      return null;
    }

    const payload: LabelBatchPayload = {
      branch_id: branchId,
      warehouse_id: warehouseId,
      print_fields: printFields,
      items: items.map((item) => ({
        entity_type: item.entity_type,
        entity_id: item.entity_id,
        quantity: item.quantity,
      })),
    };

    if (sizeMode === "custom") {
      const width = Number(customWidth);
      const height = Number(customHeight);
      if (!width || !height || width < 20 || height < 15) {
        setError("Custom size must be at least 20×15 mm.");
        return null;
      }
      payload.code_type = codeType;
      payload.label_size = {
        width_mm: width,
        height_mm: height,
        ...(codeType === "barcode" ? { symbology } : {}),
      };
    } else if (presetId) {
      payload.preset_id = presetId;
    } else {
      setError("Select a paper size.");
      return null;
    }

    return payload;
  }, [
    warehouseId,
    branchId,
    items,
    printFields,
    sizeMode,
    customWidth,
    customHeight,
    codeType,
    symbology,
    presetId,
  ]);

  const handleSelectProduct = async (product: Product) => {
    setSearch("");
    setSearchOpen(false);
    addItem({
      entity_type: "product",
      entity_id: product.id,
      quantity: 1,
      displayName: product.name,
      sku: product.sku,
      barcode: product.barcode,
      productId: product.id,
    });
  };

  const handleAddPackageBundle = async (productId: string, displayName: string) => {
    const pkgRes = await fetchProductPackages(productId, getAccessToken());
    if (!pkgRes.ok || !pkgRes.body.data) return;
    const packages = extractListItems<ProductPackage>(pkgRes.body.data);
    if (packages.length === 0) return;
    const pkg = packages[0];
    addItem({
      entity_type: "package",
      entity_id: pkg.id,
      quantity: 1,
      displayName: `${displayName} (${pkg.name})`,
      sku: pkg.sku,
      barcode: pkg.barcode,
      productId,
    });
    addItem({
      entity_type: "product",
      entity_id: productId,
      quantity: pkg.unit_quantity,
      displayName,
      sku: pkg.sku,
      barcode: null,
      productId,
    });
  };

  const handleGenerate = async () => {
    setError(null);
    const payload = buildBatchPayload();
    if (!payload) return;

    setGenerating(true);
    const token = getAccessToken();

    if (sizeMode === "custom" && saveCustomSize) {
      await createLabelPreset(
        {
          name: customPresetName,
          code_type: codeType,
          width_mm: Number(customWidth),
          height_mm: Number(customHeight),
          symbology: codeType === "barcode" ? symbology : undefined,
        },
        token,
      );
    }

    const result = await generateLabelBatch(payload, token);
    setGenerating(false);

    if (!result.ok || !result.body.data) {
      setError(result.body.message ?? "Failed to generate labels.");
      return;
    }

    const labels = Array.isArray(result.body.data)
      ? result.body.data
      : [result.body.data];
    setGeneratedLabels(labels);
  };

  const handleReset = () => {
    clear();
    setGeneratedLabels([]);
    setError(null);
  };

  const toggleField = (key: keyof LabelPrintFields) => {
    setPrintFields((current) => ({ ...current, [key]: !current[key] }));
  };

  const title = codeType === "barcode" ? "Barcode" : "QR Code";

  return (
    <>
      <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[14px] text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-[50%]">
          <SelectField
            label="Warehouse"
            required
            options={warehouses.map((w) => ({ label: w.name, value: w.id }))}
            value={
              warehouses
                .map((w) => ({ label: w.name, value: w.id }))
                .find((o) => o.value === warehouseId) ?? null
            }
            onChange={(option) => setWarehouseId(option?.value ?? "")}
            placeholder="Choose"
            classNamePrefix="react-select"
          />
          <SelectField
            label="Store"
            required
            options={branches.map((b) => ({ label: b.name, value: b.id }))}
            value={
              branches
                .map((b) => ({ label: b.name, value: b.id }))
                .find((o) => o.value === branchId) ?? null
            }
            onChange={(option) => setBranchId(option?.value ?? "")}
            placeholder="Choose"
            classNamePrefix="react-select"
          />
        </div>

        <div className="lg:max-w-[50%] mt-4 relative">
          <label className="block text-[13px] font-medium text-[#212B36] mb-1.5">
            Product <span className="text-[#dc3545]">*</span>
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            className="w-full border border-[#e7e7e7] rounded-md pl-3 pr-9 py-2 text-[14px] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e]"
            placeholder="Search product by name, SKU, or barcode"
          />
          {searchOpen && searchResults.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border border-[#e7e7e7] bg-white shadow-lg max-h-48 overflow-auto">
              {searchResults.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-[14px] hover:bg-[#f6f6f6]"
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.name} ({product.sku})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 rounded-[8px] border border-[#f1f1f1] bg-[#f9fafb] p-3 sm:p-4">
          <div className="overflow-x-auto rounded-md border border-[#e7e7e7] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e7e7e7] text-[13px] text-[#646B72]">
                  <th className="px-3 py-2.5 font-semibold">Product</th>
                  <th className="px-3 py-2.5 font-semibold">SKU</th>
                  <th className="px-3 py-2.5 font-semibold">Type</th>
                  <th className="px-3 py-2.5 font-semibold">Qty</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-[14px] text-[#646B72]">
                      Search and add products to print labels.
                    </td>
                  </tr>
                ) : (
                  items.map((row) => (
                    <tr key={row.key} className="border-b border-[#f1f1f1] text-[14px]">
                      <td className="px-3 py-2.5">{row.displayName}</td>
                      <td className="px-3 py-2.5">{row.sku}</td>
                      <td className="px-3 py-2.5 capitalize">{row.entity_type}</td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          min={1}
                          value={row.quantity}
                          onChange={(e) =>
                            updateQuantity(row.key, Number(e.target.value) || 1)
                          }
                          className="w-16 border border-[#e7e7e7] rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <div className="inline-flex items-center gap-2">
                          {row.entity_type === "product" && row.productId && (
                            <button
                              type="button"
                              title="Add package + units"
                              onClick={() =>
                                handleAddPackageBundle(row.productId!, row.displayName)
                              }
                              className="text-[12px] text-[#0ac79e] hover:underline"
                            >
                              + Package
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeItem(row.key)}
                            className="text-[#646B72] hover:text-[#c80000]"
                            aria-label="Remove"
                          >
                            <i className="ti ti-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <div className="lg:max-w-[90%] space-y-3">
            <SelectField
              label="Paper Size"
              required
              options={presetOptions}
              value={
                presetOptions.find(
                  (o) => o.value === (sizeMode === "custom" ? "__custom__" : presetId),
                ) ?? null
              }
              onChange={(option) => {
                const value = option?.value ?? "";
                if (value === "__custom__") {
                  setSizeMode("custom");
                } else {
                  setSizeMode("preset");
                  setPresetId(value);
                }
              }}
              placeholder={presetsLoading ? "Loading…" : "Choose"}
              classNamePrefix="react-select"
            />
            {sizeMode === "custom" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium mb-1">Width (mm)</label>
                  <input
                    type="number"
                    min={20}
                    max={420}
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1">Height (mm)</label>
                  <input
                    type="number"
                    min={15}
                    max={420}
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px]"
                  />
                </div>
                {codeType === "barcode" && (
                  <div className="col-span-2">
                    <SelectField
                      label="Symbology"
                      options={SYMBology_OPTIONS}
                      value={
                        SYMBology_OPTIONS.find((o) => o.value === symbology) ?? null
                      }
                      onChange={(option) => setSymbology(option?.value ?? "code128")}
                      classNamePrefix="react-select"
                    />
                  </div>
                )}
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    id="save-custom-size"
                    type="checkbox"
                    checked={saveCustomSize}
                    onChange={(e) => setSaveCustomSize(e.target.checked)}
                  />
                  <label htmlFor="save-custom-size" className="text-[14px]">
                    Save this size for later
                  </label>
                </div>
                {saveCustomSize && (
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={customPresetName}
                      onChange={(e) => setCustomPresetName(e.target.value)}
                      className="w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px]"
                      placeholder="Preset name"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 lg:pt-7">
            {(
              [
                ["store_name", "Show Store Name"],
                ["warehouse_name", "Show Warehouse Name"],
                ["product_name", "Show Product Name"],
                ["price", "Show Price"],
                ...(codeType === "qrcode"
                  ? ([["ref_number", "Reference Number"]] as const)
                  : []),
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-[14px] text-[#212B36]">{label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(printFields[key])}
                    onChange={() => toggleField(key)}
                    className="sr-only peer"
                  />
                  <span className="w-10 h-5 bg-gray-200 rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] disabled:opacity-60"
          >
            <i className="fas fa-eye" />
            {generating ? "Generating…" : `Generate ${title}`}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6]"
          >
            <i className="fas fa-power-off" />
            Reset
          </button>
        </div>
      </div>

      <PrintLabelModal
        labels={generatedLabels}
        title={title}
        onClose={() => setGeneratedLabels([])}
      />
    </>
  );
}
