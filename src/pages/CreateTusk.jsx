import { TextField, Button, Box, Typography, Container } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCreateTusk } from "../hooks/useCreateTusk";

export const CreateTusk = ({ onAdd }) => {
  const { formData, error, handleChange, submitHandle, handleCancel } =
    useCreateTusk(onAdd);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Create a new tusk
        </Typography>

        <Box component="form" onSubmit={submitHandle}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleChange}
            error={error}
            helperText={error ? "Title is required" : ""}
          />

          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
