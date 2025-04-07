import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

const ToggleButtonStyle = {
  height: "2rem",
  borderRadius: "0.5rem",
  border: 0,
  "&.Mui-selected": {
    backgroundColor: "secondary.contrastText",
    color: "secondary",
  },
  "&:hover": {
    backgroundColor: "secondary.contrastText",
  },
};

const InventoryToggle = () => {
  const [filter, setFilter] = useState("all");

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{
        backgroundColor: "#f3f3f3",
        padding: "0.2rem",
        borderRadius: "0.5rem",
        border: 0,
      }}
    >
      <ToggleButton value="all" sx={ToggleButtonStyle}>
        Todos
      </ToggleButton>
      <ToggleButton value="out" sx={ToggleButtonStyle}>
        Sin Inventario
      </ToggleButton>
      <ToggleButton value="in" sx={ToggleButtonStyle}>
        En Inventario
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export { InventoryToggle };
