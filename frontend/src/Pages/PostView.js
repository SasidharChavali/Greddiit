import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import UserImage from "DisplayComponents/UserImage";
import { 
  Stack, 
  InputBase, 
  ListItemAvatar, 
  ListItemText, 
  List, 
  Paper, 
  Box, 
  Button, 
  ListItem,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  IconButton,
  Avatar,
  CardContent,
  CardActions,
  Collapse,
  Card,
  CardHeader,
  Divider,
 } from "@mui/material";

import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
//import { red } from "@mui/material/colors";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import AddIcon from "@mui/icons-material/Add";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostView(props) {
  const [presentuser, setpresentuser] = useState(null);
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.user._id);
  const [picturePath, setPicture] = useState("");
  const [flag, setflag] = useState(false);
  const commentref = useRef("");
  const concernref = useRef("");
  const [following, setfollowing] = useState([]);
  const [savedposts, setsavedposts] = useState([]);
  const [post, setpost] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchpost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/getpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: props.id }),
    });
    const json = await response.json();
    let localtime=new Date(Number(json.date));
    json.date=localtime.toDateString()
    json.time=localtime.toTimeString()
    console.log(json);
    if (json.error) alert(json.error);
    else {
      setpost(json);
    }
  };
  const getuser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${post.postedBy}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    else {
      setPicture(json.picturePath);
      setpresentuser(json._id);
      setfollowing(json.following);
      setsavedposts(json.savedposts);
    }
  };
  const sendcomment = async () => {
    const text = commentref.current.value;
    // console.log(text);
    const response = await fetch("http://localhost:3001/api/subgreddiits/postcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id, comment: text }),
    });
    const json = await response.json();
    // console.log(json);
    commentref.current.value = "";
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
  };
  const followpost = async () => {
    const response = await fetch("http://localhost:3001/api/users/followuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        id: id,
        postid: post._id,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
  };

  //like post
  const likepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/likepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
  };
  // remove like
  const removelikepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/removelikepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
  };

  // add to saved posts
  const savepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/savepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
    if (props.savedpostflag !== null) {
      // console.log("hello ever");
      if (props.savedpostflag) {
        props.setsavedpostflag(false);
      } else {
        props.setsavedpostflag(true);
      }
    }
  };
  const unsavepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/unsavepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
    if (props.savedpostflag !== null) {
      // console.log("hello ever");
      if (props.savedpostflag) {
        props.setsavedpostflag(false);
      } else {
        props.setsavedpostflag(true);
      }
    }
  };
  // create report
  const createreport = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/createreport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postid: post._id,
        gredditid: post.postedIn,
        postedBy: post.postedBy,
        concern:concernref.current.value
      }),
    });
    const json = await response.json();
    // console.log(json);
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
    handleClose();
  };

  // dislike post
  const dislikepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/dislikepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
  };
  // remove dislike post
  const removedislikepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/removedislikepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postid: post._id }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.error) alert(json.error);
    if (flag) setflag(false);
    else setflag(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    //fetchpost();
    if (!token) {
      navigate("/login");
    } else {
      fetchpost();
      getuser();
    }
  }, [flag]); // eslint-disable-line react-hooks/exhaustive-deps
  //const openreport = () => {};
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {console.log(post)}
      {post && (
        <Card>
          <CardHeader
            avatar={
              <UserImage image={picturePath}/>
            }
            action={
              following.includes(presentuser) ? (
                <>
                  <ReportOutlinedIcon />
                  <Button onClick={followpost}>
                    <b>UnFollow</b>
                  </Button>
                </>
              ) : (
                <>
                  <IconButton aria-label="delete" size="small">
                    <ReportOutlinedIcon
                      onClick={handleClickOpen}
                      color="primary"
                    />
                  </IconButton>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Report this Post!!"}
                    </DialogTitle>
                    <DialogContent>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          id="outlined-multiline-static"
                          label="your concern"
                          multiline
                          fullWidth
                          rows={4}
                          inputRef={concernref}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={createreport}>Report</Button>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Button startIcon={<AddIcon />} onClick={followpost}>
                    <b>Follow</b>
                  </Button>
                </>
              )
            }
            title={post.username}
            subheader={post.date}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <IconButton aria-label="add to favorites">
                {post.upvotes.find((likeduser) => likeduser === presentuser) ? (
                  <>
                    <ThumbUpIcon onClick={removelikepost} />
                    <pre> </pre>
                    <Typography variant="subtitle1">
                      {" "}
                      {post.upvotes.length}
                    </Typography>
                  </>
                ) : (
                  <>
                    <ThumbUpOffAltIcon onClick={likepost} />
                    <pre> </pre>
                    <Typography variant="subtitle1">
                      {" "}
                      {post.upvotes.length}
                    </Typography>
                  </>
                )}
              </IconButton>
              <IconButton aria-label="share">
                {post.downvotes.find(
                  (likeduser) => likeduser === presentuser
                ) ? (
                  <ThumbDownIcon onClick={removedislikepost} />
                ) : (
                  <ThumbDownOffAltIcon onClick={dislikepost} />
                )}
              </IconButton>
              <IconButton aria-label="share">
                {savedposts.includes(post._id) ? (
                  <>
                    <BookmarkAddedIcon onClick={unsavepost} />
                  </>
                ) : (
                  <>
                    <BookmarkAddIcon onClick={savepost} />
                  </>
                )}
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <AddCommentIcon />
              </ExpandMore>
            </Stack>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Paper
                  component="form"
                  sx={{
                    p: "4px 6px",
                    display: "flex",
                    alignItems: "center",
                    width: 600,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Add comment"
                    inputProps={{ "aria-label": "add comment" }}
                    // onChange={onchange}
                    inputRef={commentref}
                  />

                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={sendcomment}
                  >
                    <SendIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </Paper>
              </Stack>
              <List>
                {post.comments.map((comment) => {
                  return (
                    <ListItem className="my-3">
                      <ListItemAvatar>
                        <Avatar aria-label="recipe">s</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.username}
                        secondary={
                          <React.Fragment>{comment.comment}</React.Fragment>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
