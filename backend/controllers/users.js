import { verifyToken } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const fetchUser = async (req, res) => {
  console.log(req.params);
  // console.log(req.user);
  const userid = req.params.id;
  User.findById({ _id: userid }, (err, results) => {
    if (results) {
      console.log(results);
      res.send(results);
    } else {
      res.status(401).send({ error: "pls authenticate properly" });
    }
  });
};

export const getUser = async (req, res) => {
  try {
    const userid = req.body.id;
    const user = await User.findById(userid);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const UpdateUser = async (req, res) => {
  const { email, userName, age, contactNumber, password, lastName, firstName } =
    req.body;
  const userid = req.params.userId;
  // if email is gonna update then make sure it is not a duplicate one
  if (email && userName) {
    User.findOne({ email: email }, (err, result) => {
      if (err && Object.keys(err).length)
        return res.send({ error: "errror in finding user with email" });
      if (result) {
        return res.send({ error: " email already in use" });
      } else {
        User.findOne({ userName: userName }, (err1, result1) => {
          if (err1 && Object.keys(err1).length)
            return res.send({ error: "errror in finding user with userName" });
          if (result1) return res.send({ error: " userName already in use" });
          else {
            const newuserdata = {};
            if (email) newuserdata.email = email;
            if (userName) newuserdata.userName = userName;
            if (age) newuserdata.age = age;
            if (contactNumber) newuserdata.contactNumber = contactNumber;
            if (password) {
              const salt = bcrypt.genSalt();
              const passwordHash = bcrypt.hash(password, salt);
              newuserdata.password = passwordHash;
            }
            if (lastName) newuserdata.lastName = lastName;
            if (firstName) newuserdata.firstName = firstName;
            User.findByIdAndUpdate(
              { _id: userid },
              { $set: newuserdata },
              { new: true },
              (err, result) => {
                if (err && Object.keys(err).length)
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
      }
    });
  } else if (userName) {
    User.findOne({ userName: userName }, (err1, result1) => {
      if (err1 && Object.keys(err1).length)
        return res.send({ error: "errror in finding user with userName" });
      if (result1) return res.send({ error: " userName already in use" });
      else {
        const newuserdata = {};
        if (email) newuserdata.email = email;
        if (userName) newuserdata.userName = userName;
        if (age) newuserdata.age = age;
        if (contactNumber) newuserdata.contactNumber = contactNumber;
        if (password) {
          const salt = bcrypt.genSalt();
          const passwordHash = bcrypt.hash(password, salt);
          newuserdata.password = passwordHash;
        }
        if (lastName) newuserdata.lastName = lastName;
        if (firstName) newuserdata.firstName = firstName;
        User.findByIdAndUpdate(
          { _id: userid },
          { $set: newuserdata },
          { new: true },
          (err, result) => {
            if (err && Object.keys(err).length)
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
  } else if (email) {
    User.findOne({ email: email }, (err, result) => {
      if (err && Object.keys(err).length)
        return res.send({ error: "errror in finding user with email" });
      if (result) {
        return res.send({ error: " email already in use" });
      } else {
        const newuserdata = {};
        if (email) newuserdata.email = email;
        if (userName) newuserdata.userName = userName;
        if (age) newuserdata.age = age;
        if (contactNumber) newuserdata.contactNumber = contactNumber;
        if (password) {
          const salt = bcrypt.genSalt();
          const passwordHash = bcrypt.hash(password, salt);
          newuserdata.password = passwordHash;
        }
        if (lastName) newuserdata.lastName = lastName;
        if (firstName) newuserdata.firstName = firstName;
        User.findByIdAndUpdate(
          { _id: userid },
          { $set: newuserdata },
          { new: true },
          (err, result) => {
            if (err && Object.keys(err).length)
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
  } else {
    const newuserdata = {};
    if (email) newuserdata.email = email;
    if (userName) newuserdata.userName = userName;
    if (age) newuserdata.age = age;
    if (contactNumber) newuserdata.contactNumber = contactNumber;
    if (password) {
      const salt = bcrypt.genSalt();
      const passwordHash = bcrypt.hash(password, salt);
      newuserdata.password = passwordHash;
    }
    if (lastName) newuserdata.lastName = lastName;
    if (firstName) newuserdata.firstName = firstName;
    User.findByIdAndUpdate(
      { _id: userid },
      { $set: newuserdata },
      { new: true },
      (err, result) => {
        if (err && Object.keys(err).length)
          return res.send({
            error: "error in finding in findingbyIdandupdate",
          });
        else {
          return res.send(result);
        }
      }
    );
  }
};

export const RemoveFollower = async (req, res) => {
  
  User.findById({ _id: req.body.id }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({
        error: "Error in finding user by id in removefollower route",
      });
    else {
      
      const update = result.following.filter((x) => x !== req.user.id);
      const final = {
        following: update,
      };
     
      User.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: final },
        { new: true },
        (err, result) => {
          if (err && Object.keys(err).length)
            return res.send({
              error: "Error in finding in findingbyIdandupdate",
            });
        }
      );
    }
  
  User.findById({ _id: req.user.id }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({
        error: "error in finding user by id in removefollower route",
      });
    else {
      const update = result.followers.filter((x) => x !== req.body.id);
      const final = {
        followers: update,
      };
      console.log(final);
      User.findByIdAndUpdate(
        { _id: req.user.id },
        { $set: final },
        { new: true },
        (err, result) => {
          if (err && Object.keys(err).length)
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
})}

export const RemoveFollowing = async (req, res) => {
  // change the following array of user with _id:req.body.id
  User.findById({ _id: req.body.id }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({
        error: "Error in finding user by id in removefollower route",
      });
    else {
      // console.log(result.following);
      const update = result.followers.filter((x) => x !== req.user.id);
      const final = {
        followers: update,
      };
      User.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: final },
        { new: true },
        (err, result) => {
          if (err && Object.keys(err).length)
            return res.send({
              error: "Error in finding in findingbyIdandupdate",
            });
        }
      );
    }
  });

  // change the follower array of user with _id:req.user.id
  User.findById({ _id: req.user.id }, (err, result) => {
    if (err && Object.keys(err).length)
      return res.send({
        error: "Error in finding user by id in removefollower route",
      });
    else {
      const update = result.following.filter((x) => x !== req.body.id);
      const final = {
        following: update,
      };
      console.log(final);
      User.findByIdAndUpdate(
        { _id: req.user.id },
        { $set: final },
        { new: true },
        (err, result) => {
          if (err && Object.keys(err).length)
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
};

export const FollowUser = async (req, res) => {
  const userid = req.body.id;
  const postid = req.body.postid;
  Post.findById({ _id: postid }, (err, result) => {
    const usertofollow = result.postedBy;
    if (userid == usertofollow) {
      return res.send({ error: "following yourself !!! :)" });
    } else {
      User.findById({ _id: userid }, (error, result) => {
        if (error && Object.keys(error).length)
          return res.send({ error: "error" });
        else if (!result) 
          return res.send({ error: "error" });
        else {
          if (result.following.includes(usertofollow)) {
            return res.send({ error: "already following" });
          } else {
            let newfollowing = [].concat(result.following, usertofollow);
            console.log(newfollowing);
            const newuser = {
              following: newfollowing,
            };
            User.findByIdAndUpdate(
              { _id: userid },
              { $set: newuser },
              { new: true },
              (err2, result2) => {
                if (err2 && Object.keys(err2).length)
                  return res.send({
                    error: "error in finding in findingbyIdandupdate",
                  });
                else {
                  User.findById({ _id: usertofollow }, (err3, result3) => {
                    if (err3 && Object.keys(err3).length)
                      return res.send({ error: "error" });
                    else if (!result3) return res.send({ error: "error" });
                    else {
                      let newfollowers = [].concat(result3.followers, userid);
                      const newuser = {
                        followers: newfollowers,
                      };
                      User.findByIdAndUpdate(
                        { _id: usertofollow },
                        { $set: newuser },
                        { new: true },
                        (err4, result4) => {
                          if (err4 && Object.keys(err4).length)
                            return res.send({
                              error: "error in finding in findingbyIdandupdate",
                            });
                          else {
                            return res.send(result4);
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        }
      });
    }
  });
};