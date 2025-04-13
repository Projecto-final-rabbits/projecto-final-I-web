import { Provider } from "../entities/provider";

export interface IProviderRepository {
  findAll(): Promise<Provider[]>;
  findById(id: number): Promise<Provider | null>;
  save(provider: Provider): Promise<void>;
  update(provider: Provider, id: number): Promise<void>;
  delete(id: number): Promise<void>;
}
