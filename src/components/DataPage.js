import { Grid, Stack, Button } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const buttons = [
  {
    name: "UK",
    value: "uk",
    link: "/uk",
  },
  {
    name: "AUS",
    value: "aus",
    link: "/aus",
  },
  {
    name: "SWISS",
    value: "swiss",
    link: "/swiss",
  },
];

const getRouteForData = (path) => `/data${path}`;

export default function DataPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveTab = (buttonAttr) => buttonAttr.link === location.pathname;

  return (
    <>
      <Grid container>
        <Grid item xs={12} mt={3} mr={1}>
          <Grid container justifyContent="flex-end">
            <Stack spacing={2} direction="row">
              {buttons.map((button) => (
                <Button
                  {...button}
                  key={button.name}
                  variant="contained"
                  disabled={isActiveTab(button)}
                  onClick={() => {
                    !button.disabled && navigate(getRouteForData(button.link));
                  }}
                >
                  {button.name}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
