import React from "react";
import { useState,useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { 
    Avatar,
    Button,
    ListItemButton,
    ListItemAvatar, 
    ListItemText,   
    ListItem,
} from "@mui/material";

function Anotheruser(props) {
  const [user, setuser] = useState(null);
  const token = useSelector((state) => state.user.token);
  //const id = useSelector((state) => state.user._id);
  const getconnection = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //body: JSON.stringify({ id: props.id }),
    });
    const json = await response.json();
    console.log(json);
    setuser(json);
  };
  const removefollower=async()=>{
    const newnote = {
     id:user._id
    };
    // api call
    const response = await fetch("http://localhost:3001/api/users/removefollower", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       
      },
      body: JSON.stringify(newnote),
    });
    const json = await response.json();
    console.log(json)
    if(!json.error){
      window.location.reload();
    }
  }
  const removefollowing=async()=>{
    const newnote = {
      id:user._id
     };
     // api call
     const response = await fetch("http://localhost:3001/api/users/removefollowing", {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
        
       },
       body: JSON.stringify(newnote),
     });
     const json = await response.json();
     console.log(json)
     if(!json.error){
       window.location.reload();
     }

  }
  useEffect(() => {
    getconnection();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {user && (
        <ListItem disableGutters>
          <ListItemButton key={user._id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText  className="mx-3" primary={user.username} />
            {
              (props.connectiontype==="follower")?(
                <Button variant="contained" className="mx-3" onClick={removefollower}>Remove</Button>

              ):(
                <Button variant="contained" className="mx-3" onClick={removefollowing}>Unfollow</Button>
              )
            }
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
}

export default Anotheruser;
