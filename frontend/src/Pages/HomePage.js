import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import User from "./User";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="block"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={undefined}>
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={undefined}
          mt="2rem"
        >
        </Box>
        <Box flexBasis="26%">
        <Box m="2rem 0" />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
