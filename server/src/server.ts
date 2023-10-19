import { App } from "@/app";
import { AuthRoute } from "@/routes/auth.route";
import { UserRoute } from "@/routes/users.route";
import { ValidateEnv } from "@/utils/validateEnv";
import { ProductRoute } from "./routes/products.route";
import { CategoryRoute } from "./routes/category.route";
import { TrasactionRoute } from "./routes/transaction.route";

ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new ProductRoute(),
  new CategoryRoute(),
  new TrasactionRoute(),
]);

app.listen();
