import { IProviderRepository } from "@core/domain/repositories";
import { Provider } from "@core/domain/entities/provider";

const getProviders = async (
  repository: IProviderRepository
): Promise<Provider[]> => {
  return repository.findAll();
};

export { getProviders };
