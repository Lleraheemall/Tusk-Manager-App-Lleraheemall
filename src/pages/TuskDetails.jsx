import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTuskDetails } from "../hooks/useTuskDetails";

export const TuskDetails = ({ tusks, setTusks }) => {
  const {
    tusk,
    id,
    openConfirm,
    setOpenConfirm,
    isDeleting,
    goBack,
    handleDelete,
  } = useTuskDetails(tusks, setTusks);

  if (!tusk && !isDeleting) {
    return <Navigate to="/*" replace />;
  }

  if (!tusk) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mb: 3 }}>
        Back to list
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#3f3f3f" }}
          >
            {tusk.title}
          </Typography>
          <Chip
            label={tusk.completed ? "Completed" : "In progress"}
            color={tusk.completed ? "success" : "warning"}
            variant="outlined"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Created at:</strong>{" "}
          {new Date(tusk.createdAt).toLocaleString()}
        </Typography>

        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Description:
          </Typography>
          <Typography variant="body1">
            {tusk.description || "No description provided."}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to={`/tusk/${id}/edit`}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={() => setOpenConfirm(true)}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Paper>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure that you want to delete this task?
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
