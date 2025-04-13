import { ProviderAutocomplete } from "@/components/molecules";
import { CountryAutocomplete } from "@/components/molecules/country-autocomplete";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const Filters: React.FC = () => {
  const formMethods = useForm({});
  const [searchParams, setSearchParams] = useSearchParams();
  const providerId = formMethods.watch("providerId");
  const countryId = formMethods.watch("countryId");

  useEffect(() => {
    const countryId = searchParams.get("countryId");
    if (providerId !== undefined) {
      setSearchParams({
        ...(countryId && { countryId: countryId }),
        providerId: providerId,
      });
    }

    if (providerId === "" || providerId === null) {
      setSearchParams({
        ...(countryId && { countryId: countryId }),
      });
    }
  }, [providerId]);

  useEffect(() => {
    const providerId = searchParams.get("providerId");
    if (countryId !== undefined) {
      setSearchParams({
        ...(providerId && { providerId: providerId }),
        countryId: countryId,
      });
    }

    if (countryId === "" || countryId === null) {
      setSearchParams({
        ...(providerId && { providerId: providerId }),
      });
    }
  }, [countryId]);

  return (
    <FormProvider {...formMethods}>
      <form>
        <Stack direction="row" spacing={1} alignItems="center" width={"100%"}>
          <ProviderAutocomplete name="providerId" />
          <CountryAutocomplete name="countryId" />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { Filters };
