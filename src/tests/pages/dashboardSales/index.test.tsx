import { render, screen } from "@testing-library/react";
import { DashboardPage } from "@/pages/dashboardSales";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock the DashboardSales component
vi.mock("@/pages/dashboardSales/dashboard-sales", () => ({
  DashboardSales: vi.fn(() => (
    <div data-testid="mocked-dashboard-sales">Mocked Dashboard Sales</div>
  )),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<DashboardPage />);

    // Check if the mocked DashboardSales component is rendered
    expect(screen.getByTestId("mocked-dashboard-sales")).toBeInTheDocument();
    expect(screen.getByText("Mocked Dashboard Sales")).toBeInTheDocument();
  });

  test("DashboardPage renders without crashing", () => {
    expect(() => render(<DashboardPage />)).not.toThrow();
  });
});
