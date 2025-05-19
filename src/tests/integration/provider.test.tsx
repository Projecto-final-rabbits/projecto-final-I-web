import { screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../utils/test-utils";
import { ProvidersPage } from "@/pages/providers";
import { vi, expect } from "vitest";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";

// Define proper types for the mock responses
interface Provider {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  pais: string;
  contacto: string;
  direccion: string;
}

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
      // Create a mock that includes the unwrap method
      const mockPromise = Promise.resolve({
        id: "mock-provider-id",
        ...data,
      });

      // Add unwrap method to the promise
      return {
        unwrap: () => mockPromise,
        then: (callback: (data: Provider) => void) =>
          mockPromise.then(callback),
        catch: (callback: (error: Error) => void) =>
          mockPromise.catch(callback),
      };
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
      // Create a mock that includes the unwrap method
      const mockPromise = Promise.resolve({
        id: data.id,
        ...data.provider,
      });

      // Add unwrap method to the promise
      return {
        unwrap: () => mockPromise,
        then: (callback: (data: Provider) => void) =>
          mockPromise.then(callback),
        catch: (callback: (error: Error) => void) =>
          mockPromise.catch(callback),
      };
    }),
    { isLoading: false },
  ],
}));

// Mock toast notification function
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

const findVisibleElement = (elements: HTMLElement[]) => {
  return elements.find((element) => {
    // Check if element or its parent is visible
    const style = window.getComputedStyle(element);
    const parentStyle = element.parentElement
      ? window.getComputedStyle(element.parentElement)
      : null;
    return (
      style.display !== "none" &&
      (!parentStyle || parentStyle.display !== "none")
    );
  });
};

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

    // Step 1: Find and click the add provider button using the data-testid
    await waitFor(() => {
      const addButton = screen.getByTestId("crear-proveedor-button");
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
    });

    // Verify that a modal dialog is visible
    await waitFor(() => {
      const modalDialog = screen.getByRole("dialog");
      expect(modalDialog).toBeInTheDocument();
    });

    // Fill out the provider form
    await waitFor(() => {
      // Use getAllByTestId to handle multiple elements with the same testid and get the first one
      const nameFields = screen.getAllByTestId("nombre-del-proveedor");
      const nameField = nameFields[0].querySelector("input");

      const emailFields = screen.getAllByTestId("email-del-proveedor");
      const emailField = emailFields[0].querySelector("input");

      const phoneFields = screen.getAllByTestId("telefono-del-proveedor");
      const phoneField = phoneFields[0].querySelector("input");

      const countryFields = screen.getAllByTestId("country-del-proveedor");
      const countryField = countryFields[0].querySelector("input");

      const contactFields = screen.getAllByTestId("contacto-del-proveedor");
      const contactField = contactFields[0].querySelector("input");

      if (
        nameField &&
        emailField &&
        phoneField &&
        countryField &&
        contactField
      ) {
        fireEvent.change(nameField, { target: { value: "Proveedor Test" } });
        fireEvent.change(emailField, { target: { value: "test@example.com" } });
        fireEvent.change(phoneField, { target: { value: "123456789" } });
        fireEvent.change(countryField, { target: { value: "Argentina" } });
        fireEvent.change(contactField, { target: { value: "Contacto Test" } });
      }

      // Submit the form using the submit button with data-testid
      const submitButtons = screen.getAllByTestId("crear-proveedor-form");
      const visibleSubmitButton = findVisibleElement(submitButtons);
      if (visibleSubmitButton) {
        fireEvent.click(visibleSubmitButton);
      }
    });

    // Step 2: Verify the provider was created and shows success message
    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );

    // Reset the mocks to check for the update toast separately
    vi.clearAllMocks();

    // Verify the provider is in the list
    await waitFor(() => {
      expect(screen.getByText("Proveedor Test")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
    });

    // Step 3: Edit the provider
    const editIcon = screen.getByTestId("edit-icon-mock-provider-id");
    fireEvent.click(editIcon);

    // Verify that a modal dialog is visible for editing
    await waitFor(() => {
      const modalDialog = screen.getByRole("dialog");
      expect(modalDialog).toBeInTheDocument();
    });

    // Change the provider name
    await waitFor(() => {
      // Use getAllByTestId and get the visible input
      const nameFields = screen.getAllByTestId("nombre-del-proveedor");
      const visibleNameField = findVisibleElement(nameFields);

      if (visibleNameField) {
        const editNameField = visibleNameField.querySelector("input");
        if (editNameField) {
          fireEvent.change(editNameField, {
            target: { value: "Proveedor Actualizado" },
          });
        }
      }

      // Submit the edit form - use the data-testid for the create/save button
      const submitButtons = screen.getAllByTestId("crear-proveedor-form");
      const visibleSubmitButton = findVisibleElement(submitButtons);
      if (visibleSubmitButton) {
        fireEvent.click(visibleSubmitButton);
      }
    });

    // Verify the provider was updated and shows success message
    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });
});
