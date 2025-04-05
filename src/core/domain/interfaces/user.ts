interface User {
  id?: string;
  fullname: string;
  email: string;
  role: Role;
}

type Role = "ventas" | "compras" | "bodega" | "admin";

export type { User, Role };
