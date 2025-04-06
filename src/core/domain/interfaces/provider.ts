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

interface ICreateProvider {
  nombre: string;
  pais: string;
  contacto: string;
  telefono: string;
  email: string;
}

interface ICreateProviderDTO {
  nombre: string;
  pais: string;
  contacto: string;
  telefono: string;
  email: string;
}

export type { IProvider, IProviderDTO, ICreateProvider, ICreateProviderDTO };
