import { render, screen } from "@testing-library/react";
import { CategoryAutocomplete } from "@/components/molecules";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { I18nTestProvider } from "@/tests/utils/i18n-test-utils";

// Mock dependencies
vi.mock("@/utils/categories", () => ({
  CATEGORIES: [{ name: "Category 1" }, { name: "Category 2" }],
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

describe("CategoryAutocomplete Component", () => {
  it("renders autocomplete with categories", () => {
    renderWithI18n(<CategoryAutocomplete name="categoryId" />);
    expect(screen.getByLabelText("Categoría")).toBeInTheDocument();
  });

  it("passes disabled prop correctly", () => {
    renderWithI18n(<CategoryAutocomplete name="categoryId" disabled={true} />);
    // Check if the input is disabled
    const input = screen.getByLabelText("Categoría");
    expect(input).toHaveAttribute("disabled");
  });
});
