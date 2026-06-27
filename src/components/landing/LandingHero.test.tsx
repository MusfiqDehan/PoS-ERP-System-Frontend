import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LandingHero from "./LandingHero";

describe("LandingHero", () => {
  it("renders login and register links", () => {
    render(<LandingHero />);
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute(
      "href",
      "/signin",
    );
    expect(screen.getByRole("link", { name: /register/i })).toHaveAttribute(
      "href",
      "/register",
    );
  });
});
