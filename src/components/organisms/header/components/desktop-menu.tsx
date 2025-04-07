import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

type DesktopMenuProps = {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleLogout: () => void;
  menuId?: string;
};

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  isMenuOpen,
  handleMenuClose,
  handleLogout,
  menuId = "header-menu",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = () => {
    handleLogout();
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleClick}>Logout</MenuItem>
    </Menu>
  );
};

export { DesktopMenu };
