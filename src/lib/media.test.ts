import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  resolveProductImageUrl,
  resolveMediaUrl,
  DEFAULT_POS_PRODUCT_IMAGE,
} from "@/lib/media";

vi.mock("./env", () => ({
  getBackendOrigin: vi.fn(),
}));

import { getBackendOrigin } from "./env";

const mockedGetBackendOrigin = vi.mocked(getBackendOrigin);

describe("resolveMediaUrl", () => {
  beforeEach(() => {
    mockedGetBackendOrigin.mockReset();
  });

  it("prefixes /media/ URLs with backend origin in local dev", () => {
    mockedGetBackendOrigin.mockReturnValue("http://localhost:8002");
    expect(resolveMediaUrl("/media/assets/image/test.png")).toBe(
      "http://localhost:8002/media/assets/image/test.png",
    );
  });

  it("keeps /media/ URLs relative when API is same-origin", () => {
    mockedGetBackendOrigin.mockReturnValue("");
    expect(resolveMediaUrl("/media/assets/image/test.png")).toBe(
      "/media/assets/image/test.png",
    );
  });
});

describe("resolveProductImageUrl", () => {
  beforeEach(() => {
    mockedGetBackendOrigin.mockReturnValue("");
  });

  it("returns fallback for empty input", () => {
    expect(resolveProductImageUrl("")).toContain(DEFAULT_POS_PRODUCT_IMAGE);
  });

  it("prefixes /media/ URLs when backend origin is configured", () => {
    mockedGetBackendOrigin.mockReturnValue("http://localhost:8002");
    expect(resolveProductImageUrl("/media/assets/image/test.png")).toBe(
      "http://localhost:8002/media/assets/image/test.png",
    );
  });

  it("passes through absolute URLs", () => {
    expect(resolveProductImageUrl("https://cdn.example.com/a.jpg")).toBe(
      "https://cdn.example.com/a.jpg",
    );
  });

  it("prefixes relative asset paths", () => {
    expect(resolveProductImageUrl("assets/img/foo.png")).toBe(
      "/assets/img/foo.png",
    );
  });
});
