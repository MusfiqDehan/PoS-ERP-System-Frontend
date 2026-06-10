import { all_routes } from "@/data/all_routes";

export type ExpiredProduct = {
    id: string;
    name: string;
    sku: string;
    manufacturedOn: string;
    expiredOn: string;
};

export const expiredProductsData: ExpiredProduct[] = [
    {
        id: "expired-1",
        name: "USB-C Hub 7-Port",
        sku: "PT006",
        manufacturedOn: "26 Feb 2024",
        expiredOn: "26 May 2026",
    },
    {
        id: "expired-2",
        name: "USB-C Hub 7-Port",
        sku: "PT006",
        manufacturedOn: "26 Feb 2024",
        expiredOn: "26 May 2026",
    },
    {
        id: "expired-3",
        name: "USB-C Hub 7-Port",
        sku: "PT006",
        manufacturedOn: "26 Feb 2024",
        expiredOn: "26 May 2026",
    },
    {
        id: "expired-4",
        name: "USB-C Hub 7-Port",
        sku: "PT006",
        manufacturedOn: "26 Feb 2024",
        expiredOn: "26 May 2026",
    },
    {
        id: "expired-5",
        name: "USB-C Hub 7-Port",
        sku: "PT006",
        manufacturedOn: "26 Feb 2024",
        expiredOn: "26 May 2026",
    },
    {
        id: "expired-6",
        name: "USB-C Hub 7-Port",
        sku: "PT006",
        manufacturedOn: "26 Feb 2024",
        expiredOn: "26 May 2026",
    },
];

export const expiredProductsViewAllHref = all_routes.expiredproduct;