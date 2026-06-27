import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import SignInFormPanel from "./SignInFormPanel";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/lib/host-context", () => ({
  isPublicMarketingHost: () => true,
  getTenantSubdomainFromHost: () => "",
}));

describe("SignInFormPanel", () => {
  beforeEach(() => {
    push.mockReset();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            access: "access-token",
            refresh: "refresh-token",
            user: { id: "1", email: "admin@test.com" },
          },
        }),
      }),
    );
    localStorage.clear();
  });

  it("stores platform session and redirects on successful login", async () => {
    const user = userEvent.setup();
    render(<SignInFormPanel />);

    await user.type(document.getElementById("sign-in-email")!, "admin@test.com");
    await user.type(document.getElementById("sign-in-password")!, "TestPass1!");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("sortorium_access_token")).toBe(
        "access-token",
      );
      expect(push).toHaveBeenCalledWith("/vendor-dashboard");
    });
  });
});
