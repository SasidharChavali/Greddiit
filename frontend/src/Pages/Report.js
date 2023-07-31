import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
//import BlockIcon from "@mui/icons-material/Block";
//import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CancelableButton from "./Cancelinsec";

//const host = "http://localhost:3001";
function Report(props) {
  const ignorereport = async () => {
    //const response = 
    await fetch("http://localhost:3001/api/subgreddiits/ignorereport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.report._id }),
    });
    if (props.flag) {
      props.setflag(false);
    } else props.setflag(true);
  };
  const deletepost = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/deletepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postid: props.report.postid,
        reportid: props.report._id,
      }),
    });
    const json = await response.json();
    // console.log("hey hello")
    console.log(json);
    if (props.flag) {
      props.setflag(false);
    } else props.setflag(true);
  };
  const blockuser = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/blockuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: props.report.reportedUser,
        reportid: props.report._id,
        gredditid: props.report.gredditid,
      }),
    });
    const json = await response.json();
    // console.log("hey hello")
    console.log(json);
    if (props.flag) {
      props.setflag(false);
    } else props.setflag(true);
  };

  const fetchuser = async (id, postedbyflag) => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/getusername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const json = await response.json();
    // console.log("hey hello")
    console.log(json);
    if (postedbyflag) setpostedby(json.username);
    else setreportedby(json.username);
  };
  const fetchpostcontent = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/fetchpostcontent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.report.postid }),
    });
    const json = await response.json();
    // console.log("hey hello")
    console.log(json);
    setpostcontent(json.content);
  };

  const [postedby, setpostedby] = useState(null);
  const [reportedby, setreportedby] = useState(null);
  const [postcontent, setpostcontent] = useState(null);

  useEffect(() => {
    fetchuser(props.report.reportedBy, false);
    fetchuser(props.report.reportedUser, true);
    fetchpostcontent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {postedby && reportedby && postcontent && (
        <div className="my-3">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography gutterBottom variant="h6" color="text.secondary">
                Reported by {reportedby}
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary" variant="h6">
                Post Content:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {postcontent}
              </Typography>
              <Typography gutterBottom variant="h6" color="text.secondary">
                Posted by {postedby}
              </Typography>

              <Typography sx={{ mb: 1 }} color="text.secondary" variant="h6">
                Concern:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.report.Concern}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                disabled={props.report.ignored}
                onClick={deletepost}
              >
                Delete post
              </Button>
              <CancelableButton blockuser={blockuser} report={props.report} />
              <Button
                variant="contained"
                disabled={props.report.ignored}
                onClick={ignorereport}
              >
                Ignore
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
}

export default Report;
