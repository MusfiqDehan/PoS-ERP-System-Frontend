import { GiftData } from "@/core/json/giftCardData";
import type { GiftCardRecord } from "@/components/promo/gift-cards/types";

export function useGiftCards() {
  const dataSource = GiftData as GiftCardRecord[];

  return { dataSource };
}
