import {
  EditOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "DisplayComponents/UserImage";
import FlexBetween from "DisplayComponents/FlexBetween";
import WidgetWrapper from "DisplayComponents/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowersList from "./FollowersList"
import FollowingList from "./FollowingList"

const User = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const id = userId;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [isFollowers, setisFollowers] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      //body: {id: id}
    });
    const data = await response.json();
    //console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    userName,
    email,
    age,
    contactNumber,
    followers,
    following,
  } = user;

  return (
    <>
    {!isFollowers&&!isFollowing&&
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {userName}
            </Typography>
            {/* <Typography color={medium}>{followers.length} followers</Typography> */}
            {/* <Typography color={medium}>4 followers</Typography>  */}
          </Box>
        </FlexBetween>
        <EditOutlined />
      </FlexBetween>

      <Divider />
      <Typography color={medium}>Email: {email}</Typography>
      <Typography color={medium}>Age: {age}</Typography>
      <Typography color={medium}>Contact Number: {contactNumber}</Typography>
      <Divider />

      <Divider />
    </WidgetWrapper>}
    {isFollowing && (<FollowingList following={following}/>)}
    {isFollowers && (<FollowingList following={following}/>)}
    </>
  );
};

export default User;
