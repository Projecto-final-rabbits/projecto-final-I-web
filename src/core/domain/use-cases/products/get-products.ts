import { IProductRepository } from "@core/domain/repositories";
import { Product } from "@core/domain/entities/product";

const getProducts = async (
  repository: IProductRepository,
  params?: {
    providerId?: string | null;
    categoryId?: string | null;
  }
): Promise<Product[]> => {
  const { providerId, categoryId } = params || {};
  const filters = {
    ...(providerId && { proveedorId: providerId }),
    ...(categoryId && { categoriaId: categoryId }),
  };
  return repository.findAll(filters);
};

export { getProducts };
