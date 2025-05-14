import { useProviderColumns } from "./columns.tsx";
import { CustomTable } from "@/components/organisms";
import { Actions } from "./components";
import { useGetProvidersQuery } from "@/state-managment/slices";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

const ProvidersTable = () => {
  const { t } = useTranslation();
  const columns = useProviderColumns();
  const { data, isSuccess } = useGetProvidersQuery();

  if (isSuccess) {
    return (
      <CustomTable
        actions={<Actions />}
        title={t("providers.yourProviders")}
        rows={data.map((provider) => ({
          id: provider.id,
          nombre: provider.nombre,
          telefono: provider.telefono,
          email: provider.email,
          direccion: provider.direccion,
          pais: provider.pais,
          contacto: provider.contacto,
        }))}
        columns={columns}
      />
    );
  }

  return <Skeleton variant="rectangular" width="100%" height={400} />;
};

export { ProvidersTable };
