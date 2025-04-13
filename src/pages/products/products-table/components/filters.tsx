import { ProviderAutocomplete } from "@/components/molecules";
import { CountryAutocomplete } from "@/components/molecules/country-autocomplete";
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
        <Stack direction="row" spacing={1} alignItems="center" width={"100%"}>
          <ProviderAutocomplete name="providerId" />
          <CountryAutocomplete name="country" />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { Filters };
