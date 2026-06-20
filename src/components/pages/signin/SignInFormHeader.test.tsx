import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SignInFormHeader from "./SignInFormHeader";

describe("SignInFormHeader", () => {
  it("renders the sign-in title", () => {
    render(<SignInFormHeader />);
    expect(
      screen.getByRole("heading", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("renders the helper subtitle", () => {
    render(<SignInFormHeader />);
    expect(
      screen.getByText(/access the sortonium panel/i),
    ).toBeInTheDocument();
  });
});
