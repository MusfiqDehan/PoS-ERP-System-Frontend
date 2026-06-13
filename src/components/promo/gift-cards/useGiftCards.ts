import { GiftData } from "@/core/json/giftCardData";
import type { GiftCardRecord } from "./types";

export function useGiftCards() {
  const dataSource = GiftData as GiftCardRecord[];

  return { dataSource };
}
