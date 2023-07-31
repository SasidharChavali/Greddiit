import {
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
    ThumbUpOffAltOutlined,
    ThumbDownOffAltOutlined,
  } from "@mui/icons-material";
  import { 
    IconButton, 
    Typography, 
    useTheme, 
  } from "@mui/material";
  import FlexBetween from "DisplayComponents/FlexBetween";
  import WidgetWrapper from "DisplayComponents/WidgetWrapper";
  import { useDispatch, useSelector } from "react-redux";
  import { setFollowers, setFollowing } from "./State";
  
  const SetFollowData = ({
    otheruserId,
    upvotes,
    downvotes,
  }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const upvoted = Boolean(upvotes && upvotes[loggedInUserId]);
    const downvoted = Boolean(downvotes && downvotes[loggedInUserId]);
    const upvotecount = upvotes ? Object.keys(upvotes).length : 0;
    const downvoteCount = downvotes ? Object.keys(downvotes).length : 0;
    const { palette } = useTheme();
    const primary = palette.primary.main;
  
    const unFollow = async () => {
      const response = await fetch(`http://localhost:3001/api/users/${otheruserId}/unfollow`, {
        method: "UPDATE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setFollowing({ post: updatedPost }));
    };
  
    const removeFollower = async () => {
      const response = await fetch(`http://localhost:3001/api/posts/${otheruserId}/remove`, {
        method: "UPDATE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setFollowers({ post: updatedPost }));
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        {/* {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/api/assets/${picturePath}`}
          />
        )} */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={unFollow}>
                {upvoted ? (
                  <ThumbUpAltOutlined sx={{ color: primary }} />
                ) : (
                  <ThumbUpOffAltOutlined />
                )}
              </IconButton>
              <Typography>{upvotecount}</Typography>
              <IconButton onClick={removeFollower}>
                {downvoted ? (
                  <ThumbDownAltOutlined sx={{ color: primary }} />
                ) : (
                  <ThumbDownOffAltOutlined />
                )}
              </IconButton>
              <Typography>{downvoteCount}</Typography>
            </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default SetFollowData;
  