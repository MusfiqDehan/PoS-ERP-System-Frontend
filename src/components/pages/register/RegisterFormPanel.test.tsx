import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import RegisterFormPanel from "./RegisterFormPanel";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("plan=pro"),
}));

describe("RegisterFormPanel", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo) => {
        const url = String(input);
        if (url.includes("billing/public/packages")) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              success: true,
              data: {
                items: [
                  {
                    slug: "free",
                    name: "Free",
                    description: "",
                    price_monthly: "0.00",
                    price_yearly: "0.00",
                    is_trial: true,
                    max_branches: 1,
                    max_users: 5,
                    features: [],
                  },
                  {
                    slug: "pro",
                    name: "Pro",
                    description: "",
                    price_monthly: "29.00",
                    price_yearly: "290.00",
                    is_trial: false,
                    max_branches: 3,
                    max_users: 25,
                    features: [],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            message: "Registration received.",
            data: { invitation_id: "abc" },
          }),
        });
      }),
    );
  });

  it("submits selected plan from query param", async () => {
    const user = userEvent.setup();
    render(<RegisterFormPanel />);

    await waitFor(() => {
      expect(screen.getByLabelText(/plan/i)).toHaveValue("pro");
    });

    await user.type(screen.getByLabelText(/company name/i), "Acme");
    await user.type(screen.getByLabelText(/subdomain/i), "acme-shop");
    await user.type(screen.getByLabelText(/email address/i), "owner@acme.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /registration received/i,
      );
    });

    const fetchMock = vi.mocked(fetch);
    const registerCall = fetchMock.mock.calls.find(([url]) =>
      String(url).includes("tenancy/register"),
    );
    expect(registerCall).toBeTruthy();
    const [, init] = registerCall!;
    const body = JSON.parse(String(init?.body));
    expect(body.plan).toBe("pro");
  });
});
