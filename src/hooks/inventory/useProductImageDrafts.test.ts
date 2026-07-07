import { describe, it, expect } from "vitest";
import { draftsFromUrls } from "@/hooks/inventory/useProductImageDrafts";

describe("draftsFromUrls", () => {
  it("maps existing URLs to drafts with uploadedUrl set", () => {
    const drafts = draftsFromUrls(["/media/a.png", "https://cdn.example.com/b.jpg"]);
    expect(drafts).toHaveLength(2);
    expect(drafts[0].uploadedUrl).toBe("/media/a.png");
    expect(drafts[0].previewUrl).toBe("/media/a.png");
    expect(drafts[1].uploadedUrl).toBe("https://cdn.example.com/b.jpg");
  });
});
