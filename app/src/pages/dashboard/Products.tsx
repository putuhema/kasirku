import { columns } from "./users/columns";
import { DataTable } from "./users/data-table";

const Products = () => {
  return (
    <div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Products;
