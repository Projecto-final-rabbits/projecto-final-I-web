import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomPagination from "./components/custom-pagination";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";

type CustomTableProps<TData> = {
  title: string;
  rows: TData[];
  columns: GridColDef[];
  subtitle?: string;
  actions?: React.ReactNode;
};

const CustomTable = <TData,>({
  rows,
  columns,
  title,
  subtitle,
  actions,
}: CustomTableProps<TData>) => {
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: "0.5rem",
        borderColor: "customColors.border",
        padding: "1.25rem",
      }}
    >
      <Stack mb={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{subtitle}</Typography>
      </Stack>
      <Stack spacing={1}>
        <Stack>{actions}</Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            border: 1,
            borderColor: "customColors.border",
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{
            pagination: CustomPagination,
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Stack>
    </Box>
  );
};

export { CustomTable };
