import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useHomeTusks } from "../hooks/useHomeTusks";

export const Home = ({ tusks, setTusks }) => {
  const {
    statusFilter,
    filteredTusks,
    totalTusks,
    completedCount,
    handleFilterChange,
    toggleStatus,
  } = useHomeTusks(tusks, setTusks);

  return (
    <Container
      maxWidth="md"
      sx={{ mt: { xs: 2, md: 4 }, px: { xs: 1, sm: 2 } }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          fontSize: { xs: "2rem", md: "3rem" }, 
        }}
      >
        Tusk Manager
      </Typography>

      <Paper
        elevation={3}
        sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2, bgcolor: "#f5f5f5" }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="body1">
              Total: <strong>{totalTusks}</strong>
            </Typography>
            <Typography variant="body1">
              Completed: <strong>{completedCount}</strong>
            </Typography>
          </Box>
          <Button
            variant="contained"
            component={Link}
            to="/new"
            fullWidth={{ xs: true, sm: false }} 
            startIcon={<AddIcon />}
            sx={{ borderRadius: 5 }}
          >
            New Tusk
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={handleFilterChange}
          color="primary"
          size="small" 
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Список тасок */}
      <Stack spacing={1}>
        {filteredTusks.map((tusk) => (
          <Paper key={tusk.id} sx={{ p: 1 }}>
            <FormControlLabel
              sx={{ width: "100%", m: 0 }}
              control={
                <Checkbox
                  checked={tusk.completed}
                  onChange={() => toggleStatus(tusk.id)}
                />
              }
              label={
                <Link
                  to={`/tusk/${tusk.id}`}
                  style={{ fontSize: "1rem", wordBreak: "break-all" }}
                >
                  {tusk.title}
                </Link>
              }
            />
          </Paper>
        ))}
      </Stack>
    </Container>
  );
};
