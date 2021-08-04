import { AppBar, Typography, Button } from "@material-ui/core";
import React from "react";
import "react-sidebar-ui/dist/index.css";
import { Link } from "react-router-dom";
import BLUE from "../utils/Color";
const TopBar = () => {
  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{
          backgroundColor: BLUE,
          display: "flex",
          flexDirection: "row",
          paddingLeft: "5%",
          justifyContent: "space-between",
        }}
      >
        <Typography className="no_deco_cashier" variant="h6">
          Cashier: Jimmy
        </Typography>
        <Button
          component={Link}
          to="/"
          style={{ color: "white", fontWeight: "bold", paddingRight: "5%" }}
        >
          Logout
        </Button>
      </AppBar>
    </React.Fragment>
  );
};

export default TopBar;
