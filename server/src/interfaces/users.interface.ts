export interface User {
  id?: number;
  name: string;
  username: string;
  imgUrl: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  status: "active" | "disabled" | "deleted";
}
