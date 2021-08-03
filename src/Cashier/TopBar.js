import { AppBar, Typography, Button } from "@material-ui/core";
import React from "react";
import "react-sidebar-ui/dist/index.css";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{
          backgroundColor: "blue",
          display: "flex",
          flexDirection: "row",
          padding: "3px",
          justifyContent: "space-between",
        }}
      >
        <Typography className="no_deco" variant="h6">
          Cashier: Jimmy
        </Typography>
        <Button
          component={Link}
          to="/"
          style={{ color: "white", fontWeight: "bold" }}
        >
          Logout
        </Button>
      </AppBar>
    </React.Fragment>
  );
};

export default TopBar;
