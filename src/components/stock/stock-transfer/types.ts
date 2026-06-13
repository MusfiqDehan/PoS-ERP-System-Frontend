export type StockTransferRecord = {
  id: string;
  select: boolean;
  fromWarehouse: string;
  toWarehouse: string;
  noOfProducts: number;
  quantityTransferred: number;
  refNumber: string;
  date: string;
  createdby?: string;
};
