// src/pages/orders-list/index.tsx
import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state-managment/hooks";
import { fetchOrders } from "@/state-managment/slices/ordersSlice";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { RouteModal } from "./components";

export const OrdersListPage: React.FC = () => {
  const [openRouteModal, setOpenRouteModal] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((s) => s.orders);

  const handleOpenRouteModal = () => {
    setOpenRouteModal(true);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "failed") {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Fragment>
      <Box p={3}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton disabled>
            <ListAltIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" component="h1">
            {t("orders.title")}
          </Typography>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("orders.table.id")}</TableCell>
                <TableCell>{t("orders.table.date")}</TableCell>
                <TableCell>{t("orders.table.customer")}</TableCell>
                <TableCell>{t("orders.table.address")}</TableCell>
                <TableCell>{t("orders.table.status")}</TableCell>
                <TableCell align="right">{t("orders.table.total")}</TableCell>
                <TableCell align="center">
                  {t("orders.table.actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((o) => (
                <Fragment>
                  <TableRow key={o.id} hover>
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.fecha_envio}</TableCell>
                    <TableCell>{o.cliente_id}</TableCell>
                    <TableCell>{o.direccion_entrega}</TableCell>
                    <TableCell>{o.estado}</TableCell>
                    <TableCell align="right">${o.total.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        startIcon={<ListAltIcon />}
                        onClick={handleOpenRouteModal}
                      >
                        {t("orders.table.viewRoute")}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<ListAltIcon />}
                        sx={{ ml: 1 }}
                        onClick={() => {}}
                      >
                        {t("orders.table.optimizeRoute")}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {openRouteModal && (
                    <RouteModal
                      orderId={o.id}
                      open={openRouteModal}
                      onClose={() => setOpenRouteModal(false)}
                    />
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Fragment>
  );
};
