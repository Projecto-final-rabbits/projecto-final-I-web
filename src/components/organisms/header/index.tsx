import {
  alpha,
  AppBar,
  Box,
  IconButton,
  InputBase,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "@/state-managment/slices";
import { DesktopMenu, MovileMenu, CreateUser } from "./components";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { RootState } from "@/state-managment/store";
import { Link } from "react-router-dom";
import { ChangeLanguage } from "@/components/molecules/ChangeLanguage";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    dispatch(removeUser());
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          height: "4rem",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Stack spacing={2} direction="row">
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: 500,
              }}
            >
              Home
            </Link>
            {user?.role != "ventas" && (
              <Link
                to="/proveedores"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: 500,
                }}
              >
                Proveedores
              </Link>
            )}
            {user?.role != "compras" && (
            <Link
              to="/dashboard-sales"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: 500,
              }}
            >
              Dashboard Ventas
            </Link>
            )}
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <ChangeLanguage />
          <CreateUser role={user?.role ?? "admin"} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {
        <MovileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          handleProfileMenuOpen={handleProfileMenuOpen}
          handleLogout={handleLogout}
        />
      }
      <DesktopMenu
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
      />
    </Box>
  );
};

export { Header };
