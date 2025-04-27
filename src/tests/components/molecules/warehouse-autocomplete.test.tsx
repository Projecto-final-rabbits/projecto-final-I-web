import { render, screen } from "@testing-library/react";
import { WarehouseAutocomplete } from "@/components/molecules";
import { useGetWarehousesQuery } from "@/state-managment/slices";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("@/state-managment/slices", () => ({
  useGetWarehousesQuery: vi.fn(),
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

describe("WarehouseAutocomplete Component", () => {
  it("renders loading state", () => {
    (useGetWarehousesQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<WarehouseAutocomplete name="warehouseId" />);
  });

  it("renders error state", () => {
    (useGetWarehousesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Failed to load warehouses"),
      data: null,
    });

    render(<WarehouseAutocomplete name="warehouseId" />);
    const target = screen.getByText("Error loading warehouses");
    expect(target.textContent).toBe("Error loading warehouses");
  });

  it("renders autocomplete with warehouses", () => {
    const mockWarehouses = [
      { id: 1, nombre: "Warehouse 1" },
      { id: 2, nombre: "Warehouse 2" },
    ];

    (useGetWarehousesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockWarehouses,
    });

    render(<WarehouseAutocomplete name="warehouseId" />);

    expect(screen.getByLabelText("Select Warehouse")).toBeInTheDocument();
  });

  it("passes disabled prop correctly", () => {
    const mockWarehouses = [
      { id: 1, nombre: "Warehouse 1" },
      { id: 2, nombre: "Warehouse 2" },
    ];

    (useGetWarehousesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockWarehouses,
    });

    render(<WarehouseAutocomplete name="warehouseId" disabled={true} />);

    // Check if the input is disabled
    const input = screen.getByLabelText("Select Warehouse");
    expect(input).toHaveAttribute("disabled");
  });
});
