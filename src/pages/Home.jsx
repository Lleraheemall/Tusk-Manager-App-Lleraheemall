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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Tusk Manager
      </Typography>

      <Paper
        elevation={3}
        sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "#f5f5f5" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
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
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Stack spacing={2}>
        {filteredTusks.length === 0 ? (
          <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>
            No tusks found for this category...
          </Typography>
        ) : (
          filteredTusks.map((tusk) => (
            <Paper
              key={tusk.id}
              elevation={1}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.3s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tusk.completed}
                    onChange={() => toggleStatus(tusk.id)}
                  />
                }
                label={
                  <Link
                    to={`/tusk/${tusk.id}`}
                    state={{
                      from: window.location.pathname + window.location.search,
                    }}
                    style={{
                      textDecoration: tusk.completed ? "line-through" : "none",
                      color: tusk.completed ? "gray" : "black",
                      fontSize: "1.1rem",
                    }}
                  >
                    {tusk.title}
                  </Link>
                }
              />
            </Paper>
          ))
        )}
      </Stack>
    </Container>
  );
};
