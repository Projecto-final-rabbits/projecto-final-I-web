import { render, screen } from "@testing-library/react";
import { CountryAutocomplete } from "../../../components/molecules/country-autocomplete";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { I18nTestProvider } from "@/tests/utils/i18n-test-utils";

// Mock dependencies
vi.mock("@/utils/countries", () => ({
  COUNTRIES: [{ es_name: "España" }, { es_name: "Francia" }],
}));

vi.mock("react-hook-form", () => ({
  useFormContext: () => ({
    control: {},
    formState: { errors: {} },
  }),
  Controller: ({
    render,
  }: {
    render: (props: { field: { onChange: () => void; value: string } }) => void;
  }) => render({ field: { onChange: vi.fn(), value: "" } }),
}));

const renderWithI18n = (component: React.ReactElement) => {
  return render(component, { wrapper: I18nTestProvider });
};

describe("CountryAutocomplete Component", () => {
  it("renders autocomplete with countries", () => {
    renderWithI18n(<CountryAutocomplete name="country" />);
    expect(screen.getByLabelText("Pais")).toBeInTheDocument();
  });

  it("passes disabled prop correctly", () => {
    renderWithI18n(<CountryAutocomplete name="country" disabled={true} />);
    // Check if the input is disabled
    const input = screen.getByLabelText("Pais");
    expect(input).toHaveAttribute("disabled");
  });
});
