import { useSelector } from "react-redux";
import { RootState } from "@/state-managment/store";
const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  return <div>HomePage</div>;
};

export { HomePage };
