import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { store } from "./state-managment/store";
import { Provider } from "react-redux";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter >
      <Provider store={store}>
        <Box sx={{ height: "100vh" }}>
        <AppRoutes />
        </Box>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
