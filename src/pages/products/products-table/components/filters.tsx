import { ProviderAutocomplete } from "@/components/molecules";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const Filters: React.FC = () => {
  const formMethods = useForm({});
  const [, setSearchParams] = useSearchParams();
  const providerId = formMethods.watch("providerId");

  useEffect(() => {
    if (providerId !== undefined) {
      setSearchParams({
        providerId: providerId,
      });
    }

    if (providerId === "" || providerId === null) {
      setSearchParams({});
    }
  }, [providerId]);

  return (
    <FormProvider {...formMethods}>
      <form>
        <Stack>
          <ProviderAutocomplete name="providerId" />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { Filters };
