import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
          Page not found
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            borderRadius: 8,
          }}
        >
          Back to List
        </Button>
      </Box>
    </Container>
  );
};
