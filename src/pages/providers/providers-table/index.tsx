import { columns } from "./columns";
import { CustomTable } from "@/components/organisms";
import { Actions } from "./components";
import { useGetProvidersQuery } from "@/state-managment/slices";
import { Skeleton } from "@mui/material";

const ProvidersTable = () => {
  const { data, isSuccess } = useGetProvidersQuery();

  if (isSuccess) {
    return (
      <CustomTable
        actions={<Actions />}
        title="Tus proveedores"
        rows={data.map((product) => ({
          id: product.id,
          nombre: product.nombre,
          telefono: product.telefono,
          email: product.email,
          direccion: product.direccion,
          pais: product.pais,
        }))}
        columns={columns}
      />
    );
  }

  return <Skeleton variant="rectangular" width="100%" height={400} />;
};

export { ProvidersTable };
