export interface Transaction {
  id?: number;
  costumerName: string;
  paymentMethod: string;
  status: "active" | "disabled" | "deleted";
  createdAt?: Date;
}
