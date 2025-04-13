import { IProductRepository } from "@core/domain/repositories";
import { Product } from "@core/domain/entities/product";

const getProducts = async (
  repository: IProductRepository,
  params?: {
    providerId?: string | null;
    countryId?: string | null;
  }
): Promise<Product[]> => {
  const { providerId, countryId } = params || {};
  const filters = {
    ...(providerId && { proveedor_id: providerId }),
    ...(countryId && { countryId }),
  };
  return repository.findAll(filters);
};

export { getProducts };
