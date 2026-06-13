export type ManageStockRecord = {
  id: string;
  Warehouse: string;
  Shop: string;
  Product: {
    Name: string;
    Image: string;
  };
  Date: string;
  Person: {
    Name: string;
    Image: string;
  };
  Quantity: number;
  createdby?: string;
};
