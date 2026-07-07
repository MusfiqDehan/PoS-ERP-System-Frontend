import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Sidebar from "./sidebar";

vi.mock("@/providers/auth-provider", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-perfect-scrollbar", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/core/common/image-with-base-path", () => ({
  default: () => <span data-testid="logo" />,
}));

import { useAuth } from "@/providers/auth-provider";

const mockUseAuth = vi.mocked(useAuth);

describe("Sidebar", () => {
  it("does not render a role switcher dropdown", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      sessionKind: "tenant",
      tier: "owner",
      platformAccess: null,
      tenantAccess: {
        role_slugs: ["admin"],
        is_tenant_admin: true,
        permissions: {},
        enabled_features: [],
      },
      refreshAccess: vi.fn(),
      logout: vi.fn(),
    });

    render(<Sidebar />);

    expect(screen.queryByLabelText("View as role")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("shows platform overview for platform tier", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      sessionKind: "platform",
      tier: "platform",
      platformAccess: {
        permissions: {
          "platform.dashboard": "view",
          "platform.tenants": "full",
        },
      },
      tenantAccess: null,
      refreshAccess: vi.fn(),
      logout: vi.fn(),
    });

    render(<Sidebar />);

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.queryByText("Sales Dashboard")).not.toBeInTheDocument();
  });

  it("shows tenant dashboard for owner tier", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      sessionKind: "tenant",
      tier: "owner",
      platformAccess: null,
      tenantAccess: {
        role_slugs: ["admin"],
        is_tenant_admin: true,
        permissions: {},
        enabled_features: [],
      },
      refreshAccess: vi.fn(),
      logout: vi.fn(),
    });

    render(<Sidebar />);

    expect(screen.getByText("Sales Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Companies")).not.toBeInTheDocument();
  });

  it("filters sidebar menus from the search input", async () => {
    const user = userEvent.setup();

    mockUseAuth.mockReturnValue({
      loading: false,
      sessionKind: "tenant",
      tier: "owner",
      platformAccess: null,
      tenantAccess: {
        role_slugs: ["admin"],
        is_tenant_admin: true,
        permissions: {},
        enabled_features: [],
      },
      refreshAccess: vi.fn(),
      logout: vi.fn(),
    });

    render(<Sidebar />);

    expect(screen.getByText("Inventory")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search sidebar menus"), "sales");

    expect(screen.getByText("Sales Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Inventory")).not.toBeInTheDocument();
  });

  it("shows an empty state when no menus match the search", async () => {
    const user = userEvent.setup();

    mockUseAuth.mockReturnValue({
      loading: false,
      sessionKind: "tenant",
      tier: "owner",
      platformAccess: null,
      tenantAccess: {
        role_slugs: ["admin"],
        is_tenant_admin: true,
        permissions: {},
        enabled_features: [],
      },
      refreshAccess: vi.fn(),
      logout: vi.fn(),
    });

    render(<Sidebar />);

    await user.type(screen.getByLabelText("Search sidebar menus"), "zzzz-not-found");

    expect(screen.getByText("No menus found")).toBeInTheDocument();
  });
});
