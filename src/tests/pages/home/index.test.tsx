import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { HomePage } from "@/pages/home";
import { renderWithProviders } from "@/tests/utils/test-utils";
import { ProductsPage } from "@/pages/products";
import "@testing-library/jest-dom";

// Mock the ProductsPage component to simplify testing and avoid testing its internals
vi.mock("@/pages/products", () => ({
  ProductsPage: vi.fn(() => (
    <div data-testid="mocked-products-page">Mocked Products Page</div>
  )),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly", () => {
    // Render the component with the mockStore
    renderWithProviders(<HomePage />);

    // Check if the mocked ProductsPage component is rendered
    expect(screen.getByTestId("mocked-products-page")).toBeInTheDocument();
    expect(screen.getByText("Mocked Products Page")).toBeInTheDocument();
  });

  test("ProductsPage component is called", () => {
    // Render the component
    renderWithProviders(<HomePage />);

    // Verify that ProductsPage was called
    expect(ProductsPage).toHaveBeenCalled();
  });

  test("HomePage renders without crashing", () => {
    // This test checks that the HomePage renders without throwing any errors
    expect(() => renderWithProviders(<HomePage />)).not.toThrow();
  });
});
