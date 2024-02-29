import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

export interface AuthLayoutProps {}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" sx={{ mt: 10 }}>
            hello
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
