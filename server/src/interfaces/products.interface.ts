export interface Products {
  id?: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imgUrl: string;
  status: "active" | "disabled" | "deleted";
  categoryId?: number;
}
