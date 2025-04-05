import { useSelector } from "react-redux";
import { RootState } from "@/state-managment/store";
import { ProductsPage } from "../products";
const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user?.role === "compras") {
    return <ProductsPage />;
  }

  return <div>HomePage</div>;
};

export { HomePage };
