import { Grid, Typography } from "@mui/material";
import React from "react";

function Header({isInHomePage}) {
  return (
    <Grid container paddingLeft={isInHomePage? '-5%' :'4%'} item alignSelf="stretch" justifyContent= { isInHomePage ? 'center':'start'} alignItems='center' gap={2} height='10vh'
    sx={{boxShadow: isInHomePage ? '' :  '3px 3px 5px 0px rgba(50,99,148,0.75)'}}
    >
      <Grid item>
        <svg
          fill="rgb(251 146 60)"
          width="50px"
          height="50px"
          viewBox="0 0 52 52"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m46.31 11.23a3.69 3.69 0 0 1 3.69 3.69v22.16a3.69 3.69 0 0 1 -3.69 3.69h-26.88a5.65 5.65 0 0 0 5.28-3.69h20.67a.93.93 0 0 0 .93-.93v-18.46a.93.93 0 0 0 -.93-.92h-26.38a7.75 7.75 0 0 0 -6.8-3.69h-.42a3.7 3.7 0 0 1 3.19-1.85zm-34.16 4.62a5.28 5.28 0 0 1 5.34 5.22 4.18 4.18 0 0 1 0 .5 5.44 5.44 0 0 1 -1.75 4.1 2.94 2.94 0 0 0 -1.18 2.18c0 .7.31 1.4 1.84 2.16l1.07.48.7.33.69.33c1.84 1 3.36 2.16 3.41 3.93a2.93 2.93 0 0 1 -2.6 3h-14.79a2.92 2.92 0 0 1 -2.88-3v-.08c0-2 1.74-3.18 3.82-4.17l.67-.3 1-.44c2-.83 2.23-1.52 2.23-2.33a3.25 3.25 0 0 0 -1.18-2.1 5.41 5.41 0 0 1 -1.84-4.1 5.28 5.28 0 0 1 4.81-5.71 5.86 5.86 0 0 1 .64 0z"
            fill-rule="evenodd"
          />
        </svg>
      </Grid>

      <Grid item>
        <Typography variant="h4" color='rgb(251 146 60)'> ConnectHub </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
