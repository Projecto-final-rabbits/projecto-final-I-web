import { describe, test, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { LoginPage } from "@/pages/login-page";
import { renderWithProviders } from "@/tests/utils/test-utils";
import "@testing-library/jest-dom";

// Mock the components to simplify testing
vi.mock("@/pages/login-page/components", () => ({
  LoginForm: vi.fn(() => <div data-testid="login-form">Mocked Login Form</div>),
  LoginImage: vi.fn(() => (
    <div data-testid="login-image">Mocked Login Image</div>
  )),
  Footer: vi.fn(() => <div data-testid="login-footer">Mocked Footer</div>),
}));

describe("LoginPage", () => {
  test("renders correctly", () => {
    renderWithProviders(<LoginPage />);

    // Check for the main title and subtitle using translation keys
    expect(screen.getByText("Inicio de sesión")).toBeInTheDocument();
    expect(
      screen.getByText("Bienvenido, inicia sesión para ver tus productos")
    ).toBeInTheDocument();

    // Check for Google sign-in button
    expect(screen.getByText("Iniciar sesión con Google")).toBeInTheDocument();

    // Check if the mocked components are rendered
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("login-image")).toBeInTheDocument();
    expect(screen.getByTestId("login-footer")).toBeInTheDocument();
  });

  test("LoginPage renders without crashing", () => {
    expect(() => renderWithProviders(<LoginPage />)).not.toThrow();
  });
});
