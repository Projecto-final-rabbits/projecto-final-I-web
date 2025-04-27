/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateProductForm } from "@/components/organisms/create-product-form";
import { useForm } from "react-hook-form";
import { vi } from "vitest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Mock dependencies
vi.mock("react-hook-form", () => ({
  useForm: vi.fn(),
  useFormContext: vi.fn().mockReturnValue({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    formState: { errors: {}, isValid: true },
  }),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Controller: ({ render }: any) =>
    render({ field: { onChange: vi.fn(), value: "" } }),
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: vi.fn(),
}));

vi.mock("@/state-managment/slices", () => ({
  useSaveProductMutation: () => [
    vi.fn().mockReturnValue({ unwrap: () => Promise.resolve() }),
    { isLoading: false },
  ],
}));

vi.mock("@/components/molecules", () => ({
  ProviderAutocomplete: () => (
    <div data-testid="provider-autocomplete">Provider Autocomplete</div>
  ),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CreateProductForm Component", () => {
  beforeEach(() => {
    (useForm as any).mockReturnValue({
      handleSubmit: (cb: any) => (data: any) => cb(data),
      register: vi.fn(),
      formState: { errors: {}, isValid: true },
      reset: vi.fn(),
    });
  });

  it("renders product form fields correctly", async () => {
    const onClose = vi.fn();

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CreateProductForm onClose={onClose} />
      </LocalizationProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("nombre-del-producto")).toBeInTheDocument();
      expect(screen.getByTestId("fecha-de-expiracion")).toBeInTheDocument();
      expect(screen.getByTestId("precio-de-compra")).toBeInTheDocument();
      expect(screen.getByTestId("precio-de-venta")).toBeInTheDocument();
      expect(screen.getByTestId("categoria")).toBeInTheDocument();
      expect(screen.getByTestId("tiempo-de-entrega")).toBeInTheDocument();

      expect(screen.getByText("Agregar producto")).toBeInTheDocument();
      expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = vi.fn();
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CreateProductForm onClose={onClose} />
      </LocalizationProvider>
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });
});
