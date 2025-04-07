import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { store } from "./state-managment/store";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Box sx={{ height: "100vh" }}>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </Box>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
