import React from "react";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Stack,
  Snackbar,
  Alert,
  MenuItem,
  TextField,
  Chip,
  Divider,
  Paper,
  InputBase,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Card
 } from "@mui/material";
import {  useSelector } from "react-redux";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import Buffer from "DisplayComponents/Buffer";

const MuiAlert = React.forwardRef(function MuiAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AllSubGred() {
  const [greddits, setgreddits] = useState(null);
  const sorttype = ["Name Asc", "Name Desc", "FollowerCount", "CreationDate"];
  const [tags, settags] = useState([]);
  const [st, setst] = useState("Name Asc");
  const tagref = useRef(null);
  const sortref = useRef(null);
  const [searchedword, setsearchedword] = useState("");
  const [request, setrequest] = useState(false);
  const id = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const [blockflag, setblockflag] = useState(false);
  const [leftflag, setleftflag] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);
  const [cancelflag, setcancelflag] = useState(false);
  const sortchange = (e) => {
    // console.log("hai");
    console.log(e.target.value);
    setst(e.target.value);
  };
  const addtag = () => {
    // console.log("hai")
    console.log(tagref.current.value);
    let newwords = [].concat(tags, tagref.current.value);
    settags(newwords);
    // console.log(tags);
    tagref.current.value = "";
  };
  const onchange = (e) => {
    setsearchedword(e.target.value);
  };
  //lets fectch all greddits
  const handleDelete = (tag) => {
    settags(tags.filter((tagi) => tagi !== tag));
  };
  const fetchallgreddits = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/fetchallgreddits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) setgreddits(json);
    else {
      alert(json.error);
    }
  };

  const joinrequest = async (gredditid) => {
    setrequest(true);
    const newdata = {
      gredditid: gredditid,
    };
    const response = await fetch("http://localhost:3001/api/subgreddiits/joinrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newdata),
    });
    const json = await response.json();
    console.log(json);
    // setrequest(false);
    if (!click) setclick(true);
    else setclick(false);
  };

  const navigate = useNavigate();
  const [click, setclick] = useState(false);
  useEffect(() => {
    if (!token) {
      console.log("Here lies.")
      navigate("/login");
    } else {
      fetchallgreddits();
    }
  }, [click]); // eslint-disable-line react-hooks/exhaustive-deps
  const joinuser = (gredditid) => {
    joinrequest(gredditid);
  };
  const opengreddit = async (id) => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/countvisitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({gredditid:id}),
    });
    const json = await response.json();
    console.log(json);
    navigate(`/allsubgreddiits/${id}`);
  };

  const joinrejecteduser = async (gredditid) => {
    const newdata = {
      gredditid: gredditid,
    };
    const response = await fetch(
      "http://localhost:3001/api/subgreddiits/jointemprejecteduser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newdata),
      }
    );
    const json = await response.json();
    if (json.error) setalertmsg(json.error);
    else {
      setalertmsg("sentrequest to Moderator");
    }
    setcancelflag(true);
  };

  return (
    <div className="container my-5">
      <Snackbar
        open={request}
        autoHideDuration={6000}
        onClose={() => setrequest(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MuiAlert
          onClose={() => setrequest(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Request sent to Moderator
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={blockflag}
        autoHideDuration={6000}
        onClose={() => setblockflag(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MuiAlert
          onClose={() => setblockflag(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Cannot join !! You have been blocked by moderator
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={leftflag}
        autoHideDuration={6000}
        onClose={() => setleftflag(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MuiAlert
          onClose={() => setleftflag(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Cannot join !! You left the subgreddiits
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={cancelflag}
        autoHideDuration={6000}
        onClose={() => setcancelflag(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MuiAlert
          onClose={() => setcancelflag(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertmsg}
        </MuiAlert>
      </Snackbar>
      <div className="row my-5">
        {tags.length !== 0 &&
          tags.map((tag) => {
            return (
              <div className="col col-md-1">
                <Chip label={tag} onDelete={() => handleDelete(tag)} />
              </div>
            );
          })}
      </div>
      <div className="row">
        <div
          className="col col-md-4 col-sm-12 my-3"
          style={{ textAlign: "center" }}
        >
          <Paper
            component="form"
            sx={{
              p: "4px 6px",
              display: "flex",
              alignItems: "center",
              minWidth: 300,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search SubGreddits"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={onchange}
            />

            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>

        <div
          className="col col-md-4 col-sm-12 my-3 "
          style={{ textAlign: "center" }}
        >
          <TextField
            id="input-with-icon-textfield"
            label="select tag"
            inputRef={tagref}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={addtag}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>

        <div
          className="col col-md-4 col-sm-12 my-3"
          style={{ textAlign: "center" }}
        >
          <TextField
            id="outlined-select-sort"
            select
            label="Sort"
            inputRef={sortref}
            onChange={sortchange}
            defaultValue={"Name Asc"}
          >
            {sorttype.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      ></Stack>
      <div className="row">
        {!greddits && <Buffer />}
        {greddits &&
          greddits.length !== 0 &&
          greddits
            .filter(() => function(greddit){
              
              
              if (searchedword === "") {
                if (tags.length === 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.Tags.includes(tags[i])) return greddit;
                  }
                }
              } else if (
                greddit.Name.toLowerCase().includes(searchedword.toLowerCase())
              ) {
                if (tags.length === 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.Tags.includes(tags[i])) return greddit;
                  }
                }
              }
            }).filter(()=>function(greddit){
              if(greddit.Followers.find((user1)=>{
                return (user1.id===id && user1.status==="accepted")
              }) || greddit.moderatorId===id)return greddit
            })
            .sort(function (a, b) {
              if (st === "Name Asc") {
                return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
              } else if (st === "Name Desc") {
                return b.Name.toLowerCase().localeCompare(a.Name.toLowerCase());
              } else if (st === "FollowerCount") {
                if (a.Followers.length < b.Followers.length) return 1;
                return -1;
              } else {
                if (Number(a.date) > Number(b.date)) return 1;
                return -1;
              }
            })
            .map((greddit) => {
              return (
                <div key={greddit._id} className="col col-md-12 my-3">
                  <Card sx={{ minWidth: 175 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {greddit.Name}
                      </Typography>
                      <Typography variant="body2" className="my-2">
                        {greddit.Description}
                      </Typography>

                      <Typography variant="p" className="my-4" component="div">
                        Banned KeyWords
                      </Typography>
                      <div className="row">
                        {greddit.Banned.length !== 0 &&
                          greddit.Banned.map((word) => {
                            return (
                              <div className="col col-md-1 my-1">
                                <Chip label={word} />
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                    <CardActions>
                      <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={1}
                      >
                        <>
                          <IconButton aria-label="delete">
                            <PeopleAltIcon />
                          </IconButton>
                          <Typography variant="body2">
                            {greddit.Followers.filter(
                              (flwr) => flwr.status === "accepted"
                            ).length + 1}{" "}
                            followers
                          </Typography>
                        </>
                        <>
                          <IconButton aria-label="delete">
                            <MarkAsUnreadIcon />
                          </IconButton>
                          <Typography variant="body2">
                            {greddit.Posts.length} posts
                          </Typography>
                        </>
                        {!greddit.Followers.find((user1) => {
                          return (
                            user1.id === id &&
                            (user1.status === "accepted" ||
                              user1.status === "temprejected" ||
                              user1.status === "blocked" ||
                              user1.status === "requested" ||
                              user1.status === "rejected")
                          );
                        }) &&
                          !(greddit.moderatorId === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              onClick={() => joinuser(greddit._id)}
                              value="sai"
                              color="success"
                            >
                              Join
                            </Button>
                          )}

                        {(greddit.Followers.find((user1) => {
                          return user1.id === id && user1.status === "accepted";
                        }) ||
                          greddit.moderatorId === id) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => opengreddit(greddit._id)}
                          >
                            open
                          </Button>
                        )}

                        {greddit.Followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "requested"
                          );
                        }) &&
                          !(greddit.moderatorId === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              disabled
                            >
                              requested
                            </Button>
                          )}

                        {greddit.Followers.find((user1) => {
                          return user1.id === id && user1.status === "rejected";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setleftflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.Followers.find((user1) => {
                          return user1.id === id && user1.status === "blocked";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setblockflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.Followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "temprejected"
                          );
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => joinrejecteduser(greddit._id)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                      </Stack>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
        {greddits &&
          greddits.length !== 0 &&
          greddits
            .filter(() => function(greddit){
              
              if (searchedword === "") {
                if (tags.length === 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.Tags.includes(tags[i])) return greddit;
                  }
                }
              } else if (
                greddit.Name.toLowerCase().includes(searchedword.toLowerCase())
              ) {
                if (tags.length === 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.Tags.includes(tags[i])) return greddit;
                  }
                }
              }
            }).filter((()=>function(greddit){
              if(greddit.Followers.find((user1)=>{
                return (user1.id===id && user1.status!=="accepted")
              }) && greddit.moderatorId!==id)return greddit
            }))
            .sort(function (a, b) {
              if (st === "Name Asc") {
                return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
              } else if (st === "Name Desc") {
                return b.Name.toLowerCase().localeCompare(a.Name.toLowerCase());
              } else if (st === "FollowerCount") {
                if (a.Followers.length < b.Followers.length) return 1;
                return -1;
              } else {
                if (Number(a.date) > Number(b.date)) return 1;
                return -1;
              }
            })
            .map((greddit) => {
              return (
                <div key={greddit._id} className="col col-md-12 my-3">
                  <Card sx={{ minWidth: 175 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {greddit.Name}
                      </Typography>
                      <Typography variant="body2" className="my-2">
                        {greddit.Description}
                      </Typography>

                      <Typography variant="p" className="my-4" component="div">
                        Banned KeyWords
                      </Typography>
                      <div className="row">
                        {greddit.Banned.length !== 0 &&
                          greddit.Banned.map((word) => {
                            return (
                              <div className="col col-md-1 my-1">
                                <Chip label={word} />
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                    <CardActions>
                      <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={1}
                      >
                        <>
                          <IconButton aria-label="delete">
                            <PeopleAltIcon />
                          </IconButton>
                          <Typography variant="body2">
                            {greddit.Followers.filter(
                              (flwr) => flwr.status === "accepted"
                            ).length + 1}{" "}
                            followers
                          </Typography>
                        </>
                        <>
                          <IconButton aria-label="delete">
                            <MarkAsUnreadIcon />
                          </IconButton>
                          <Typography variant="body2">
                            {greddit.Posts.length} posts
                          </Typography>
                        </>
                        {!greddit.Followers.find((user1) => {
                          return (
                            user1.id === id &&
                            (user1.status === "accepted" ||
                              user1.status === "temprejected" ||
                              user1.status === "blocked" ||
                              user1.status === "requested" ||
                              user1.status === "rejected")
                          );
                        }) &&
                          !(greddit.moderatorId === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              onClick={() => joinuser(greddit._id)}
                              value="sai"
                              color="success"
                            >
                              Join
                            </Button>
                          )}

                        {(greddit.Followers.find((user1) => {
                          return user1.id === id && user1.status === "accepted";
                        }) ||
                          greddit.moderatorId === id) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => opengreddit(greddit._id)}
                          >
                            open
                          </Button>
                        )}

                        {greddit.Followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "requested"
                          );
                        }) &&
                          !(greddit.moderatorId === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              disabled
                            >
                              requested
                            </Button>
                          )}

                        {greddit.Followers.find((user1) => {
                          return user1.id === id && user1.status === "rejected";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setleftflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.Followers.find((user1) => {
                          return user1.id === id && user1.status === "blocked";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setblockflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.Followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "temprejected"
                          );
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => joinrejecteduser(greddit._id)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                      </Stack>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default AllSubGred;
