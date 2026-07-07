"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import { fetchBranches, type Branch } from "@/lib/branches";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import {
  fetchCategories,
  fetchSubCategories,
  fetchBrands,
  fetchUnits,
  fetchWarranties,
  fetchVariantAttributes,
  type Category,
  type Brand,
  type Unit,
  type Warranty,
  type VariantAttribute,
} from "@/lib/inventory";
import type { SelectOption } from "@/core/common/form/types";

function toSelectOptions(items: { id: string; name: string }[]): SelectOption[] {
  return [
    { value: "", label: "Choose" },
    ...items.map((item) => ({ value: item.id, label: item.name })),
  ];
}

export function useProductFormOptions() {
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [variantAttributes, setVariantAttributes] = useState<VariantAttribute[]>([]);

  const reloadCategories = useCallback(async () => {
    const token = getAccessToken();
    const [catRes, subRes] = await Promise.all([
      fetchCategories(token),
      fetchSubCategories(token),
    ]);
    if (catRes.ok && catRes.body.data) {
      setCategories(extractListItems<Category>(catRes.body.data));
    }
    if (subRes.ok && subRes.body.data) {
      setSubCategories(extractListItems<Category>(subRes.body.data));
    }
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    Promise.all([
      fetchBranches(token),
      fetchWarehouses(token),
      fetchCategories(token),
      fetchSubCategories(token),
      fetchBrands(token),
      fetchUnits(token),
      fetchWarranties(token),
      fetchVariantAttributes(token),
    ]).then(([b, w, c, sc, br, u, wa, va]) => {
      if (b.ok && b.body.data) setBranches(extractListItems<Branch>(b.body.data));
      if (w.ok && w.body.data) setWarehouses(extractListItems<Warehouse>(w.body.data));
      if (c.ok && c.body.data) setCategories(extractListItems<Category>(c.body.data));
      if (sc.ok && sc.body.data) setSubCategories(extractListItems<Category>(sc.body.data));
      if (br.ok && br.body.data) setBrands(extractListItems<Brand>(br.body.data));
      if (u.ok && u.body.data) setUnits(extractListItems<Unit>(u.body.data));
      if (wa.ok && wa.body.data) setWarranties(extractListItems<Warranty>(wa.body.data));
      if (va.ok && va.body.data) {
        setVariantAttributes(extractListItems<VariantAttribute>(va.body.data));
      }
      setLoadingOptions(false);
    });
  }, []);

  const topLevelCategories = useMemo(
    () => categories.filter((c) => !c.parent),
    [categories],
  );

  const branchOptions = useMemo(() => toSelectOptions(branches), [branches]);
  const warehouseOptions = useMemo(() => toSelectOptions(warehouses), [warehouses]);
  const categoryOptions = useMemo(() => toSelectOptions(topLevelCategories), [topLevelCategories]);
  const brandOptions = useMemo(() => toSelectOptions(brands), [brands]);
  const unitOptions = useMemo(
    () => [
      { value: "", label: "Choose" },
      ...units.map((u) => ({ value: u.id, label: `${u.name} (${u.short_name})` })),
    ],
    [units],
  );
  const warrantyOptions = useMemo(() => toSelectOptions(warranties), [warranties]);

  const subCategoryOptionsFor = useCallback(
    (parentCategoryId: string): SelectOption[] => {
      if (!parentCategoryId) return [{ value: "", label: "Choose" }];
      const items = subCategories.filter((c) => c.parent === parentCategoryId);
      return toSelectOptions(items);
    },
    [subCategories],
  );

  return {
    loadingOptions,
    branches,
    warehouses,
    categories,
    subCategories,
    brands,
    units,
    warranties,
    variantAttributes,
    branchOptions,
    warehouseOptions,
    categoryOptions,
    brandOptions,
    unitOptions,
    warrantyOptions,
    subCategoryOptionsFor,
    reloadCategories,
  };
}
