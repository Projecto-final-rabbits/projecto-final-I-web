import { render, screen } from "@testing-library/react";
import { CategoryAutocomplete } from "@/components/molecules";
import { vi } from "vitest";
import "@testing-library/jest-dom";

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

describe("CategoryAutocomplete Component", () => {
  it("renders autocomplete with categories", () => {
    render(<CategoryAutocomplete name="categoryId" />);
    expect(screen.getByLabelText("Categoría")).toBeInTheDocument();
  });

  it("passes disabled prop correctly", () => {
    render(<CategoryAutocomplete name="categoryId" disabled={true} />);
    // Check if the input is disabled
    const input = screen.getByLabelText("Categoría");
    expect(input).toHaveAttribute("disabled");
  });
});
