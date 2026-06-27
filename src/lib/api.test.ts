import { describe, expect, it } from "vitest";
import { collectErrorMessages, joinApiUrl, type ApiEnvelope } from "./api";

describe("joinApiUrl", () => {
  it("always appends a trailing slash for Django APPEND_SLASH", () => {
    expect(joinApiUrl("/api/v1", "platform-owner/auth/login")).toBe(
      "/api/v1/platform-owner/auth/login/",
    );
    expect(joinApiUrl("/api/v1", "platform-owner/auth/login/")).toBe(
      "/api/v1/platform-owner/auth/login/",
    );
    expect(joinApiUrl("/api/v1/", "/billing/public/packages/")).toBe(
      "/api/v1/billing/public/packages/",
    );
  });
});

describe("collectErrorMessages", () => {
  it("flattens field errors from envelope", () => {
    const envelope: ApiEnvelope = {
      success: false,
      message: "Validation failed",
      errors: {
        plan: ["Select a valid subscription plan."],
        subdomain: ["This subdomain is already in use."],
      },
    };
    const lines = collectErrorMessages(envelope);
    expect(lines).toContain("Select a valid subscription plan.");
    expect(lines).toContain("This subdomain is already in use.");
  });

  it("falls back to message when errors are empty", () => {
    const envelope: ApiEnvelope = {
      success: false,
      message: "Invalid credentials.",
    };
    expect(collectErrorMessages(envelope)).toEqual(["Invalid credentials."]);
  });
});
