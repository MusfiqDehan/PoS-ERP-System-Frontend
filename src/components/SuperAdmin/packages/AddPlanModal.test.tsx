import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import AddPlanModal from "./AddPlanModal";

vi.mock("@/lib/auth-session", () => ({
  getAccessToken: vi.fn(() => "mock-token"),
}));

vi.mock("@/lib/billing", () => ({
  fetchPlatformProducts: vi.fn().mockResolvedValue({
    ok: true,
    body: {
      success: true,
      data: [
        { id: "prod-1", name: "Sortorium POS", slug: "sortorium-pos" },
      ],
    },
  }),
  fetchPlatformFeatures: vi.fn().mockResolvedValue({
    ok: true,
    body: {
      success: true,
      data: [
        { id: "feat-1", key: "pos", name: "POS Module", scope: "tenant", description: "", sort_order: 0 },
        { id: "feat-2", key: "inventory", name: "Inventory", scope: "tenant", description: "", sort_order: 1 },
        { id: "feat-p", key: "platform.admin", name: "Platform Admin", scope: "platform", description: "", sort_order: 0 },
      ],
    },
  }),
  createPlatformPackage: vi.fn().mockResolvedValue({
    ok: true,
    body: {
      success: true,
      data: { id: "new-pkg-1", name: "Test", slug: "test" },
    },
  }),
}));

describe("AddPlanModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with key fields", async () => {
    render(<AddPlanModal />);

    await waitFor(() => {
      expect(screen.getByText("Add New Package")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("e.g. Starter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("auto-generated from name")).toBeInTheDocument();
    expect(screen.getByText("Create Package")).toBeInTheDocument();
  });

  it("shows only tenant-scoped features, not platform features", async () => {
    render(<AddPlanModal />);

    await waitFor(() => {
      expect(screen.getByText("POS Module")).toBeInTheDocument();
      expect(screen.getByText("Inventory")).toBeInTheDocument();
    });

    expect(screen.queryByText("Platform Admin")).not.toBeInTheDocument();
  });

  it("auto-generates slug from name", async () => {
    render(<AddPlanModal />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("e.g. Starter")).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText("e.g. Starter");
    fireEvent.change(nameInput, { target: { value: "Pro Plan" } });

    const slugInput = screen.getByPlaceholderText("auto-generated from name") as HTMLInputElement;
    expect(slugInput.value).toBe("pro-plan");
  });

  it("shows role limit rows when Add Role Limit is clicked", async () => {
    render(<AddPlanModal />);

    await waitFor(() => {
      expect(screen.getByText("+ Add Role Limit")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("+ Add Role Limit"));

    expect(screen.getByPlaceholderText("Role slug (e.g. cashier)")).toBeInTheDocument();
  });

  it("shows Public and Trial toggles", async () => {
    render(<AddPlanModal />);

    await waitFor(() => {
      expect(screen.getByText("Public (visible on marketing site)")).toBeInTheDocument();
      expect(screen.getByText("Trial")).toBeInTheDocument();
    });
  });
});
