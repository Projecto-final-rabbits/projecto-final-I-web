import { Provider } from "../entities/provider";

export interface IProviderRepository {
  findAll(): Promise<Provider[]>;
  findById(id: number): Promise<Provider | null>;
}
