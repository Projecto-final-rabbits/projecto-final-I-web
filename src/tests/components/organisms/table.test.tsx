import { render, screen } from "@testing-library/react";
import { CustomTable } from "@/components/organisms/table";
import { GridColDef } from "@mui/x-data-grid";
import "@testing-library/jest-dom";

// Mock data for testing
const mockColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 150 },
];

const mockRows = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Doe", age: 25 },
];

describe("CustomTable Component", () => {
  it("renders with the correct title and subtitle", () => {
    render(
      <CustomTable
        rows={mockRows}
        columns={mockColumns}
        title="Test Table"
        subtitle="Test Subtitle"
      />
    );

    expect(screen.getByText("Test Table")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders with the provided columns and rows", () => {
    render(<CustomTable rows={mockRows} columns={mockColumns} />);

    // Check if column headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();

    // Check if data rows are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("renders with actions", () => {
    const TestAction = () => <button>Test Action</button>;

    render(
      <CustomTable
        rows={mockRows}
        columns={mockColumns}
        actions={<TestAction />}
      />
    );

    expect(screen.getByText("Test Action")).toBeInTheDocument();
  });
});
