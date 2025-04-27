import {
  CategoryAutocomplete,
  ProviderAutocomplete,
} from "@/components/molecules";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const Filters: React.FC = () => {
  const formMethods = useForm({});
  const [searchParams, setSearchParams] = useSearchParams();
  const providerId = formMethods.watch("providerId");
  const categoryId = formMethods.watch("categoryId");

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    if (providerId !== undefined) {
      setSearchParams({
        ...(categoryId && { categoryId: categoryId }),
        providerId: providerId,
      });
    }

    if (providerId === "" || providerId === null) {
      setSearchParams({
        ...(categoryId && { categoryId: categoryId }),
      });
    }
  }, [providerId]);

  useEffect(() => {
    const providerId = searchParams.get("providerId");
    if (categoryId !== undefined) {
      setSearchParams({
        ...(providerId && { providerId: providerId }),
        categoryId,
      });
    }

    if (categoryId === "" || categoryId === null) {
      setSearchParams({
        ...(providerId && { providerId: providerId }),
      });
    }
  }, [categoryId]);

  return (
    <FormProvider {...formMethods}>
      <form>
        <Stack direction="row" spacing={1} alignItems="center" width={"100%"}>
          <ProviderAutocomplete name="providerId" />
          <CategoryAutocomplete name="categoryId" />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { Filters };
