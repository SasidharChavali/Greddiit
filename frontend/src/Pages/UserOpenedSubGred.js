import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Chip } from "@mui/material";
import { Stack } from "@mui/material";
import { List } from "@mui/material";
import Buffer from "DisplayComponents/Buffer";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector} from "react-redux";
import Sgfollowers from "./Sgfollowers";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Report from "./Report";
import Growthsb from "./Growthsb";
import Postsgrowth from "./Postsgrowth";
import Visitorsgrowth from "./Visitorsgrowth";
import Reportedpostsgrowth from "./Reportedpostsgrowth";
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserOpenedSubGred() {
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const token = useSelector((state) => state.token);
  const location = useLocation();
  const id = location.state.subgredId;
  const [greddit, setgreddit] = useState(null);
  const [reports, setreports] = useState(null);
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);
  const fetchdata = async () => {
    const response = await fetch(`http://localhost:3001/api/subgreddiits/getgredditbyid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
     // body: JSON.stringify({ id: id }),
    });
    const json = await response.json();
    // console.log("hey hello");
    console.log(json);
    if (!json.error) setgreddit(json);
  };

  const fetchreports = async () => {
    const response = await fetch(`http://localhost:3001/api/subgreddiits/getreports/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ id: id }),
    });
    const json = await response.json();
    // console.log("hey hello");
    console.log("reports",json);
    if (!json.error) setreports(json);
  };

  useEffect(() => {
    console.log(id);
    if (!token) {
      navigate("/login");
    } else {
      fetchdata();
      fetchreports();
      console.log(greddit);
    // }
  }}, [flag]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {(!greddit || !reports) && <Buffer />}
      {greddit && reports && (
        <>
          <div className="mx-4 my-4">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  TabIndicatorProps={{ sx: { display: "none" } }}
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                    },
                  }}
                  value={value}
                  onChange={handleChange}
                  aria-label="scrollable auto tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="SubGreddit Details" {...a11yProps(0)} />
                  <Tab label="Users" {...a11yProps(1)} />
                  <Tab label="Join Requests" {...a11yProps(2)} />
                  <Tab label={<>Reporting page</>} {...a11yProps(3)} />
                  <Tab label={"Stats"} {...a11yProps(4)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="row">
                  <div className="col col-md-12">
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <AssignmentIcon color="primary" />
                      <h3>{greddit.Name}</h3>
                    </Stack>
                    <p className="my-4">{greddit.Description}</p>
                    <h3>Tags</h3>
                    <div className="row">
                      {greddit.Tags.map((tag) => {
                        return (
                          <div className="col col-md-1 my-1 col-sm-12">
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
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="row my-5">
                  <div className="col">
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <PeopleOutlineOutlinedIcon />
                      <h5> Unblocked users</h5>
                    </Stack>
                    <List>
                      {greddit.Followers
                        .filter((user) => user.status === "accepted")
                        .map((user) => {
                          return <Sgfollowers id={user} />;
                        })}
                    </List>
                  </div>
                  <div className="col">
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <PeopleOutlineOutlinedIcon />
                      <h5> Blocked users</h5>
                    </Stack>
                    <List>
                      {greddit.Followers
                        .filter((user) => user.status === "blocked")
                        .map((user) => {
                          return <Sgfollowers id={user} />;
                        })}
                    </List>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="row">
                  <div className="col col-md-12">
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <CircleNotificationsIcon color="primary" />
                      <h5>Join Requests</h5>
                    </Stack>
                    <div className="row my-5">
                      <div className="col">
                        {console.log(greddit.Followers)}
                        <List>
                          {greddit.Followers
                            .filter(() => function(user1) {
                              if (user1.status === "requested") 
                              return user1;
                            })
                            .map((user) => {
                              return (
                                <Sgfollowers
                                  id={user}
                                  flag={flag}
                                  setflag={setflag}
                                  greddit={greddit}
                                />
                              );
                            })}
                        </List>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                {reports && reports.length === 0 && <h5>No Reports</h5>}
                {reports.map((report) => {
                  return (
                    <>
                      <Report report={report} setflag={setflag} flag={flag} />
                    </>
                  );
                })}
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className="row ">
                  <div className="col col-md-6 col-sm-12">
                    <Growthsb id={id} />
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <Postsgrowth id={id} />
                  </div>
                </div>
                <div className="row ">
                  <div className="col col-md-6 col-sm-12">
                    <Visitorsgrowth id={id} />
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <Reportedpostsgrowth id={id} />
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </>
      )}
    </>
  );
}

export default UserOpenedSubGred;
