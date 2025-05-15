import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DashboardSales } from "@/pages/dashboardSales/dashboard-sales";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "@/state-managment/hooks";
import { fetchSalesSummary } from "@/state-managment/slices/dashboard-slice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Mock the hooks and dependencies
vi.mock("@/state-managment/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/state-managment/slices/dashboard-slice", () => ({
  fetchSalesSummary: vi.fn(),
}));

// Mock recharts to avoid rendering issues in tests
vi.mock("recharts", () => ({
  ResponsiveContainer: vi.fn(({ children }) => <div>{children}</div>),
  PieChart: vi.fn(({ children }) => <div>{children}</div>),
  Pie: vi.fn(),
  Cell: vi.fn(),
  Legend: vi.fn(),
  Tooltip: vi.fn(),
  BarChart: vi.fn(({ children }) => <div>{children}</div>),
  Bar: vi.fn(),
  XAxis: vi.fn(),
  YAxis: vi.fn(),
  CartesianGrid: vi.fn(),
}));

// Custom render function with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
  );
};

describe("DashboardSales Component", () => {
  const mockDispatch = vi.fn();
  const defaultMockData = {
    pedidos_por_estado: { "En proceso": 5, Completado: 10 },
    ventas_por_ciudad: { "Ciudad A": 1000, "Ciudad B": 2000 },
    total_pedidos: 15,
    ingresos_totales: 3000,
    ticket_promedio: 200,
    clientes_activos: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("renders loading state", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
      error: null,
    });

    renderWithProviders(<DashboardSales />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", () => {
    const errorMessage = "Error loading dashboard";
    (useAppSelector as jest.Mock).mockReturnValue({
      data: null,
      status: "failed",
      error: errorMessage,
    });

    renderWithProviders(<DashboardSales />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders dashboard with data", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      data: defaultMockData,
      status: "succeeded",
      error: null,
    });

    renderWithProviders(<DashboardSales />);

    // Check if title and description are rendered
    expect(screen.getByText("dashboard.title")).toBeInTheDocument();
    expect(screen.getByText("dashboard.description")).toBeInTheDocument();

    // Check if KPI cards are rendered
    expect(screen.getByText("15")).toBeInTheDocument(); // total_pedidos
    expect(screen.getByText("$3,000")).toBeInTheDocument(); // ingresos_totales
    expect(screen.getByText("$200.00")).toBeInTheDocument(); // ticket_promedio
    expect(screen.getByText("100")).toBeInTheDocument(); // clientes_activos
  });

  it("fetches data on mount", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      data: defaultMockData,
      status: "succeeded",
      error: null,
    });

    renderWithProviders(<DashboardSales />);

    expect(mockDispatch).toHaveBeenCalledWith(
      fetchSalesSummary({
        startDate: expect.any(String),
        endDate: expect.any(String),
      })
    );
  });

  it("updates data when date range changes", async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      data: defaultMockData,
      status: "succeeded",
      error: null,
    });

    renderWithProviders(<DashboardSales />);

    // Find and click the update button
    const updateButton = screen.getByText("dashboard.date.update");
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchSalesSummary({
          startDate: expect.any(String),
          endDate: expect.any(String),
        })
      );
    });
  });

  it("shows loading state in update button while fetching", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      data: defaultMockData,
      status: "loading",
      error: null,
    });

    renderWithProviders(<DashboardSales />);

    const updateButton = screen.getByText("dashboard.date.loading");
    expect(updateButton).toBeDisabled();
  });
});
