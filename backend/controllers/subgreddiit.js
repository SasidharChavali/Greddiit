import Post from "../models/Post.js";
import User from "../models/User.js";
import SubGreddiit from "../models/SubGreddiit.js";
import Report from "../models/Report.js";
import { verifyToken } from "../middleware/auth.js";

export const createSubGred = async (req, res) => {
  // check if same name subgreddit exits
  SubGreddiit.findOne({ Name: req.body.name }, (err, results) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "Error in finding" });
    else if (results) {
      return res.send({ error: "Subgreddiit exists with same name" });
    } else {
      const subgred = new SubGreddiit({
        moderatorId: req.body.moderatorId,
        Name: req.body.Name,
        Description: req.body.Description,
        picturePath: req.body.picturePath,
        Tags: req.body.Tags,
        Banned: req.body.Banned,
        Followers: [],
        Posts: [],
        creationDate: Date.now(),
      });
      subgred.save().then((result) => {
        res.send(result);
      });
    }
  });
};

export const AsktoJoin =  async (req, res) => {
  const gredditid = req.body.gredditid;
  const userid = req.user.id;
  User.findById({ _id: userid }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "error in finding findbyid" });
    else if (!result) return res.send({ error: "no such user found" });
    else {
      const newjoinedSubs = [].concat(result.joinedSubs, {
        id: gredditid,
        status: "requested",
      });

      const newuserdata = {
        joinedSubs: newjoinedSubs,
      };
      User.findByIdAndUpdate(
        { _id: userid },
        { $set: newuserdata },
        { new: true },
        (err, result) => {
          if (err && Object.keys(err).length)
            return res.send({
              error: "Error in finding in findingbyIdandupdate",
            });
        }
      );
    }
    SubGreddiit.findById({ _id: gredditid }, (err, result) => {
      if (err && Object.keys(err).length)
        return res.send({ error: "Error in finding" });
      else if (!result) return res.send({ error: "No such greddit found" });
      else {
        const newFollowers = [].concat(result.Followers, {
          id: userid,
          status: "requested",
        });
        const newgredditdata = {
          Followers: newFollowers,
        };
        SubGreddiit.findByIdAndUpdate(
          { _id: gredditid },
          { $set: newgredditdata },
          { new: true },
          (error, result) => {
            if (error && Object.keys(error).length)
              return res.send({
                error: "error in finding in findingbyIdandupdate",
              });
            else {
              return res.send(result);
            }
          }
        );
      }
    });
  });
};

export const LeaveSubGreddiit = async (req, res) => {
  const gredditid = req.body.gredditid;
  const userid = req.user.id;
  User.findById({ _id: userid }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "error in finding findbyid" });
    else if (!result) return res.send({ error: "no such user found" });
    else {
      const newjoinedSubs = result.joinedSubs.filter((greddit) => {
        return greddit.id == gredditid;
      });
      newjoinedSubs = [].concat(newjoinedSubs, {
        id: gredditid,
        status: "rejected",
        exiteddate: Date.now(),
      });
      const newuserdata = {
        joinedSubs: newjoinedSubs,
      };
      User.findByIdAndUpdate(
        { _id: userid },
        { $set: newuserdata },
        { new: true },
        (error, result) => {
          if (error && Object.keys(error).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
        }
      );
    }
    SubGreddiit.findById(gredditid, (err, result) => {
      if (err && Object.keys(err).length)
        return res.send({ error: "error in finding" });
      else if (!result) return res.send({ error: "no such greddit found" });
      else {
        const newFollowers = result.Followers.filter((user1) => {
          if (user1.id !== userid) return 1;
          return 0;
        });
        newFollowers = [].concat(newFollowers, {
          id: userid,
          status: "rejected",
        });
        console.log(newFollowers);
        const newgredditdata = {
          Followers: newFollowers,
        };
        SubGreddiit.findByIdAndUpdate(
          gredditid,
          { $set: newgredditdata },
          { new: true },
          (error, result) => {
            if (error && Object.keys(error).length)
              return res.send({
                error: "error in finding in findingbyIdandupdate",
              });
            else {
              return res.send(result);
            }
          }
        );
      }
    });
  });
};

export const deleteSubGreddiit = async (req, res) => {
  //first check which user is updating the given notes id
  SubGreddiit.findById({ _id: req.body.id }, (err, result) => {
    if (err && Object.keys(err).length) 
      return res.send({ error: err });
    if (result.moderatorId.toString() !== req.body.userId) {
      return res.send({ error: "permission rejected" });
    } else {
      SubGreddiit.findByIdAndDelete({ _id: req.body.id }, (err, result) => {
        if (err && Object.keys(err).length) 
          return res.send({ error: err });
        else {
          return res.send({ Message: "deletion success" });
        }
      });
    }
  });
};

export const getFeedSubGreddiits = async (req, res) => {
  SubGreddiit.find({}, (err, results) => {
    if (err && Object.keys(err).length)
      res.send({ error: "Error in fetching all greddits" });
    else {
      return res.send(results);
    }
  });
};

export const getSubGreddiit = async (req, res) => {
  SubGreddiit.findById({ _id: req.params.id }, (err, results) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "error in fetching greddit by id" });
    else {
      return res.send(results);
    }
  });
};

export const getUserSubGreddiits = async (req, res) => {
  SubGreddiit.find({ moderatorId: req.params.id }, (err, results) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "error in fetching greddits" });
    else {
      return res.send(results);
    }
  });
};

export const GetPost = async (req, res) => {
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "error in findingbyid" });
    else if (!result) 
      return res.send({ error: "error" });
    else {
      User.findById({ _id: result.postedBy }, (error, results) => {
        if (error && Object.keys(error).length)
          return res.send({ error: "error in finding" });
        else {
          let newresult = result;
          newresult = newresult.toJSON();
          newresult.username = results.username;
          if (newresult.isblocked) {
            newresult.username = "Blocked User";
          }
          return res.send(newresult);
        }
      });
    }
  });
};

export const createPost = async (req, res) => {
  
  const gredditid = req.body.postedIn;
  const userid = req.body.postedBy;
  // first create post then update the subgreddit in which it is posted
  // assuming same data posts can  exist
  
  SubGreddiit.findById(gredditid, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({ error: "Error in finding id" });
    else {
      const alert = false;
      for (let i = 0; i < result.Banned.length; i++) {
        const regex = new RegExp(result.Banned[i], "i");
        console.log(regex);
        if (req.body.text.match(regex)) {
          alert = true;
          break;
        }
      }
      console.log(req.body.text);
      let newtext = req.body.text;
      for (let i = 0; i < result.Banned.length; i++) {
        const regex = new RegExp(result.Banned[i], "ig");
        let replacedstr = "";
        for (let j = 0; j < result.Banned[i].length; j++)
          replacedstr += "*";
        newtext = newtext.replace(regex, replacedstr);
      }

      const newpost = new Post({
        text: newtext,
        postedBy: userid,
        postedIn: gredditid,
        picturePath: req.body.picturePath,
        //creationdate: Date.now(),
        upvotes: [],
        downvotes: [],
        comments: [],
      });

      newpost.save().then((results) => {
        // link it with greddit
        SubGreddiit.findById({ _id: gredditid }, (err, res1) => {
          if (err && Object.keys(err).length)
            return res.send({ error: "Error in finding by id" });
          else if (!res1) {
            return res.send({ error: "No such greddit" });
          } else {
            const newposts = [].concat(res1.Posts, results._id);
            const newgredditdata = {
              Posts: newposts,
            };
            SubGreddiit.findByIdAndUpdate(
              { _id: gredditid },
              { $set: newgredditdata },
              { new: true },
              (error, result) => {
                if (error && Object.keys(error).length)
                  return res.send({
                    error: "Error in finding in findingbyIdandupdate",
                  });
                else {
                  const resultData = result.toJSON();
                  resultData.alert = alert;
                  return res.send(resultData);
                }
              }
            );
          }
        });
      });
    }
  });
};

export const postComment = async (req, res) => {
  const userid = req.user.id;
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    User.findById(userid, (err4, result4) => {
      if (err4 && Object.keys(err4).length) return res.send({ error: "error" });
      else {
        const newcomments = [].concat(result.comments, {
          username: result4.userName,
          userid: userid,
          comment: req.body.comment,
        });
        const newpost = {
          comments: newcomments,
        };
        Post.findByIdAndUpdate(
          { _id: postid },
          { $set: newpost },
          { new: true },
          (error, result) => {
            if (error && Object.keys(error).length)
              return res.send({
                error: "Error in finding in findingbyIdandupdate",
              });
            else {
              return res.send(result);
            }
          }
        );
      }
    });
  });
};

export const likePost = async (req, res) => {
  const userid = req.user.id;
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    if (result.upvotes.includes(userid)) {
      return res.send({ error: "already liked" });
    } else {
      let newlikes = [].concat(result.upvotes, userid);
      const newpost = {
        upvotes: newlikes,
      };
      Post.findByIdAndUpdate(
        { _id: postid },
        { $set: newpost },
        { new: true },
        (err1, result1) => {
          if (err1 && Object.keys(err1).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
          else {
            // console.log("cool")
            return res.send(result1);
          }
        }
      );
    }
  });
};

export const removelikePost = async (req, res) => {
  const userid = req.user.id;
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    let newlikes = result.upvotes.filter((id) => id !== userid);
    const newpost = {
      upvotes: newlikes,
    };
    Post.findByIdAndUpdate(
      { _id: postid },
      { $set: newpost },
      { new: true },
      (err1, result1) => {
        if (err1 && Object.keys(err1).length)
          return res.send({
            error: "error in finding in findingbyIdandupdate",
          });
        else {
          // console.log("cool")
          return res.send(result1);
        }
      }
    );
  });
};

export const dislikePost = async (req, res) => {
  const userid = req.user.id;
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    if (result.downvotes.includes(userid)) {
      return res.send({ error: "already liked" });
    } else {
      let newlikes = [].concat(result.downvotes, userid);
      const newpost = {
        downvotes: newlikes,
      };
      Post.findByIdAndUpdate(
        { _id: postid },
        { $set: newpost },
        { new: true },
        (err1, result1) => {
          if (err1 && Object.keys(err1).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
          else {
            // console.log("cool")
            return res.send(result1);
          }
        }
      );
    }
  });
};

export const removedislikePost = async (req, res) => {
  const userid = req.user.id;
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    let newlikes = result.downvotes.filter((id) => id !== userid);
    const newpost = {
      downvotes: newlikes,
    };
    Post.findByIdAndUpdate(
      { _id: postid },
      { $set: newpost },
      { new: true },
      (err1, result1) => {
        if (err1 && Object.keys(err1).length)
          return res.send({
            error: "error in finding in findingbyIdandupdate",
          });
        else {
          // console.log("cool")
          return res.send(result1);
        }
      }
    );
  });
};

export const AcceptRequest = async (req, res) => {
  const userid = req.body.userid;
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (error, result) => {
    if (error && Object.keys(error).length) return res.send({ error: "error1" });
    else if (!result) 
      return res.send({ error: "no such greddit" });
    else {
      let newFollowers = result.Followers.filter((follower) => {
        if (follower.id !== userid || follower.status !== "requested")
          return follower;
      });
      newFollowers = [].concat(newFollowers, {
        id: userid,
        status: "accepted",
        accepteddate: Date.now(),
        exiteddate: "NA",
      });
      const newdata = {
        Followers: newFollowers,
      };
      SubGreddiit.findByIdAndUpdate(
        { _id: gredditid },
        { $set: newdata },
        { new: true },
        (err2, result2) => {
          if (err2 && Object.keys(err2).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
          else {
            User.findById({ _id: userid }, (err3, result3) => {
              if (err3 && Object.keys(err3).length)
                return res.send({ error: "error2" });
              else {
                let newFollowers = result3.joinedSubs.filter(
                  (follower) => {
                    if (
                      follower.id !== userid ||
                      follower.status !== "requested"
                    )
                      return follower;
                  }
                );
                newFollowers = [].concat(newFollowers, {
                  id: userid,
                  accepteddate: Date.now(),
                  exiteddate: "NA",
                  status: "accepted",
                });
                const newdata = {
                  joinedSubs: newFollowers,
                };
                User.findByIdAndUpdate(
                  { _id: userid },
                  { $set: newdata },
                  { new: true },
                  (err4, result4) => {
                    if (err4 && Object.keys(err4).length)
                      return res.send({
                        error: "Error in finding in findingbyIdandupdate",
                      });
                    else {
                      res.send(result4);
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
};

export const JoinTempRejectedUser = (req, res) => {
  const gredditid = req.body.gredditid;
  const userid = req.user.id;
  SubGreddiit.findById(gredditid, (err, result) => {
    let date = null;
    result.Followers.find((user1) => {
      if (user1.id == userid) {
        date = user1.date;
      }
    });
    date = Number(date);
    if (Date.now() - date >= 604800000) {
      SubGreddiit.findById(gredditid, (error, result) => {
        if (error && Object.keys(error).length)
          return res.send({ error: "error1" });
        else if (!result) 
            return res.send({ error: "no such greddit" });
        else {
          let newFollowers = result.Followers.filter((follower) => {
            if (follower.id !== userid || follower.status !== "temprejected")
              return follower;
            // if (follower.id !== userid || follower.status !== "temprejected")
            //   return follower;
          });
          newFollowers = [].concat(newFollowers, {
            id: userid,
            accepteddate: Date.now(),
            status: "requested",
          });
          const newdata = {
            Followers: newFollowers,
          };
          SubGreddiit.findByIdAndUpdate(
            { _id: gredditid },
            { $set: newdata },
            { new: true },
            (err2, result2) => {
              if (err2 && Object.keys(err2).length)
                return res.send({
                  error: "error in finding in findingbyIdandupdate",
                });
              else {
                // console.log("cool")
                // return res.send(result);
                User.findById({ _id: userid }, (err3, result3) => {
                  if (err3 && Object.keys(err3).length)
                    return res.send({ error: "error2" });
                  else {
                    let newFollowers = result3.joinedSubs.filter(
                      (follower) => {
                        if (
                          follower.id !== userid ||
                          follower.status !== "temprejected"
                        )
                          return follower;
                      }
                    );
                    newFollowers = [].concat(newFollowers, {
                      id: userid,
                      status: "requested",
                    });
                    const newdata = {
                      joinedSubs: newFollowers,
                    };
                    User.findByIdAndUpdate(
                      { _id: userid },
                      { $set: newdata },
                      { new: true },
                      (err4, result4) => {
                        if (err4 && Object.keys(err4).length)
                          return res.send({
                            error: "error in finding in findingbyIdandupdate",
                          });
                        else {
                          res.send(result4);
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        }
      });
    } else {
      return res.send({
        error: `you can send join request after ${Math.ceil(
          (604800000 - (Date.now() - date)) / (3600000 * 24)
        )} days`,
      });
    }
  });
};

export const CancelRequest = async (req, res) => {
  const userid = req.body.userid;
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (error, result) => {
    if (error && Object.keys(error).length) 
      return res.send({ error: "error1" });
    else if (!result) return res.send({ error: "no such greddit" });
    else {
      let newFollowers = result.Followers.filter((follower) => {
        if (follower.id !== userid || follower.status !== "requested")
          return follower;
      });
      newFollowers = [].concat(newFollowers, {
        id: userid,
        status: "temprejected",
      });
      const newdata = {
        Followers: newFollowers,
      };
      SubGreddiit.findByIdAndUpdate(
        { _id: gredditid },
        { $set: newdata },
        { new: true },
        (err2, result2) => {
          if (err2 && Object.keys(err2).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
          else {
            User.findById({ _id: userid }, (err3, result3) => {
              if (err3 && Object.keys(err3).length)
                return res.send({ error: "error2" });
              else {
                let newFollowers = result3.joinedSubs.filter(
                  (follower) => {
                    if (
                      follower.id !== userid ||
                      follower.status !== "requested"
                    )
                      return follower;
                  }
                );
                newFollowers = [].concat(newFollowers, {
                  id: userid,
                  status: "temprejected",
                });
                const newdata = {
                  joinedSubs: newFollowers,
                };
                User.findByIdAndUpdate(
                  { _id: userid },
                  { $set: newdata },
                  { new: true },
                  (err4, result4) => {
                    if (err4 && Object.keys(err4).length)
                      return res.send({
                        error: "error in finding in findingbyIdandupdate",
                      });
                    else {
                      res.send(result4);
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
};

export const SavePost = async (req, res) => {
  const postid = req.body.postid;
  const userid = req.user.id;
  User.findById(userid, (err, result) => {
    if (err && Object.keys(err).length) 
      return res.send({ error: "error" });
    else if (!result) return res.send({ error: "no such user" });
    if (result.savedposts.includes(postid)) {
      return res.send({ error: "already saved" });
    } else {
      let newsavedposts = [].concat(result.savedposts, postid);
      let newdata = {
        savedposts: newsavedposts,
      };
      User.findByIdAndUpdate(
        { _id: userid },
        { $set: newdata },
        { new: true },
        (err4, result4) => {
          if (err4 && Object.keys(err4).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
          else {
            res.send(result4);
          }
        }
      );
    }
  });
};

export const UnSavePost = async (req, res) => {
  const postid = req.body.postid;
  const userid = req.user.id;
  User.findById(userid, (err, result) => {
    if (err && Object.keys(err).length) return res.send({ error: "error" });
    else if (!result) return res.send({ error: "no such user" });
    if (!result.savedposts.includes(postid)) {
      return res.send({ error: "not saved yet" });
    } else {
      let newsavedposts = result.savedposts.filter((post) => post !== postid);
      let newdata = {
        savedposts: newsavedposts,
      };
      User.findByIdAndUpdate(
        { _id: userid },
        { $set: newdata },
        { new: true },
        (err4, result4) => {
          if (err4 && Object.keys(err4).length)
            return res.send({
              error: "error in finding in findingbyIdandupdate",
            });
          else {
            res.send(result4);
          }
        }
      );
    }
  });
};

export const AcceptRejectedUser = async (req, res) => {
  const userid = req.body.userid;
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (error, result) => {
    if (error && Object.keys(error).length) return res.send({ error: "error1" });
    else if (!result) return res.send({ error: "no such greddit" });
    else {
      let creationdate;
      result.Followers.find((follower) => {
        if (follower.id !== userid || follower.status !== "temprejected") {
          creationdate = follower.date;
          return follower;
        }
      });

      creationdate = Number(creationdate);
      let currenttime = Date.now();
      console.log(creationdate);
      console.log(currenttime);
      if (currenttime - creationdate >= 2) {
        newFollowers = [].concat(newFollowers, {
          id: userid,
          status: "requested",
        });
        const newdata = {
          Followers: newFollowers,
        };
        SubGreddiit.findByIdAndUpdate(
          { _id: gredditid },
          { $set: newdata },
          { new: true },
          (err2, result2) => {
            if (err2 && Object.keys(err2).length)
              return res.send({
                error: "error in finding in findingbyIdandupdate",
              });
            else {
              User.findById({ _id: userid }, (err3, result3) => {
                if (err3 && Object.keys(err3).length)
                  return res.send({ error: "error2" });
                else {
                  let newFollowers = result3.joinedSubs.filter(
                    (follower) => {
                      if (
                        follower.id !== userid ||
                        follower.status !== "requested"
                      )
                        return follower;
                    }
                  );
                  newFollowers = [].concat(newFollowers, {
                    id: userid,
                    status: "accepted",
                  });
                  const newdata = {
                    joinedSubs: newFollowers,
                  };
                  User.findByIdAndUpdate(
                    { _id: userid },
                    { $set: newdata },
                    { new: true },
                    (err4, result4) => {
                      if (err4 && Object.keys(err4).length)
                        return res.send({
                          error: "error in finding in findingbyIdandupdate",
                        });
                      else {
                        res.send(result4);
                      }
                    }
                  );
                }
              });
            }
          }
        );
      } else {
        res.send({
          error: "You cannot join now try some other time",
        });
      }
    }
  });
};

export const CreateReport = async (req, res) => {
  const postedBy = req.body.postedBy;
  const reportedBy = req.user.id;
  const gredditid = req.body.gredditid;
  const Concern = req.body.Concern;
  const postid = req.body.postid;
  // cannot report urself
  if (postedBy == reportedBy) {
    return res.send({ error: "cannot report yourself" });
  } else {
    // cannot report the moderator
    SubGreddiit.findById(gredditid, (err, result) => {
      if (result.moderatorId == postedBy) {
        return res.send({ error: "cannot report moderator" });
      } else {
        // post id and reported user must be unique
        let newreportcreations = [].concat(result.reportcreations, Date.now());
        SubGreddiit.findByIdAndUpdate(
          gredditid,
          { reportcreations: newreportcreations },
          (err, ress) => {
            Report.findOne(
              {
                reportedBy: postedBy,
                reportedUser: reportedBy,
                postid: postid,
              },
              (err, results) => {
                if (results) {
                  console.log(results);
                  // res.send(results)
                  return res.send({ error: "already reported" });
                } else {
                  const report1 = new Report({
                    reportedBy: reportedBy,
                    reportedUser: postedBy,
                    gredditid: gredditid,
                    Concern: Concern,
                    postid: postid,
                  });
                  report1.save().then((resu) => {
                    res.send(resu);
                  });
                }
              }
            );
          }
        );
      }
    });
  }
};

export const GetReports = async (req, res) => {
  Report.find({ gredditid: req.params.id }, (err, result) => {
    const newresult=[];
    for(let i=0;i<result.length;i++){
      const creationtime=Number(result[i].date);
      const currenttime=Date.now();
      if(currenttime-creationtime<=5000){
        newresult.push(result[i]);
      }
      else{
        Report.findByIdAndDelete(result[i]._id,(err,scc)=>{
          console.log(" ");
        })
      }
    }
    return res.send(newresult);
  });
};

export const BlockUser = async (req, res) => {
  // check who is blocking the user
  const blockuser = req.body.user;
  const gredditid = req.body.gredditid;
  const reportid = req.body.reportid;
  await Post.updateMany(
    { postedBy: blockuser, postedIn: gredditid },
    { isblocked: true }
  );
  await Report.findByIdAndUpdate(reportid, { isblocked: true });
  const greddit = await SubGreddiit.findById(gredditid);
  let gredditfollowers = greddit.followers.filter(
    (user1) => user1.id != blockuser
  );
  gredditfollowers = [].concat(gredditfollowers, {
    id: blockuser,
    status: "blocked",
    exiteddate: Date.now(),
  });
  await SubGreddiit.findByIdAndUpdate(gredditid, {
    Followers: gredditfollowers,
  });
};

export const GetUserName =  async (req, res) => {
  User.findById(req.body.id, (err, result) => {
    res.send({ username: result.userName });
  });
};
export const FetchPostContent = async (req, res) => {
  Post.findById(req.body.id, (err, result) => {
    res.send({ content: result.text });
  });
};

export const IgnoreReport = async (req, res) => {
  Report.findByIdAndUpdate(req.body.id, { ignored: true }, (err, result) => {
    return res.send(result);
  });
};

export const DeletePost = async (req, res) => {
  const reportid = req.body.reportid;
  const postid = req.body.postid;
  SubGreddiit.find({}, (err, results) => {
    for (let i = 0; i < results.length; i++) {
      const subid = results[i]._id;
      SubGreddiit.findById(subid, (err, results1) => {
        const newposts = results1.Posts.filter((postid1) => postid1 !== postid);
        SubGreddiit.findByIdAndUpdate(
          subid,
          { Posts: newposts },
          (err, results2) => {
            console.log("done");
          }
        );
      });
    }
  });
  
  User.find({}, (err, results) => {
    for (let i = 0; i < results.length; i++) {
      const userid = results[i]._id;
      User.findById(userid, (err, results1) => {
        let newsavedposts = results1.savedposts.filter(
          (postid1) => postid1 !== postid
        );
        User.findByIdAndUpdate(
          userid,
          { savedposts: newsavedposts },
          (err, results2) => {}
        );
      });
    }
  });
  Post.findById(postid,(err,resul)=>{
    const gredditid=resul.gredditid;
    SubGreddiit.findById(gredditid,(err,sbgreddit)=>{
      let deleteposts=[].concat(sbgreddit.reportdeletions,Date.now())
      SubGreddiit.findByIdAndUpdate(gredditid,{reportdeletions:deleteposts},(err,resull)=>[
        console.log("hello")
      ])  
    })
  })
  Post.findByIdAndDelete(postid, (err, result) => {
    console.log("post deleted");
  });
  Report.findByIdAndDelete(reportid, (err, result) => {
    return res.send(result);
  });
};

export const UserGrowth = async (req, res) => {
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (err, results) => {
    // let followers = results.followers;
    let starttime = Number(results.date);
    let endtime = Date.now();
    let startdate = new Date(starttime);
    let enddate = new Date(endtime);
    // console.log(enddate.toLocaleDateString())
    const data = [];
    let currentdate = startdate;
    while (
      currentdate <= enddate ||
      currentdate.toDateString() == enddate.toDateString()
    ) {
      let cnt = 0;
      for (let i = 0; i < results.Followers.length; i++) {
        console.log(results.Followers[i].accepteddate);
        console.log(results.Followers[i].exiteddate);
        if (
          results.Followers[i].exiteddate === "NA" &&
          results.Followers[i].accepteddate === "NA"
        ) {
          let accepteddate = new Date(
            Number(results.Followers[i].accepteddate)
          );
          let rejecteddate = new Date(Number(results.Followers[i].exiteddate));
          if ((accepteddate <= currentdate||
            accepteddate.toDateString() == currentdate.toDateString()) && (currentdate <= rejecteddate ||
            rejecteddate.toDateString() == currentdate.toDateString())){
            cnt++;
          }
        } else if (
          results.Followers[i].exiteddate === "NA" &&
          results.Followers[i].accepteddate !== "NA"
        ) {
          let accepteddate = new Date(
            Number(results.Followers[i].accepteddate)
          );
          if (accepteddate <= currentdate ||
            accepteddate.toDateString() == currentdate.toDateString()) {
            cnt++;
          }
        }
      }
      currentdate = new Date(currentdate);
      var year = currentdate.toLocaleString("default", { year: "numeric" });
      var month = currentdate.toLocaleString("default", { month: "2-digit" });
      var day = currentdate.toLocaleString("default", { day: "2-digit" });
      var formattedDate = year + "-" + month + "-" + day;
      let data1 = {
        date: formattedDate,
        users: cnt,
      };
      data.push(data1);
      currentdate.setDate(currentdate.getDate() + 1);
    }
    console.log(currentdate);
    console.log(enddate);
    return res.send(data);
  });
};

export const PostsGrowth = async (req, res) => {
  const gredditid = req.body.gredditid;
  Post.find({ postedIn: gredditid }, (err, results) => {
    SubGreddiit.findById(gredditid, (err, greddit) => {
      let starttime = Number(greddit.creationdate);
      let endtime = Date.now();
      let startdate = new Date(starttime);
      let enddate = new Date(endtime);
      console.log(startdate);
      console.log(enddate);
      // console.log(enddate.toLocaleDateString())
      const data = [];
      let currentdate = startdate;
      while (
        currentdate <= enddate ||
        currentdate.toDateString() == enddate.toDateString()
      ) {
        let cnt = 0;
        for (let i = 0; i < results.length; i++) {
          let creationdate = new Date(Number(results[i].creationdate));
          if (creationdate <= currentdate ||
            creationdate.toDateString() == currentdate.toDateString()) {
            cnt++;
          }
        }

        currentdate = new Date(currentdate);
        var year = currentdate.toLocaleString("default", { year: "numeric" });
        var month = currentdate.toLocaleString("default", { month: "2-digit" });
        var day = currentdate.toLocaleString("default", { day: "2-digit" });
        var formattedDate = year + "-" + month + "-" + day;
        let data1 = {
          date: formattedDate,
          posts: cnt,
        };
        data.push(data1);
        currentdate.setDate(currentdate.getDate() + 1);
      }
      return res.send(data);
    });
  });
};

export const VisitorsGrowth = async (req, res) => {
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (err, results) => {
    console.log(results);
    let starttime = Number(results.creationdate);
    let endtime = Date.now();
    let startdate = new Date(starttime);
    let enddate = new Date(endtime);
    const data = [];
    let currentdate = startdate;
    while (
      currentdate <= enddate ||
      currentdate.toDateString() == enddate.toDateString()
    ) {
      let cnt = 0;
      for (let i = 0; i < results.visitors.length; i++) {
        let creationdate = new Date(Number(results.visitors[i].date));
        if (creationdate <= currentdate ||
          creationdate.toDateString() == currentdate.toDateString()) {
          cnt++;
        }
      }
      currentdate = new Date(currentdate);
      var year = currentdate.toLocaleString("default", { year: "numeric" });
      var month = currentdate.toLocaleString("default", { month: "2-digit" });
      var day = currentdate.toLocaleString("default", { day: "2-digit" });
      var formattedDate = year + "-" + month + "-" + day;
      let data1 = {
        date: formattedDate,
        visitors: cnt,
      };
      data.push(data1);
      currentdate.setDate(currentdate.getDate() + 1);
    }
    return res.send(data);
  });
};


export const ReportedPostsGrowth = async (req, res) => {
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (err, results) => {
    console.log(results);
    let starttime = Number(results.creationdate);
    let endtime = Date.now();
    let startdate = new Date(starttime);
    let enddate = new Date(endtime);
    const data = [];
    let currentdate = startdate;
    while (
      currentdate <= enddate ||
      currentdate.toDateString() == enddate.toDateString()
    ) {
      let cnt1 = 0;
      for (let i = 0; i < results.reportcreations.length; i++) {
        let creationdate = new Date(Number(results.reportcreations[i]));
        console.log("creation")
        console.log(creationdate)
        console.log("deletion")
        console.log(currentdate)
        if (creationdate <= currentdate ||
          creationdate.toDateString() == currentdate.toDateString()) {
          cnt1++;
        }
      }
      let cnt2 = 0;
      for (let i = 0; i < results.reportdeletions.length; i++) {
        let creationdate = new Date(Number(results.reportdeletions[i]));
        if (creationdate <= currentdate ||
          creationdate.toDateString() == currentdate.toDateString()) {
          cnt2++;
        }
      }
      currentdate = new Date(currentdate);
      var year = currentdate.toLocaleString("default", { year: "numeric" });
      var month = currentdate.toLocaleString("default", { month: "2-digit" });
      var day = currentdate.toLocaleString("default", { day: "2-digit" });
      var formattedDate = year + "-" + month + "-" + day;
      let data1 = {
        date: formattedDate,
        reports: cnt1,
        deletions:cnt2
      };
      data.push(data1);
      currentdate.setDate(currentdate.getDate() + 1);
    }
    return res.send(data);
  });
};

export const CountVisitors = async (req, res) => {
  const gredditid = req.body.gredditid;
  SubGreddiit.findById(gredditid, (err, result) => {
    let newvisitors = [].concat(result.visitors, {
      date: Date.now(),
    });
    SubGreddiit.findByIdAndUpdate(
      gredditid,
      { visitors: newvisitors },
      (err, resu) => {
        console.log(resu);
        return res.send(resu);
      }
    );
  });
};