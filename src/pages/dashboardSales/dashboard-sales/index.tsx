import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state-managment/hooks";
import { fetchSalesSummary } from "@/state-managment/slices/dashboard-slice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
const COLORS = ["#1976d2", "#388e3c", "#d32f2f", "#ffa000", "#7b1fa2"];

const DashboardSales: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.dashboard);

  // Estados locales para las fechas
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().startOf("month")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().endOf("month"));

  // Función para disparar la carga con parámetros
  const loadData = () => {
    dispatch(
      fetchSalesSummary({
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
      })
    );
  };

  // Carga inicial
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  // Muestra spinner si estamos recargando datos
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
        {error || "Error cargando datos del dashboard."}
      </Typography>
    );
  }

  if (!data) return null;

  // Transformaciones de datos
  const estadoData = Object.entries(data.pedidos_por_estado).map(
    ([estado, count]) => ({ estado, count })
  );
  const ciudadData = Object.entries(data.ventas_por_ciudad).map(
    ([ciudad, ingresos]) => ({ ciudad, ingresos })
  );
  const { total_pedidos, ingresos_totales, ticket_promedio, clientes_activos } =
    data;

  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
        gap: 2,
        p: 2,
      }}
    >
      {/* Controles de fecha */}
      <Box gridColumn="1 / -1" display="flex" alignItems="center" gap={2}>
        <DatePicker
          label="Desde"
          value={startDate}
          onChange={(d) => setStartDate(d)}
          slotProps={{ textField: { size: "small" } }}
        />
        <DatePicker
          label="Hasta"
          value={endDate}
          onChange={(d) => setEndDate(d)}
          slotProps={{ textField: { size: "small" } }}
        />
        <Button
          variant="contained"
          onClick={loadData}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Cargando..." : "Actualizar"}
        </Button>
      </Box>

      {/* Cards KPI */}
      <Card>
        <CardContent>
          <Typography variant="h6">Total Pedidos</Typography>
          <Typography variant="h4">{total_pedidos}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Ingresos Totales</Typography>
          <Typography variant="h4">
            ${ingresos_totales.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Ticket Promedio</Typography>
          <Typography variant="h4">${ticket_promedio.toFixed(2)}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Clientes Activos</Typography>
          <Typography variant="h4">{clientes_activos}</Typography>
        </CardContent>
      </Card>

      {/* Gráfico de Pedidos por Estado
      <Box
        gridColumn={{ xs: "1 / -1", md: "1 / 3" }}
        sx={{ height: 300, bgcolor: "background.paper", p: 2, borderRadius: 1 }}
      >
        <Typography variant="h6" gutterBottom>
          Pedidos por Estado
        </Typography>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={estadoData}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box> */}
      {/* Gráfico de Pedidos por Estado como PieChart */}
      <Box
        gridColumn={{ xs: "1 / -1", md: "1 / 3" }}
        sx={{ height: 300, bgcolor: "background.paper", p: 2, borderRadius: 1 }}
      >
        <Typography variant="h6" gutterBottom>
          Pedidos por Estado
        </Typography>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={estadoData} // [{ estado, count }]
              dataKey="count"
              nameKey="estado"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {estadoData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value} pedidos`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Gráfico de Ventas por Ciudad */}
      <Box
        gridColumn={{ xs: "1 / -1", md: "3 / 5" }}
        sx={{ height: 300, bgcolor: "background.paper", p: 2, borderRadius: 1 }}
      >
        <Typography variant="h6" gutterBottom>
          Ventas por Ciudad
        </Typography>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={ciudadData}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ciudad" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ingresos" fill="#388e3c" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export { DashboardSales };
