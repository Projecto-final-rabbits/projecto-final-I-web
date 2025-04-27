import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/organisms";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  it("renders correctly", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Sistema de Inventario`)
    ).toBeInTheDocument();
  });
});
