interface IProvider {
  id: number;
  nombre: string;
  pais: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
}

interface IProviderDTO {
  id: number;
  nombre: string;
  pais: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
}

export type { IProvider, IProviderDTO };
