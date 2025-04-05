import { columns, rows } from "./columns";
import { CustomTable } from "@/components/organisms";
import { Actions } from "./components";

const ProductsTable = () => {
  return (
    <CustomTable
      actions={<Actions />}
      title="Tus productos"
      rows={rows}
      columns={columns}
    />
  );
};

export { ProductsTable };
