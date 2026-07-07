import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLabelPrintQueue } from "./useLabelPrintQueue";

describe("useLabelPrintQueue", () => {
  it("adds and removes queue items", () => {
    const { result } = renderHook(() => useLabelPrintQueue());

    act(() => {
      result.current.addItem({
        entity_type: "product",
        entity_id: "p1",
        quantity: 2,
        displayName: "Soap",
        sku: "SOAP-1",
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);

    const key = result.current.items[0].key;
    act(() => result.current.removeItem(key));
    expect(result.current.items).toHaveLength(0);
  });

  it("merges duplicate entity rows", () => {
    const { result } = renderHook(() => useLabelPrintQueue());

    act(() => {
      result.current.addItem({
        entity_type: "product",
        entity_id: "p1",
        quantity: 1,
        displayName: "Soap",
        sku: "SOAP-1",
      });
      result.current.addItem({
        entity_type: "product",
        entity_id: "p1",
        quantity: 3,
        displayName: "Soap",
        sku: "SOAP-1",
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(4);
  });
});
