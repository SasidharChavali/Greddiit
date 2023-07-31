import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <div className="my-3">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress />
      </Stack>
    </div>
  );
}
