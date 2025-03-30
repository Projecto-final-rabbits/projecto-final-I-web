import { useState } from "react";
import { Button, Typography, Container } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography variant="h1" gutterBottom>
        Vite + React
      </Typography>
      <div className="card">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
        <Typography variant="body1" mt={2}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </div>
      <Typography className="read-the-docs">
        Click on the Vite and React logos to learn more
      </Typography>
    </Container>
  );
}

export default App;
