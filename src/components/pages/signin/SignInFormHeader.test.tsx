import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SignInFormHeader from "./SignInFormHeader";

describe("SignInFormHeader", () => {
  describe("default (public marketing host)", () => {
    it("renders the sign-in title", () => {
      render(<SignInFormHeader />);
      expect(
        screen.getByRole("heading", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    it("renders the generic subtitle", () => {
      render(<SignInFormHeader />);
      expect(
        screen.getByText(/access the sortorium panel/i),
      ).toBeInTheDocument();
    });
  });

  describe("tenant mode", () => {
    it("renders the workspace badge", () => {
      render(<SignInFormHeader tenantSubdomain="jubayer" />);
      const badge = screen.getByText(/^workspace$/i);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("auth-split-page__tenant-badge");
    });

    it("renders the Welcome Back heading", () => {
      render(<SignInFormHeader tenantSubdomain="jubayer" />);
      expect(
        screen.getByRole("heading", { name: /welcome back/i }),
      ).toBeInTheDocument();
    });

    it("renders the tenant-specific subtitle", () => {
      render(<SignInFormHeader tenantSubdomain="jubayer" />);
      expect(
        screen.getByText(/inventory, sales/i),
      ).toBeInTheDocument();
    });
  });

  describe("platform mode", () => {
    it("renders the administration badge", () => {
      render(<SignInFormHeader isPlatform />);
      expect(screen.getByText(/administration/i)).toBeInTheDocument();
    });

    it("renders the platform admin title", () => {
      render(<SignInFormHeader isPlatform />);
      expect(
        screen.getByRole("heading", { name: /platform admin/i }),
      ).toBeInTheDocument();
    });

    it("renders the platform-specific subtitle", () => {
      render(<SignInFormHeader isPlatform />);
      expect(
        screen.getByText(/manage tenants, billing/i),
      ).toBeInTheDocument();
    });

    it("does not render tenant sign-in title", () => {
      render(<SignInFormHeader isPlatform />);
      expect(
        screen.queryByRole("heading", { name: /^sign in$/i }),
      ).not.toBeInTheDocument();
    });
  });
});
