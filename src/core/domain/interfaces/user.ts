interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

type Role = "ventas" | "compras" | "bodega" | "admin";

export type { User, Role };
