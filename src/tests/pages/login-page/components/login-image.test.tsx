import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { LoginImage } from "@/pages/login-page/components";
import { renderWithProviders } from "@/tests/utils/test-utils";
import "@testing-library/jest-dom";

describe("LoginImage", () => {
  test("renders correctly", () => {
    renderWithProviders(<LoginImage />);

    // Check if the image is rendered with correct alt text
    const image = screen.getByAltText("Distribuidora de productos");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/login-image.png");
  });

  test("renders with proper styling", () => {
    renderWithProviders(<LoginImage />);

    const image = screen.getByAltText("Distribuidora de productos");
    // Check styled component properties
    expect(image).toHaveStyle({
      "object-fit": "cover",
    });
  });
});
