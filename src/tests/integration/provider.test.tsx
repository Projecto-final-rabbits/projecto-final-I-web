import { screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../utils/test-utils";
import { ProvidersPage } from "@/pages/providers";
import { vi } from "vitest";
import { toast } from "react-toastify";

// Mock API calls
vi.mock("@/state-managment/slices", () => ({
  productsApi: {
    reducerPath: "productsApi",
    reducer: () => ({}),
    middleware: () => () => () => {},
    endpoints: {},
  },
  providersApi: {
    reducerPath: "providersApi",
    reducer: () => ({}),
    middleware: () => () => () => {},
    endpoints: {},
  },
  warehousesApi: {
    reducerPath: "warehousesApi",
    reducer: () => ({}),
    middleware: () => () => () => {},
    endpoints: {},
  },
  inventoriesApi: {
    reducerPath: "inventoriesApi",
    reducer: () => ({}),
    middleware: () => () => () => {},
    endpoints: {},
  },
  useSaveProviderMutation: () => [
    vi.fn().mockImplementation((data) => {
      return Promise.resolve({
        id: "mock-provider-id",
        ...data,
      });
    }),
    { isLoading: false },
  ],
  useGetProvidersQuery: () => ({
    data: [
      {
        id: "mock-provider-id",
        nombre: "Proveedor Test",
        telefono: "123456789",
        email: "test@example.com",
        pais: "Argentina",
        contacto: "Contacto Test",
        direccion: "Dirección Test",
      },
    ],
    isSuccess: true,
  }),
  useUpdateProviderMutation: () => [
    vi.fn().mockImplementation((data) => {
      return Promise.resolve({
        id: data.id,
        ...data.provider,
      });
    }),
    { isLoading: false },
  ],
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock auth and user reducers
vi.mock("@/state-managment/slices/auth-slice", () => ({
  default: () => ({}),
}));

vi.mock("@/state-managment/slices/user-slice", () => ({
  default: () => ({}),
}));

describe("Provider Integration Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Create a provider, view it in the list, and edit it", async () => {
    // Render the providers page
    renderWithProviders(
      <MemoryRouter initialEntries={["/proveedores"]}>
        <Routes>
          <Route path="/proveedores" element={<ProvidersPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Step 1: Find the button element by text content and icon and click it
    await waitFor(() => {
      // Get all buttons on the page
      const buttons = screen.getAllByRole("button");

      // Find the add provider button with the specific text
      const addButton = buttons.find(
        (button) =>
          button.textContent?.includes("Agregar Proveedor") &&
          button.querySelector('[data-testid="AddIcon"]')
      );

      expect(addButton).toBeTruthy();
      if (addButton) {
        fireEvent.click(addButton);
      }
    });

    // Verify the provider form is shown
    await waitFor(() => {
      expect(screen.getByText("Agregar Proveedor")).toBeInTheDocument();
    });

    // Fill out the provider form
    const nameField = screen
      .getByTestId("nombre-del-proveedor")
      .querySelector("input");
    const emailField = screen
      .getByTestId("email-del-proveedor")
      .querySelector("input");
    const phoneField = screen
      .getByTestId("telefono-del-proveedor")
      .querySelector("input");
    const countryField = screen
      .getByTestId("country-del-proveedor")
      .querySelector("input");
    const contactField = screen
      .getByTestId("contacto-del-proveedor")
      .querySelector("input");

    if (nameField && emailField && phoneField && countryField && contactField) {
      fireEvent.change(nameField, { target: { value: "Proveedor Test" } });
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      fireEvent.change(phoneField, { target: { value: "123456789" } });
      fireEvent.change(countryField, { target: { value: "Argentina" } });
      fireEvent.change(contactField, { target: { value: "Contacto Test" } });
    }

    // Submit the form - use form submission instead of button click
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // Step 2: Verify the provider was created and shows success message
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Proveedor creado correctamente"
      );
    });

    // Verify the provider is in the list
    await waitFor(() => {
      expect(screen.getByText("Proveedor Test")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
    });

    // Step 3: Edit the provider
    const editIcon = screen.getByTestId("edit-icon-mock-provider-id");
    fireEvent.click(editIcon);

    // Verify the edit form is shown
    await waitFor(() => {
      expect(screen.getByText("Editar Proveedor")).toBeInTheDocument();
    });

    // Change the provider name
    const editNameField = screen
      .getByTestId("nombre-del-proveedor")
      .querySelector("input");
    if (editNameField) {
      fireEvent.change(editNameField, {
        target: { value: "Proveedor Actualizado" },
      });
    }

    // Submit the edit form
    const saveButton = screen.getByText("Guardar");
    fireEvent.click(saveButton);

    // Verify the provider was updated and shows success message
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Proveedor actualizado correctamente"
      );
    });
  });
});
