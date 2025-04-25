/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { ProviderForm } from "@/components/organisms/provider-form";
import { useForm } from "react-hook-form";
import { vi } from "vitest";

// Mock dependencies
vi.mock("react-hook-form", () => ({
  useForm: vi.fn(),
  useFormContext: vi.fn().mockReturnValue({
    register: vi.fn(),
    formState: { errors: {} },
  }),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: vi.fn(),
}));

vi.mock("@/state-managment/slices", () => ({
  useSaveProviderMutation: () => [
    vi.fn().mockReturnValue({ unwrap: () => Promise.resolve() }),
    { isLoading: false },
  ],
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CreateProviderForm Component", () => {
  beforeEach(() => {
    (useForm as any).mockReturnValue({
      handleSubmit: (cb: any) => (data: any) => cb(data),
      register: vi.fn(),
      formState: { errors: {} },
      reset: vi.fn(),
    });
  });

  it("renders provider form fields correctly", () => {
    render(<ProviderForm onClose={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByText("Agregar Proveedor")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = vi.fn();
    render(<ProviderForm onClose={vi.fn()} onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });
});
