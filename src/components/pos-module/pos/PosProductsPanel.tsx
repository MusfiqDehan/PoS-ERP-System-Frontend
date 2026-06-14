"use client";



import { useState } from "react";

import PosCategoryTabs from "./PosCategoryTabs";

import PosProductTabs from "./PosProductTabs";

import PosProductsToolbar from "./PosProductsToolbar";

import type { PosProduct } from "./posProductsData";



type PosProductsPanelProps = {

  activeTab: string;

  onTabChange: (tabId: string) => void;

  onProductSelect: (product: PosProduct) => void;

  cartProductIds: Set<string>;

};



export default function PosProductsPanel({

  activeTab,

  onTabChange,

  onProductSelect,

  cartProductIds,

}: PosProductsPanelProps) {

  const [searchQuery, setSearchQuery] = useState("");



  return (

    <div className="pos-products-panel__col">

      <section className="pos-products-panel">

        <h2 className="pos-products-panel__title">All Products</h2>



        <PosProductsToolbar

          searchQuery={searchQuery}

          onSearchChange={setSearchQuery}

        />



      </section>

    </div>

  );

}

