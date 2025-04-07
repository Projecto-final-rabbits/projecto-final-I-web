import { Button, Stack, Typography } from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handlePrev = () => {
    apiRef.current.setPage(page - 1);
  };

  const handleNext = () => {
    apiRef.current.setPage(page + 1);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
    >
      <Typography variant="body2">
        Pagina {page + 1} de {pageCount}
      </Typography>
      <Button
        onClick={handlePrev}
        disabled={page === 0}
        variant="outlined"
        color="primary"
        size="small"
      >
        Previous
      </Button>

      <Button
        onClick={handleNext}
        disabled={page >= pageCount - 1}
        variant="outlined"
        color="primary"
        size="small"
      >
        Next
      </Button>
    </Stack>
  );
};

export default CustomPagination;
