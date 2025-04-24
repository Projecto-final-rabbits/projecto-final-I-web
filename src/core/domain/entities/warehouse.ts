import { IWarehouse } from "../interfaces";

class Warehouse implements IWarehouse {
  id: number;
  nombre: string;
  cuidad: string;
  pais: string;

  constructor({ id, nombre, cuidad, pais }: IWarehouse) {
    this.id = id;
    this.nombre = nombre;
    this.cuidad = cuidad;
    this.pais = pais;
  }
}

export { Warehouse };
