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
        rows={data.map((product) => ({
          id: product.id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          precioCompra: product.precioCompra,
          categoria: product.categoria,
          proveedorId: product.proveedorId,
          tiempoEntregaDias: product.tiempoEntregaDias,
        }))}
        columns={columns}
      />
    );
  }

  return <Skeleton variant="rectangular" width="100%" height={400} />;
};

export { ProductsTable };
