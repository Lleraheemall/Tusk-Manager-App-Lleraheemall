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
    <Container
      maxWidth="md"
      sx={{ mt: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 } }}
    >
      <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mb: 2 }}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", wordBreak: "break-word" }}
          >
            {tusk.title}
          </Typography>
          <Chip
            label={tusk.completed ? "Completed" : "In progress"}
            color={tusk.completed ? "success" : "warning"}
            sx={{ alignSelf: "flex-start" }}
            variant="outlined"
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          gutterBottom
        >
          Created: {new Date(tusk.createdAt).toLocaleString()}
        </Typography>

        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", color: "gray" }}
          >
            DESCRIPTION:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {tusk.description || "No description provided."}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Button
            component={Link}
            to={`/tusk/${id}/edit`}
            variant="contained"
            fullWidth
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={() => setOpenConfirm(true)}
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
