import React from "react";
import { 
  Avatar,
  ListItem, 
  ListItemText,
  Stack, 
  Button,
  ListItemButton,
  ListItemAvatar
 } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";
import { useSelector} from "react-redux";

function Sgfollowers(props) {
  const [user, setuser] = useState(null);
  const token = useSelector((state) => state.token);

  const acceptreq = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/acceptrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gredditid: props.greddit._id,
        userid: props.id.id,
      }),
    });
    const json = await response.json();
    // console.log("hey hello");
    if (props.flag) props.setflag(false);
    else props.setflag(true);
    console.log(json);
    if (json.error) alert(json.error);
  };
  const rejectreq = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/cancelrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gredditid: props.greddit._id,
        userid: props.id.id,
      }),
    });
    const json = await response.json();
    // console.log("hey hello");
    if (json.error) alert(json.error);
    if (props.flag) props.setflag(false);
    else props.setflag(true);
    console.log(json);
  };

  const getconnection = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${props.id.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //body: JSON.stringify({ id: props.id }),
    });
    const json = await response.json();
    setuser(json);
  };
  useEffect(() => {
    
    getconnection();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {user && (
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.userName}
              secondary={
                <>
                  {props.id.status === "requested" && (
                    <React.Fragment>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          onClick={acceptreq}
                        >
                          Accept
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={rejectreq}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </React.Fragment>
                  )}
                </>
              }
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
}

export default Sgfollowers;
