import { IProvider, IProviderDTO } from "../interfaces/provider";

class Provider implements IProvider {
  id: number;
  nombre: string;
  pais: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;

  constructor({
    id,
    nombre,
    pais,
    contacto,
    telefono,
    email,
    direccion,
  }: IProvider) {
    this.id = id;
    this.nombre = nombre;
    this.pais = pais;
    this.contacto = contacto;
    this.telefono = telefono;
    this.email = email;
    this.direccion = direccion;
  }

  static fromDtoToEntity(dto: IProviderDTO): Provider {
    return new Provider({
      id: dto.id,
      nombre: dto.nombre,
      pais: dto.pais,
      contacto: dto.contacto,
      telefono: dto.telefono,
      email: dto.email,
      direccion: dto.direccion,
    });
  }
}

export { Provider };
