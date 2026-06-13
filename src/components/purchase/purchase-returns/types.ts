export type PurchaseReturnRecord = {
  id: string;
  img: string;
  date: string;
  supplier: string;
  reference: string;
  status: string;
  grandTotal: string;
  paid: string;
  due: string;
  paymentStatus: string;
  createdBy?: string;
};
