import { describe, test, expect } from "vitest";
import {
  IProduct,
  IProductDTO,
  ICreateProduct,
  ICreateProductDTO,
  IUpdateProductDTO,
  IMoveProduct,
} from "@/core/domain/interfaces/product";

// Type tests are unique because they're checked at compile time, not runtime.
// These tests validate that the types have the expected structure and properties.

// Helper type for testing if a property exists on an interface
type HasProperty<T, K extends string> = K extends keyof T ? true : false;

describe("Product Interfaces", () => {
  test("IProduct has all required properties with correct types", () => {
    // This is a type-level test that will fail at compile time if the interface changes
    type Props = {
      id: HasProperty<IProduct, "id">;
      nombre: HasProperty<IProduct, "nombre">;
      precioCompra: HasProperty<IProduct, "precioCompra">;
      proveedorId: HasProperty<IProduct, "proveedorId">;
      promocionActiva: HasProperty<IProduct, "promocionActiva">;
      precioVenta: HasProperty<IProduct, "precioVenta">;
    };

    const props: Props = {
      id: true,
      nombre: true,
      precioCompra: true,
      proveedorId: true,
      promocionActiva: true,
      precioVenta: true,
    };

    // Even though this is a "runtime" assertion, it's validating our type test
    expect(props).toEqual({
      id: true,
      nombre: true,
      precioCompra: true,
      proveedorId: true,
      promocionActiva: true,
      precioVenta: true,
    });
  });

  test("IProductDTO maps correctly to the backend format", () => {
    type Props = {
      id: HasProperty<IProductDTO, "id">;
      nombre: HasProperty<IProductDTO, "nombre">;
      precio_compra: HasProperty<IProductDTO, "precio_compra">; // Note the snake_case
      precio_venta: HasProperty<IProductDTO, "precio_venta">;
      promocion_activa: HasProperty<IProductDTO, "promocion_activa">;
      proveedor_id: HasProperty<IProductDTO, "proveedor_id">;
    };

    const props: Props = {
      id: true,
      nombre: true,
      precio_compra: true,
      precio_venta: true,
      promocion_activa: true,
      proveedor_id: true,
    };

    expect(props).toEqual({
      id: true,
      nombre: true,
      precio_compra: true,
      precio_venta: true,
      promocion_activa: true,
      proveedor_id: true,
    });
  });

  test("ICreateProduct contains all fields needed for product creation", () => {
    type Props = {
      nombre: HasProperty<ICreateProduct, "nombre">;
      proveedorId: HasProperty<ICreateProduct, "proveedorId">;
      precioCompra: HasProperty<ICreateProduct, "precioCompra">;
      precioVenta: HasProperty<ICreateProduct, "precioVenta">;
      promocionActiva: HasProperty<ICreateProduct, "promocionActiva">;
      fechaVencimiento: HasProperty<ICreateProduct, "fechaVencimiento">;
      condicionAlmacenamiento: HasProperty<
        ICreateProduct,
        "condicionAlmacenamiento"
      >;
    };

    const props: Props = {
      nombre: true,
      proveedorId: true,
      precioCompra: true,
      precioVenta: true,
      promocionActiva: true,
      fechaVencimiento: true,
      condicionAlmacenamiento: true,
    };

    expect(props).toEqual({
      nombre: true,
      proveedorId: true,
      precioCompra: true,
      precioVenta: true,
      promocionActiva: true,
      fechaVencimiento: true,
      condicionAlmacenamiento: true,
    });
  });

  test("IMoveProduct contains all fields needed for moving product", () => {
    type Props = {
      productId: HasProperty<IMoveProduct, "productId">;
      warehouseId: HasProperty<IMoveProduct, "warehouseId">;
      description: HasProperty<IMoveProduct, "description">;
      quantity: HasProperty<IMoveProduct, "quantity">;
    };

    const props: Props = {
      productId: true,
      warehouseId: true,
      description: true,
      quantity: true,
    };

    expect(props).toEqual({
      productId: true,
      warehouseId: true,
      description: true,
      quantity: true,
    });
  });

  // This test demonstrates a realistic usage of these interfaces
  test("Sample usage - Create product and convert to DTO", () => {
    // This sample function would be part of your actual codebase
    function convertToDTO(product: ICreateProduct): ICreateProductDTO {
      return {
        nombre: product.nombre,
        descripcion: product.descripcion,
        categoria: product.categoria,
        proveedor_id: product.proveedorId,
        precio_compra: product.precioCompra,
        precio_venta: product.precioVenta,
        promocion_activa: product.promocionActiva,
        condicion_almacenamiento: product.condicionAlmacenamiento,
        fecha_vencimiento: product.fechaVencimiento,
        tiempo_entrega_dias: product.tiempoEntregaDias,
      };
    }

    const sampleProduct: ICreateProduct = {
      nombre: "Test Product",
      descripcion: "A test product",
      categoria: "Test",
      proveedorId: 1,
      precioCompra: 100,
      precioVenta: 150,
      promocionActiva: false,
      fechaVencimiento: new Date("2024-12-31"),
      condicionAlmacenamiento: "Ambient",
      tiempoEntregaDias: 5,
    };

    const dto = convertToDTO(sampleProduct);

    expect(dto.nombre).toEqual(sampleProduct.nombre);
    expect(dto.proveedor_id).toEqual(sampleProduct.proveedorId);
    expect(dto.precio_compra).toEqual(sampleProduct.precioCompra);
    expect(dto.precio_venta).toEqual(sampleProduct.precioVenta);
    expect(dto.promocion_activa).toEqual(sampleProduct.promocionActiva);
    expect(dto.fecha_vencimiento).toEqual(sampleProduct.fechaVencimiento);
  });

  // Add a new test that uses IUpdateProductDTO
  test("IUpdateProductDTO allows partial updates of product properties", () => {
    // Test that we can create a valid update DTO with just some properties
    const updateData: IUpdateProductDTO = {
      nombre: "Updated Product Name",
      precioVenta: 200,
    };

    // This is a type-level test - if we can assign these properties
    // without TypeScript errors, the interface is working
    expect(updateData.nombre).toBe("Updated Product Name");
    expect(updateData.precioVenta).toBe(200);
    expect(Object.keys(updateData).length).toBe(2);
  });
});
