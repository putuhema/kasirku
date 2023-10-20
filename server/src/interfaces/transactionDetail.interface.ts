export interface TransactionDetail {
  id?: number;
  quantity: number;
  price: number;
  transactionId?: number;
  productId?: number;
  status: "active" | "disabled" | "deleted";
}
