import { render, screen } from "@testing-library/react";
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

  it("renders error state", () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Failed to load providers"),
      data: null,
    });

    render(<ProviderAutocomplete name="providerId" />);
    const target = screen.getByText("Error loading providers");
    expect(target.textContent).toBe("Error loading providers");
  });

  it("renders autocomplete with providers", () => {
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

    expect(screen.getByLabelText("Select Provider")).toBeInTheDocument();
  });

  it("passes disabled prop correctly", () => {
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

    // Check if the input is disabled
    const input = screen.getByLabelText("Select Provider");
    expect(input).toHaveAttribute("disabled");
  });
});
