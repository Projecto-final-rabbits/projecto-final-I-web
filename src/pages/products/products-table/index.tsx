import { useProductColumns } from "./columns.tsx";
import { CustomTable } from "@/components/organisms";
import { Actions } from "./components";
import { useGetProductsQuery } from "@/state-managment/slices";
import { Skeleton, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductsTable = () => {
  const { t } = useTranslation();
  const columns = useProductColumns();
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
          title={t("products.yourProducts")}
          rows={data}
          columns={columns}
        />
      </Stack>
    );
  }

  return <Skeleton variant="rectangular" width="100%" height={400} />;
};

export { ProductsTable };
