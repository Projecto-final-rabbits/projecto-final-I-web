import { render, screen, waitFor } from "@testing-library/react";
import { ProductAutocomplete } from "@/components/molecules";
import { useGetProductsQuery } from "@/state-managment/slices";
import { vi } from "vitest";
import "@testing-library/jest-dom";

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

describe("ProductAutocomplete Component", () => {
  it("renders loading state", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<ProductAutocomplete name="productId" />);
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

    render(<ProductAutocomplete name="productId" />);

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

    render(<ProductAutocomplete name="productId" disabled={true} />);

    await waitFor(() => {
      const input = screen.getByLabelText("Producto");
      expect(input).toHaveAttribute("disabled");
    });
  });
});
