import { 
  IconButton,
  Typography, 
  Stack,
  Chip
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import WidgetWrapper from "DisplayComponents/WidgetWrapper";
import {  useSelector } from "react-redux";
import { //useState, 
  useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import UserImage from "DisplayComponents/UserImage";

const SubGred = ({
  subgredId,
  subgredUserId,
  name,
  description,
  picturePath,
  tags,
  banned,
  Followers,
  Posts,
}) => {
  
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const gredditid = subgredId;
  //const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const DeleteSubGred = async () => {
    return fetch("http://localhost:3001/api/subgreddiits/deletegreddit", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
         id: gredditid,
         userId: loggedInUserId,
       }),
    })
      .then(response => { return response.json() })
      .catch(err => console.log(err))
  };
  
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${loggedInUserId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    //console.log(data);
    //setUser(data);
  };
  const handlenav=(subgredId)=>{
    const url=`/mysubgreddiits/${subgredId}`;
    console.log("hello! This is from handlenav function.")
    navigate(url, {
        state: {
        subgredId: subgredId,
      }
    });
}
useEffect(() => {
  getUser();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <WidgetWrapper m="2rem 0">
      {/* <UserImage image={user.picturePath} /> */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/api/assets/${picturePath}`}
        />
      )}
      <div key={subgredId} className="col col-md-4 my-3">
                <Card sx={{ minWidth: 275 }} >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography variant="body2" className="my-2">
                      {description}
                    </Typography>
                    <Typography variant="p" className="my-4" component="div">
                      Tags
                    </Typography>
                    <div className="row">
                      {tags.length !== 0 &&
                        tags.map((word) => {
                          return (
                            <div className="col col-md-4 my-1">
                              <Chip label={word} />
                            </div>
                          );
                        })}
                    </div>
                    <Typography variant="p" className="my-4" component="div">
                      Banned KeyWords
                    </Typography>
                    <div className="row">
                      {banned.length !== 0 &&
                        banned.map((word) => {
                          return (
                            <div className="col col-md-4 my-1">
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
                        {Followers.filter((flwr)=>flwr.status==="accepted").length+1} Followers
                        </Typography>
                      </>
                      <>
                        <IconButton aria-label="delete">
                          <MarkAsUnreadIcon />
                        </IconButton>
                        <Typography variant="body2">
                          {Posts.length} Posts
                        </Typography>
                        <IconButton aria-label="delete" size="large"  className="mx-3 " onClick={DeleteSubGred} >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete">
                        <ExpandMoreIcon  onClick={()=>handlenav(subgredId)} />
                        </IconButton>
                         
                      </>
                    </Stack>
                  </CardActions>
                </Card>
              </div>
    </WidgetWrapper>
  );
};

export default SubGred;
