import { render, screen, waitFor } from "@testing-library/react";
import { ProviderAutocomplete } from "@/components/molecules";
import { useGetProvidersQuery } from "@/state-managment/slices";
import { vi } from "vitest";
import "@testing-library/jest-dom";

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

describe("ProviderAutocomplete Component", () => {
  it("renders loading state", () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<ProviderAutocomplete name="providerId" />);
  });

  it("renders error state", async () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Failed to load providers"),
      data: null,
    });

    render(<ProviderAutocomplete name="providerId" />);

    await waitFor(() => {
      const target = screen.getByText("Error loading providers");
      expect(target.textContent).toBe("Error loading providers");
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

    render(<ProviderAutocomplete name="providerId" />);

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

    render(<ProviderAutocomplete name="providerId" disabled={true} />);

    await waitFor(() => {
      const input = screen.getByLabelText("Fabricante");
      expect(input).toHaveAttribute("disabled");
    });
  });
});
