import { screen, waitFor } from "@testing-library/react";
import { WarehouseAutocomplete } from "@/components/molecules";
import { warehousesApi } from "@/state-managment/slices/warehouse-slice";
import { renderWithProviders } from "../../utils/test-utils";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock dependencies
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
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders loading state", async () => {
    // Override the query response in the mock store
    const mockUseGetWarehousesQuery = vi.fn().mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    // Sobrescribir temporalmente el hook del api
    vi.spyOn(warehousesApi, "useGetWarehousesQuery").mockImplementation(
      mockUseGetWarehousesQuery
    );

    renderWithProviders(<WarehouseAutocomplete name="warehouseId" />);
  });

  it("renders autocomplete with warehouses", async () => {
    const mockWarehouses = [
      { id: 1, nombre: "Warehouse 1" },
      { id: 2, nombre: "Warehouse 2" },
    ];

    // Override the query response in the mock store
    const mockUseGetWarehousesQuery = vi.fn().mockReturnValue({
      isLoading: false,
      error: null,
      data: mockWarehouses,
    });

    // Sobrescribir temporalmente el hook del api
    vi.spyOn(warehousesApi, "useGetWarehousesQuery").mockImplementation(
      mockUseGetWarehousesQuery
    );

    renderWithProviders(<WarehouseAutocomplete name="warehouseId" />);
    await waitFor(() => {
      expect(screen.getByLabelText("Bodega")).toBeInTheDocument();
    });
  });

  it("passes disabled prop correctly", async () => {
    const mockWarehouses = [
      { id: 1, nombre: "Warehouse 1" },
      { id: 2, nombre: "Warehouse 2" },
    ];

    // Override the query response in the mock store
    const mockUseGetWarehousesQuery = vi.fn().mockReturnValue({
      isLoading: false,
      error: null,
      data: mockWarehouses,
    });

    // Sobrescribir temporalmente el hook del api
    vi.spyOn(warehousesApi, "useGetWarehousesQuery").mockImplementation(
      mockUseGetWarehousesQuery
    );

    renderWithProviders(
      <WarehouseAutocomplete name="warehouseId" disabled={true} />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Bodega")).toHaveAttribute("disabled");
    });
  });
});
