import { Box, Typography, useTheme} from "@mui/material";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
        Greddiit
        </Typography>
      </Box>

      <Box
        width="93%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Greddiit
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
