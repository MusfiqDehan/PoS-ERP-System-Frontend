export type OnlineOrderRecord = {
  id: string | number;
  customer: string;
  image: string;
  reference: string;
  date: string;
  status: string;
  total: string;
  paid: string;
  due: string;
  paymentstatus: string;
  biller: string;
  createdby?: string;
};
