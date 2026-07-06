import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import EditPlanModal from "./EditPlanModal";

vi.mock("@/lib/auth-session", () => ({
  getAccessToken: vi.fn(() => "mock-token"),
}));

vi.mock("@/lib/billing", () => ({
  fetchPlatformPackage: vi.fn().mockResolvedValue({
    ok: true,
    body: {
      success: true,
      data: {
        id: "pkg-1",
        software_product: "prod-1",
        software_product_slug: "sortorium-pos",
        name: "Starter",
        slug: "starter",
        description: "A basic plan",
        price_monthly: "9.99",
        price_yearly: "99.00",
        is_public: true,
        is_trial: false,
        sort_order: 1,
        max_branches: 1,
        max_users: 10,
        max_custom_roles: 0,
        max_admins: 1,
        max_staff: 5,
        is_active: true,
        created_at: "2026-01-01",
        updated_at: "2026-01-01",
        package_features: [
          { id: "pf-1", feature: "feat-1", feature_key: "pos", feature_name: "POS Module", limit_value: null },
        ],
        role_limits: [
          { id: "rl-1", role_slug: "cashier", max_users: 3 },
        ],
      },
    },
  }),
  fetchPlatformFeatures: vi.fn().mockResolvedValue({
    ok: true,
    body: {
      success: true,
      data: [
        { id: "feat-1", key: "pos", name: "POS Module", scope: "tenant", description: "", sort_order: 0 },
        { id: "feat-2", key: "inventory", name: "Inventory", scope: "tenant", description: "", sort_order: 1 },
      ],
    },
  }),
  updatePlatformPackage: vi.fn().mockResolvedValue({
    ok: true,
    body: {
      success: true,
      data: { id: "pkg-1", name: "Starter", slug: "starter" },
    },
  }),
}));

describe("EditPlanModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows placeholder when no packageId", () => {
    render(<EditPlanModal />);
    expect(screen.getByText("Select a package to edit.")).toBeInTheDocument();
  });

  it("loads and displays package data when packageId is set", async () => {
    render(<EditPlanModal packageId="pkg-1" />);

    await waitFor(() => {
      expect(screen.getByText("Edit Package")).toBeInTheDocument();
    });

    await waitFor(() => {
      const nameInput = screen.getByDisplayValue("Starter") as HTMLInputElement;
      expect(nameInput).toBeInTheDocument();
    });
  });

  it("shows the software product slug in header", async () => {
    render(<EditPlanModal packageId="pkg-1" />);

    await waitFor(() => {
      expect(screen.getByText(/sortorium-pos/)).toBeInTheDocument();
    });
  });

  it("shows is_public and is_trial toggles", async () => {
    render(<EditPlanModal packageId="pkg-1" />);

    await waitFor(() => {
      expect(screen.getByText("Public (visible on marketing site)")).toBeInTheDocument();
      expect(screen.getByText("Trial")).toBeInTheDocument();
    });
  });

  it("shows feature checkboxes from the features API", async () => {
    render(<EditPlanModal packageId="pkg-1" />);

    await waitFor(() => {
      expect(screen.getByText("POS Module")).toBeInTheDocument();
      expect(screen.getByText("Inventory")).toBeInTheDocument();
    });
  });

  it("displays existing role limits", async () => {
    render(<EditPlanModal packageId="pkg-1" />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("cashier")).toBeInTheDocument();
      expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    });
  });
});
