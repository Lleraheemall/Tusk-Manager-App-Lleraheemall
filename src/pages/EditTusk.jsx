import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Navigate } from "react-router-dom";
import { useEditTusk } from "../hooks/useEditTusk";

export const EditTusk = ({ tusks, setTusks }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    handleSave,
    handleCancel,
    exists,
  } = useEditTusk(tusks, setTusks);

  if (!exists) return <Navigate to="*" replace />;

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
      >
        Edit Tusk
      </Typography>

      <Box component="form" onSubmit={handleSave}>
        <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Title:
          </Typography>
          <TextField
            value={title}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Description:
          </Typography>
          <TextField
            value={description}
            fullWidth
            rows={4}
            multiline
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
