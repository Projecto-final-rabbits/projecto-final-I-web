import { describe, test, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Footer } from "@/pages/login-page/components";
import { renderWithProviders } from "@/tests/utils/test-utils";
import "@testing-library/jest-dom";
import { ReactNode } from "react";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  test("renders correctly", () => {
    renderWithProviders(<Footer />);

    // Check for copyright text
    expect(screen.getByText("© 2025 CCP marca registrada")).toBeInTheDocument();

    // Check for links
    expect(screen.getByText("Términos y condiciones")).toBeInTheDocument();
    expect(screen.getByText("Privacidad")).toBeInTheDocument();
  });

  test("links have correct attributes", () => {
    renderWithProviders(<Footer />);

    const termsLink = screen.getByText("Términos y condiciones");
    const privacyLink = screen.getByText("Privacidad");

    // Check link attributes
    expect(termsLink).toHaveAttribute("href", "#");
    expect(privacyLink).toHaveAttribute("href", "#");
  });
});
