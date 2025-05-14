import { render, screen, waitFor } from "@testing-library/react";
import { ProductAutocomplete } from "@/components/molecules";
import { useGetProductsQuery } from "@/state-managment/slices";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { I18nTestProvider } from "@/tests/utils/i18n-test-utils";

// Mock dependencies
vi.mock("@/state-managment/slices", () => ({
  useGetProductsQuery: vi.fn(),
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

describe("ProductAutocomplete Component", () => {
  it("renders loading state", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    renderWithI18n(<ProductAutocomplete name="productId" />);
  });

  it("renders autocomplete with products", async () => {
    const mockProducts = [
      { id: 1, nombre: "Product 1" },
      { id: 2, nombre: "Product 2" },
    ];

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProducts,
    });

    renderWithI18n(<ProductAutocomplete name="productId" />);

    await waitFor(() => {
      expect(screen.getByLabelText("Producto")).toBeInTheDocument();
    });
  });

  it("passes disabled prop correctly", async () => {
    const mockProducts = [
      { id: 1, nombre: "Product 1" },
      { id: 2, nombre: "Product 2" },
    ];

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProducts,
    });

    renderWithI18n(<ProductAutocomplete name="productId" disabled={true} />);

    await waitFor(() => {
      const input = screen.getByLabelText("Producto");
      expect(input).toHaveAttribute("disabled");
    });
  });
});
