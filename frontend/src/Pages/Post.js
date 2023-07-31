import {
  ChatBubbleOutlineOutlined,
  // FavoriteBorderOutlined,
  // FavoriteOutlined,
  SendOutlined,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
  ThumbUpOffAltOutlined,
  ThumbDownOffAltOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, TextField } from "@mui/material";
import FlexBetween from "DisplayComponents/FlexBetween";
//import Friend from "DisplayComponents/Friend";
import WidgetWrapper from "DisplayComponents/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "./State";

const Post = ({
  postId,
  postedBy,
  text,
  picturePath,
  userPicturePath,
  postedIn,
  upvotes,
  downvotes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, SetComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const upvoted = Boolean(upvotes && upvotes[loggedInUserId]);
  const downvoted = Boolean(downvotes && downvotes[loggedInUserId]);
  const upvotecount = upvotes ? Object.keys(upvotes).length : 0;
  const downvoteCount = downvotes ? Object.keys(downvotes).length : 0;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchupvote = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchdownvote = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postId}/dislike`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const postComment = async () => {

    const formData = new FormData();
    formData.append("userId", loggedInUserId);
    formData.append("comment", comment);

    const response = await fetch(`http://localhost:3001/api/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        comment: comment,
      }),
    });
    const updatedPost = await response.json();
    //console.log(updatedPost)
    dispatch(setPost({ post: updatedPost }));
    setIsComments(!isComments)
  };

  return (
    <WidgetWrapper m="2rem 0">
      {/* <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      /> */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {text}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/api/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchupvote}>
              {upvoted ? (
                <ThumbUpAltOutlined sx={{ color: primary }} />
              ) : (
                <ThumbUpOffAltOutlined />
              )}
            </IconButton>
            <Typography>{upvotecount}</Typography>
            <IconButton onClick={patchdownvote}>
              {downvoted ? (
                <ThumbDownAltOutlined sx={{ color: primary }} />
              ) : (
                <ThumbDownOffAltOutlined />
              )}
            </IconButton>
            <Typography>{downvoteCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${text}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.commentedBy.userName} {comment.commentBody}
              </Typography>
            </Box>
          ))}
          <Divider />
          </Box>
        {isComments && (
          <Box>
          <TextField
              placeholder="Comment"
              name="comment"
              onChange={(e) => SetComment(e.target.value)}
              variant="standard"
              size="small"
            />
          <IconButton onClick={postComment}>
              <SendOutlined/>
          </IconButton>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Post;
