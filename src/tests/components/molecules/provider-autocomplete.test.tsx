import { render, screen, waitFor } from "@testing-library/react";
import { ProviderAutocomplete } from "@/components/molecules";
import { useGetProvidersQuery } from "@/state-managment/slices";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { I18nTestProvider } from "@/tests/utils/i18n-test-utils";

// Mock dependencies
vi.mock("@/state-managment/slices", () => ({
  useGetProvidersQuery: vi.fn(),
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

describe("ProviderAutocomplete Component", () => {
  it("renders loading state", () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    renderWithI18n(<ProviderAutocomplete name="providerId" />);
  });

  it("renders error state", async () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Failed to load providers"),
      data: null,
    });

    renderWithI18n(<ProviderAutocomplete name="providerId" />);

    await waitFor(() => {
      const target = screen.getByText("Error al cargar proveedores");
      expect(target.textContent).toBe("Error al cargar proveedores");
    });
  });

  it("renders autocomplete with providers", async () => {
    const mockProviders = [
      { id: 1, nombre: "Provider 1" },
      { id: 2, nombre: "Provider 2" },
    ];

    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProviders,
    });

    renderWithI18n(<ProviderAutocomplete name="providerId" />);

    await waitFor(() => {
      expect(screen.getByLabelText("Fabricante")).toBeInTheDocument();
    });
  });

  it("passes disabled prop correctly", async () => {
    const mockProviders = [
      { id: 1, nombre: "Provider 1" },
      { id: 2, nombre: "Provider 2" },
    ];

    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProviders,
    });

    renderWithI18n(<ProviderAutocomplete name="providerId" disabled={true} />);

    await waitFor(() => {
      const input = screen.getByLabelText("Fabricante");
      expect(input).toHaveAttribute("disabled");
    });
  });
});
