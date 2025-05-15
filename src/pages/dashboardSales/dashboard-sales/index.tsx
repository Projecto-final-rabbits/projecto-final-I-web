// src/pages/dashboardSales/index.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state-managment/hooks";
import { fetchSalesSummary } from "@/state-managment/slices/dashboard-slice";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const COLORS = ["#1976d2", "#388e3c", "#d32f2f", "#ffa000", "#7b1fa2"];

const DashboardSales: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.dashboard);

  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().startOf("month")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().endOf("month"));

  const loadData = () => {
    dispatch(
      fetchSalesSummary({
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
      })
    );
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading" && !data) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }
  if (status === "failed") {
    return (
      <Typography color="error" align="center" mt={4}>
        {error || t("common:errors.loadingDashboard")}
      </Typography>
    );
  }
  if (!data) return null;

  // Prepara datos para gráficos
  const estadoData = Object.entries(data.pedidos_por_estado).map(
    ([estado, count]) => ({ estado, count })
  );
  const ciudadData = Object.entries(data.ventas_por_ciudad).map(
    ([ciudad, ingresos]) => ({ ciudad, ingresos })
  );
  const { total_pedidos, ingresos_totales, ticket_promedio, clientes_activos } =
    data;

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabecera */}
      <Typography variant="h4" gutterBottom>
        {t("dashboard.title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t("dashboard.description")}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Controles de fecha */}
      <Box display="flex" alignItems="center" gap={2} mb={3} flexWrap="wrap">
        <DatePicker
          label={t("dashboard.date.from")}
          value={startDate}
          onChange={(d) => setStartDate(d)}
          slotProps={{ textField: { size: "small" } }}
        />
        <DatePicker
          label={t("dashboard.date.to")}
          value={endDate}
          onChange={(d) => setEndDate(d)}
          slotProps={{ textField: { size: "small" } }}
        />
        <Button
          variant="contained"
          onClick={loadData}
          disabled={status === "loading"}
        >
          {status === "loading"
            ? t("dashboard.date.loading")
            : t("dashboard.date.update")}
        </Button>
      </Box>

      {/* Sección de KPIs */}
      <Typography variant="h6" gutterBottom>
        {t("dashboard.metrics.title")}
      </Typography>
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 4,
        }}
      >
        {[
          { title: t("dashboard.metrics.totalOrders"), value: total_pedidos },
          {
            title: t("dashboard.metrics.totalRevenue"),
            value: `$${ingresos_totales.toLocaleString()}`,
          },
          {
            title: t("dashboard.metrics.averageTicket"),
            value: `$${ticket_promedio.toFixed(2)}`,
          },
          {
            title: t("dashboard.metrics.activeCustomers"),
            value: clientes_activos,
          },
        ].map((kpi) => (
          <Card key={kpi.title} elevation={1}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {kpi.title}
              </Typography>
              <Typography variant="h5" mt={1}>
                {kpi.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Gráficos */}
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {/* Pie de Pedidos por Estado */}
        <Card sx={{ gridColumn: { xs: "1 / -1", md: "1 / 3" }, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("dashboard.charts.statusDistribution.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {t("dashboard.charts.statusDistribution.description")}
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={estadoData}
                dataKey="count"
                nameKey="estado"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {estadoData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip formatter={(value: number) => `${value} pedidos`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Barras de Ventas por Ciudad */}
        <Card sx={{ gridColumn: { xs: "1 / -1", md: "3 / 5" }, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("dashboard.charts.salesByCity.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {t("dashboard.charts.salesByCity.description")}
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ciudadData} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ciudad" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#388e3c" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
};

export { DashboardSales };
