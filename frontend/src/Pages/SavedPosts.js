import React from "react";
import PostView from "./PostView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Buffer from "DisplayComponents/Buffer"
import { useSelector} from "react-redux";

function Savedposts() {
  const [posts, setposts] = useState(null);
  const id = useSelector((state) => state.user._id);
  const [savedpostflag, setsavedpostflag] = useState(false);
  const token = useSelector((state) => state.token);
  const fetchuser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    setposts(json.savedposts);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchuser();
    }
  }, [savedpostflag]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {
        posts && (posts.length===0) && (
            <div className="container my-5">
                <h5>No Saved Posts</h5>
            </div>
        )
    }
    {!posts && <Buffer/> }
      {posts  && (
        <div className="container my-5">
          <div className="row">
            {posts.map((post) => {
              return (
                <div className="col col-md-12 my-4">
                  <PostView id={post}  savedpostflag={savedpostflag} setsavedpostflag={setsavedpostflag}/>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Savedposts;
