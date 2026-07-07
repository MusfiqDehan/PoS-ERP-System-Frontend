import { describe, expect, it } from "vitest";

import {
  allFeatureKeys,
  PLATFORM_FLAG_KEYS,
  subscriptionFeatureKeys,
} from "./featureGroups";

describe("featureGroups", () => {
  it("keeps landing_page as a platform flag, not subscription feature", () => {
    expect(allFeatureKeys()).toContain("landing_page");
    expect(subscriptionFeatureKeys()).not.toContain("landing_page");
    expect(PLATFORM_FLAG_KEYS).toEqual(["landing_page"]);
  });
});
