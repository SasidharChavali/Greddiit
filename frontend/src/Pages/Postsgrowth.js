import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import Buffer from "DisplayComponents/Buffer";
//import { useEffect } from "react";
//const host = "http://localhost:3001";

function DateUserGraph(props) {
  const [data, setdata] = useState(null);
  const getdata = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits/postsgrowth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gredditid: props.id }),
    });
    const json = await response.json();
    // console.log("hey hello");
    console.log(json);
    if (!json.error) setdata(json);
  };
  useEffect(() => {
    getdata();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {!data && <Buffer />}
      {data && (
        <ResponsiveContainer width="60%" height={400}>
          <BarChart width={"60%"} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default DateUserGraph;
