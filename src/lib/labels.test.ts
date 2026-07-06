import { describe, expect, it, vi, beforeEach } from "vitest";

function mockFetchSuccess(data: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data }),
    }),
  );
}

describe("labels API client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("generateLabelBatch sends POST with preset_id", async () => {
    mockFetchSuccess([{ entity_type: "product", image_base64: "abc" }]);

    const { generateLabelBatch } = await import("./labels");
    await generateLabelBatch(
      {
        preset_id: "preset-1",
        branch_id: "branch-1",
        warehouse_id: "wh-1",
        items: [{ entity_type: "product", entity_id: "prod-1", quantity: 2 }],
      },
      "token",
    );

    const fetchCall = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(fetchCall[0]).toContain("inventory/labels/batch/");
    const body = JSON.parse(fetchCall[1].body as string);
    expect(body.preset_id).toBe("preset-1");
    expect(body.warehouse_id).toBe("wh-1");
    expect(body.items).toHaveLength(1);
  });

  it("generateLabelBatch sends label_size for custom dimensions", async () => {
    mockFetchSuccess([]);

    const { generateLabelBatch } = await import("./labels");
    await generateLabelBatch(
      {
        code_type: "qrcode",
        label_size: { width_mm: 50, height_mm: 30 },
        items: [{ entity_type: "product", entity_id: "prod-1", quantity: 1 }],
      },
      "token",
    );

    const body = JSON.parse(
      (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string,
    );
    expect(body.label_size).toEqual({ width_mm: 50, height_mm: 30 });
    expect(body.code_type).toBe("qrcode");
    expect(body.preset_id).toBeUndefined();
  });

  it("fetchLabelPresets filters by code_type", async () => {
    mockFetchSuccess([]);

    const { fetchLabelPresets } = await import("./labels");
    await fetchLabelPresets("token", "barcode");

    expect((fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toContain(
      "code_type=barcode",
    );
  });
});
