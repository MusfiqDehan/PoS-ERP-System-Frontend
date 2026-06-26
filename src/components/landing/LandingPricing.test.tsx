import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import LandingPricing from "./LandingPricing";

describe("LandingPricing", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            items: [
              {
                slug: "pro",
                name: "Pro",
                description: "Growth",
                price_monthly: "29.00",
                price_yearly: "290.00",
                is_trial: false,
                max_branches: 3,
                max_users: 25,
                features: [{ key: "pos", name: "POS" }],
              },
            ],
          },
        }),
      }),
    );
  });

  it("renders package CTA with plan query param", async () => {
    render(<LandingPricing />);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /get started/i })).toHaveAttribute(
        "href",
        "/register?plan=pro",
      );
    });
  });
});
