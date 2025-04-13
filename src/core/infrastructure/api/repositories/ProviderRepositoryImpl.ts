import { IProviderRepository } from "@core/domain/repositories/provider.repository";
import { Provider } from "@core/domain/entities/provider";
import { axiosClientForBuyers } from "@/core/infraestructure/api/clients";
import { ICreateProvider, IProviderDTO } from "@/core/domain/interfaces";

class ProviderRepositoryImpl implements IProviderRepository {
  async findById(id: number): Promise<Provider | null> {
    try {
      const response = await axiosClientForBuyers.get(`/proveedores/${id}`);
      return Provider.fromDtoToEntity(response.data);
    } catch (error) {
      console.error("Error fetching provider by ID:", error);
      return null;
    }
  }

  async findAll(): Promise<Provider[]> {
    return axiosClientForBuyers.get("/proveedores/").then((response) => {
      const providers = response.data.map((provider: IProviderDTO) =>
        Provider.fromDtoToEntity(provider)
      );
      return providers;
    });
  }

  async save(provider: ICreateProvider): Promise<void> {
    const providerDto = Provider.fromCreateEntityToDto(provider);
    return axiosClientForBuyers.post("/proveedores/", providerDto);
  }

  async update(provider: ICreateProvider, id: number): Promise<void> {
    const providerDto = Provider.fromCreateEntityToDto(provider);
    return axiosClientForBuyers.put(`/proveedores/${id}`, providerDto);
  }

  async delete(id: number): Promise<void> {
    return axiosClientForBuyers.delete(`/proveedores/${id}`);
  }
}

export { ProviderRepositoryImpl };
