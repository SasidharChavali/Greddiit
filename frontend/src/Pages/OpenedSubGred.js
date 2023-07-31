import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Chip } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import MyPost from "./MyPost"
import Buffer from "DisplayComponents/Buffer"
import PostView from "./PostView";
import {  useSelector } from "react-redux";

function OpenedSubGred() {
  const navigate = useNavigate();
  const [greddit, setgreddit] = useState(null);
  const [user, setuser] = useState(null)
  const id = useSelector((state) => state.user._id);
  const picturePath = useSelector((state) => state.user.picturePath);
  const token = useSelector((state) => state.token);
  const params = useParams();
  const leavegreddit = async (gredditid) => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/leavegreddit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ gredditid: greddit }),
    });
    const json = await response.json();
    
    console.log(json);
    navigate("/allsubgreddiits")
    
  };
  const [addpage, setaddpage] = useState(false)


  const getuser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //body: JSON.stringify({ id: id }),
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.error) alert(json.error);
    else {
      setuser(json)
    }
  };

  const fetchdata = async () => {
    const response = await fetch(`http://localhost:3001/api/subgreddiits/getgredditbyid/${params.subgredId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
     // body: JSON.stringify({ id: params.id }),
    });
    const json = await response.json();
    // console.log("hey hello");
    console.log(json);
    if (!json.error) setgreddit(json);
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchdata();
      getuser()
      console.log(greddit);
    }
  }, [addpage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {(!greddit || !user) && <Buffer/>}
      {greddit && user && (
        <div className="container my-5">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <MyPost subgredId={params.subgredId} picturePath={picturePath} setaddpage={setaddpage} addpage={addpage} />
            <Button variant="contained" color="error" onClick={leavegreddit}   disabled={greddit.moderatorId===user._id}>
              Exit
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
              <AssignmentIcon  color="primary"/>
            <h3>{greddit.Name}</h3>
          </Stack>
          <p className="my-4">{greddit.Description}</p>
          <h3>Tags</h3>
          <div className="row">
            {greddit.Tags.map((tag) => {
              return (
                <div className="col col-md-1 my-1">
                  <Chip label={tag} variant="outlined" />
                </div>
              );
            })}
          </div>
          <h3 className="my-4">Banned Words</h3>
          <div className="row">
            {greddit.Banned.map((word) => {
              return (
                <div className="col col-md-1 my-1">
                  <Chip label={word} variant="outlined" />
                </div>
              );
            })}
          </div>
          <div className="row">
            {
              (greddit.Posts.length!==0) && (
                greddit.Posts.map((post)=>{
                  return (
                    <div className="col col-md-12 my-4">
                      <PostView id={post}/>
                    </div>
                  )
                })
              )
            }
          </div>


        </div>
      )}
    </>
  );
}

export default OpenedSubGred;
