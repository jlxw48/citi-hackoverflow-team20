import {
  AppBar,
  ListItem,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import "react-sidebar-ui/dist/index.css";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Navjson from "./Navigation.json";
import Logo from "./../Asset/citilogo.png";
import StoreIcon from "@material-ui/icons/Store";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import RedeemIcon from "@material-ui/icons/Redeem";
import "./Navigation.css";
import HomeIcon from "@material-ui/icons/Home";

const NavigationBar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography className="no_deco" variant="h6">
            CitiMall
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        style={{ width: "10%" }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div style={{ width: "100%", marginTop: "10%" }}>
          <img src={Logo} alt="logo" className="nav_logo" />
          <List>
            {Navjson.navigation.map((jsonObj, index) => (
              <div key={jsonObj.name}>
                <div
                  onClick={() => itemOnTap(jsonObj.name)}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <ListItem button component={Link} to={jsonObj.url}>
                    <ListItemIcon>
                      {jsonObj.name === Navjson.navigation[0].name ? (
                        <HomeIcon />
                      ) : jsonObj.name === Navjson.navigation[1].name ? (
                        <StoreIcon />
                      ) : jsonObj.name === Navjson.navigation[2].name ? (
                        <RedeemIcon />
                      ) : (
                        <ExitToAppIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={jsonObj.name} />
                  </ListItem>
                </div>
              </div>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );

  function itemOnTap(item) {
    setOpen(false);
  }
};

export default NavigationBar;
