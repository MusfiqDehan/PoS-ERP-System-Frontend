import { all_routes } from "@/data/all_routes";

export type RecentlyAddedItem = {
    id: string;
    productName: string;
    addedOn: string;
    price: string;
};

export const recentlyAddedData: RecentlyAddedItem[] = [
    {
        id: "recently-added-1",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
    {
        id: "recently-added-2",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
    {
        id: "recently-added-3",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
    {
        id: "recently-added-4",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
    {
        id: "recently-added-5",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
    {
        id: "recently-added-6",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
    {
        id: "recently-added-7",
        productName: "USB-C Hub 7-Port",
        addedOn: "26 Feb 2026",
        price: "$12500",
    },
];

export const recentlyAddedViewAllHref = all_routes.productlist;