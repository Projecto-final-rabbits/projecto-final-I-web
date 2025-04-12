import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { store } from "./state-managment/store";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Provider store={store}>
          <Box sx={{ height: "100vh" }}>
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3000} />
          </Box>
        </Provider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
