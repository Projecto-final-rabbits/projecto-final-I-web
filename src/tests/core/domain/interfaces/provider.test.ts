import { describe, test, expect } from "vitest";
import {
  IProvider,
  IProviderDTO,
  ICreateProvider,
  ICreateProviderDTO,
} from "@/core/domain/interfaces/provider";

// Type tests are unique because they're checked at compile time, not runtime.
// These tests validate that the types have the expected structure and properties.

// Helper type for testing if a property exists on an interface
type HasProperty<T, K extends string> = K extends keyof T ? true : false;

describe("Provider Interfaces", () => {
  test("IProvider has all required properties with correct types", () => {
    // This is a type-level test that will fail at compile time if the interface changes
    type Props = {
      id: HasProperty<IProvider, "id">;
      nombre: HasProperty<IProvider, "nombre">;
      pais: HasProperty<IProvider, "pais">;
      contacto: HasProperty<IProvider, "contacto">;
      telefono: HasProperty<IProvider, "telefono">;
      email: HasProperty<IProvider, "email">;
    };

    const props: Props = {
      id: true,
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    };

    // Even though this is a "runtime" assertion, it's validating our type test
    expect(props).toEqual({
      id: true,
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    });
  });

  test("IProviderDTO has the same structure as IProvider", () => {
    // Verify that DTO and domain interface are aligned
    type DTOProps = {
      id: HasProperty<IProviderDTO, "id">;
      nombre: HasProperty<IProviderDTO, "nombre">;
      pais: HasProperty<IProviderDTO, "pais">;
      contacto: HasProperty<IProviderDTO, "contacto">;
      telefono: HasProperty<IProviderDTO, "telefono">;
      email: HasProperty<IProviderDTO, "email">;
    };

    const dtoProps: DTOProps = {
      id: true,
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    };

    expect(dtoProps).toEqual({
      id: true,
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    });
  });

  test("ICreateProvider contains all fields needed for provider creation", () => {
    type Props = {
      nombre: HasProperty<ICreateProvider, "nombre">;
      pais: HasProperty<ICreateProvider, "pais">;
      contacto: HasProperty<ICreateProvider, "contacto">;
      telefono: HasProperty<ICreateProvider, "telefono">;
      email: HasProperty<ICreateProvider, "email">;
    };

    const props: Props = {
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    };

    expect(props).toEqual({
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    });
  });

  // This test demonstrates a realistic usage of these interfaces
  test("Sample usage - Create provider and validate email format", () => {
    // This would be a validation function in your actual code
    function isValidProvider(provider: ICreateProvider): {
      valid: boolean;
      errors: string[];
    } {
      const errors: string[] = [];

      // Check email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(provider.email)) {
        errors.push("Invalid email format");
      }

      // Check phone number
      if (!/^\d{9,15}$/.test(provider.telefono)) {
        errors.push("Phone number must be between 9 and 15 digits");
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    }

    // Valid provider
    const validProvider: ICreateProvider = {
      nombre: "Test Provider",
      pais: "Spain",
      contacto: "John Doe",
      telefono: "123456789",
      email: "test@example.com",
    };

    // Invalid provider
    const invalidProvider: ICreateProvider = {
      nombre: "Test Provider",
      pais: "Spain",
      contacto: "John Doe",
      telefono: "123", // Too short
      email: "invalid-email", // Invalid format
    };

    const validResult = isValidProvider(validProvider);
    const invalidResult = isValidProvider(invalidProvider);

    expect(validResult.valid).toBe(true);
    expect(validResult.errors.length).toBe(0);

    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors.length).toBe(2);
    expect(invalidResult.errors).toContain("Invalid email format");
    expect(invalidResult.errors).toContain(
      "Phone number must be between 9 and 15 digits"
    );
  });

  // Add a test that uses ICreateProviderDTO
  test("ICreateProviderDTO has the same structure as ICreateProvider", () => {
    type DTOProps = {
      nombre: HasProperty<ICreateProviderDTO, "nombre">;
      pais: HasProperty<ICreateProviderDTO, "pais">;
      contacto: HasProperty<ICreateProviderDTO, "contacto">;
      telefono: HasProperty<ICreateProviderDTO, "telefono">;
      email: HasProperty<ICreateProviderDTO, "email">;
    };

    const dtoProps: DTOProps = {
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    };

    expect(dtoProps).toEqual({
      nombre: true,
      pais: true,
      contacto: true,
      telefono: true,
      email: true,
    });

    // Create a valid DTO instance to test object validation
    const providerDTO: ICreateProviderDTO = {
      nombre: "Provider Name",
      pais: "Spain",
      contacto: "Contact Person",
      telefono: "123456789",
      email: "provider@example.com",
    };

    expect(providerDTO.nombre).toBe("Provider Name");
    expect(providerDTO.email).toBe("provider@example.com");
  });
});
