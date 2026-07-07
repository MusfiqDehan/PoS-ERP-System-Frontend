import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  StockAdjustmentPersonCell,
  StockAdjustmentProductCell,
} from "@/components/stock/stock-adjustment/StockAdjustmentRow";
import type { StockAdjustmentRecord } from "@/components/stock/stock-adjustment/types";

const sampleRecord: StockAdjustmentRecord = {
  id: "adj-1",
  branch: "branch-1",
  branch_name: "Main Shop",
  warehouse: null,
  product: "prod-1",
  product_name: "Test Product",
  variant: null,
  quantity_before: "10",
  quantity_after: "15",
  reason: "Cycle count",
  responsible_person: "user-1",
  responsible_person_name: "Jane Doe",
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

describe("StockAdjustmentRow cells", () => {
  it("renders product cell with product name", () => {
    render(<StockAdjustmentProductCell record={sampleRecord} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders person cell with responsible person name", () => {
    render(<StockAdjustmentPersonCell record={sampleRecord} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders em dash when person name is missing", () => {
    render(
      <StockAdjustmentPersonCell
        record={{ ...sampleRecord, responsible_person_name: undefined, responsible_person: null }}
      />,
    );
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
