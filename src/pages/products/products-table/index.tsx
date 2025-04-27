import { columns } from "./columns";
import { CustomTable } from "@/components/organisms";
import { Actions } from "./components";
import { useGetProductsQuery } from "@/state-managment/slices";
import { Skeleton, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ProductsTable = () => {
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get("providerId");
  const categoryId = searchParams.get("categoryId");
  const { data, isSuccess } = useGetProductsQuery({
    providerId,
    categoryId,
  });

  if (isSuccess) {
    return (
      <Stack direction="column" spacing={1}>
        <CustomTable
          actions={<Actions />}
          title="Tus productos"
          rows={data}
          columns={columns}
        />
      </Stack>
    );
  }

  return <Skeleton variant="rectangular" width="100%" height={400} />;
};

export { ProductsTable };
