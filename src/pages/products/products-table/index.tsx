import { columns } from "./columns";
import { CustomTable } from "@/components/organisms";
import { Actions } from "./components";
import { useGetProductsQuery } from "@/state-managment/slices";
import { Skeleton } from "@mui/material";

const ProductsTable = () => {
  const { data, isSuccess } = useGetProductsQuery();

  if (isSuccess) {
    return (
      <CustomTable
        actions={<Actions />}
        title="Tus productos"
        rows={data}
        columns={columns}
      />
    );
  }

  return <Skeleton variant="rectangular" width="100%" height={400} />;
};

export { ProductsTable };
