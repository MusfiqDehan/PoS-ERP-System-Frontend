/** Warehouse API for tenant-scoped warehouse management. */

import { apiGet, apiPost, apiPatch, apiDelete, extractListItems, type ApiResult } from "./api";

const WAREHOUSES_PATH = "inventory/warehouses/";

export type Warehouse = {
  id: string;
  name: string;
  code: string;
  manager?: string | null;
  manager_name?: string | null;
  contact_person?: string;
  phone: string;
  address: string;
  city: string;
  is_central: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateWarehousePayload = {
  name: string;
  code: string;
  phone?: string;
  address?: string;
  city?: string;
  is_central?: boolean;
};

export type UpdateWarehousePayload = Partial<CreateWarehousePayload> & {
  is_active?: boolean;
};

export async function fetchWarehouses(
  accessToken?: string,
): Promise<ApiResult<Warehouse[]>> {
  const result = await apiGet<Warehouse[] | { items: Warehouse[] }>(
    WAREHOUSES_PATH,
    accessToken,
  );
  if (result.ok && result.body.success && result.body.data !== undefined) {
    return {
      ...result,
      body: {
        ...result.body,
        data: extractListItems<Warehouse>(result.body.data),
      },
    };
  }
  return result as ApiResult<Warehouse[]>;
}

export async function createWarehouse(
  payload: CreateWarehousePayload,
  accessToken?: string,
): Promise<ApiResult<Warehouse>> {
  return apiPost<Warehouse>(WAREHOUSES_PATH, payload, accessToken);
}

export async function updateWarehouse(
  id: string,
  payload: UpdateWarehousePayload,
  accessToken?: string,
): Promise<ApiResult<Warehouse>> {
  return apiPatch<Warehouse>(`${WAREHOUSES_PATH}${id}/`, payload, accessToken);
}

export async function deleteWarehouse(
  id: string,
  accessToken?: string,
): Promise<ApiResult<null>> {
  return apiDelete<null>(`${WAREHOUSES_PATH}${id}/`, accessToken);
}

export function assignWarehouseManager(
  warehouseId: string,
  userId: string,
  accessToken?: string,
): Promise<ApiResult<Warehouse>> {
  return apiPost<Warehouse>(
    `${WAREHOUSES_PATH}${warehouseId}/assign-manager/`,
    { user_id: userId },
    accessToken,
  );
}
