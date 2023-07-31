import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Typography, Box, TextField, Button, Grid, Modal//, Avatar
} from "@mui/material";
import followericon from "./followers.png";
import followingicon from "./following.png";
import FollowingList from "./FollowingList";
import FollowersList from "./FollowersList";
import Buffer from "DisplayComponents/Buffer";
import UserImage from "DisplayComponents/UserImage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const navigate = useNavigate();
  const [userdetails, setuserdetails] = useState(null);
  const picturePath  = useSelector((state) => state.user.picturePath);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
    const fetchuser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/getuser/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setuserdetails(data);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // lets fetch users data
      fetchuser();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(updatedetails)
    const data = new FormData(event.currentTarget);
    console.log(data.get("userName"));
    const newuserdetails = {};
    if (data.get("userName") !== userdetails.userName)
      newuserdetails.userName = data.get("userName");
    if (data.get("firstName") !== userdetails.firstName)
      newuserdetails.firstName = data.get("firstName");
    if (data.get("lastName") !== userdetails.lastName)
      newuserdetails.lastName = data.get("lastName");
    if (data.get("email") !== userdetails.email)
      newuserdetails.email = data.get("email");
    if (data.get("age") !== userdetails.age)
      newuserdetails.age = data.get("age");
    if (data.get("contactNumber") !== userdetails.contactNumber)
      newuserdetails.contactNumber = data.get("contactNumber");
    if (data.get("password") !== "******")
      newuserdetails.password = data.get("password");

    const response = await fetch(`http://localhost:3001/api/users/edituser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newuserdetails),
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) {
      setuserdetails(json);
    }
    handleClose();
    window.location.reload();
  };

  return (
    <>
      {!userdetails && <Buffer />}
      {userdetails && (
        <div className="my-5 container">
          <div className="row">
            <div className="col col-md-6 col-sm-12">
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className="my-3"
              >
                <UserImage image={picturePath}/>
                <Typography align="center" variant="h5" gutterBottom>
                  {" "}
                  {userdetails.firstName} {userdetails.lastName}
                </Typography>
                <IconButton aria-label="delete" onClick={handleOpen}>
                  <EditIcon />
                </IconButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={style}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          defaultValue={userdetails.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          defaultValue={userdetails.lastName}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="userName"
                          label="User Name"
                          name="userName"
                          autoComplete="family-name"
                          defaultValue={userdetails.userName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          defaultValue={userdetails.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          defaultValue="******"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="age"
                          label="Age"
                          name="age"
                          autoComplete="new-age"
                          defaultValue={userdetails.age}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="contactNumber"
                          label="Contact Number"
                          name="contactNumber"
                          autoComplete="new-contact"
                          defaultValue={userdetails.contactNumber}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Save and continue
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleClose}
                      color="error"
                    >
                      cancel
                    </Button>
                  </Box>
                </Modal>
              </Stack>
              <Box noValidate sx={{ mt: 6 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      fullWidth
                      label="User Name"
                      defaultValue={userdetails.userName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      label="Email"
                      fullWidth
                      defaultValue={userdetails.email}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      fullWidth
                      label="Password"
                      defaultValue="******"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      fullWidth
                      label="Age"
                      defaultValue={userdetails.age}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      label="ContactNumber"
                      defaultValue={userdetails.contactNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className="col col-md-6 col-sm-12">
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                className="my-5"
              >
                <FollowingList following={userdetails.following} />
                <img
                  src={followericon}
                  style={{
                    width: "2rem",
                  }}
                  alt=""
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                className="my-5"
              >
                <Button size="medium">
                  <FollowersList followers={userdetails.followers} />
                </Button>
                <img
                  src={followingicon}
                  style={{
                    width: "2rem",
                  }}
                  alt=""
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


