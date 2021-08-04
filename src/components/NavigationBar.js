import {
  AppBar,
  ListItem,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import {database} from "../firebase.js"
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
import { Redirect, useLocation, useHistory } from "react-router-dom";

const NavigationBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!location.state) {
      return ;
    } 

    getUserInfo();
  }, []);

  if (!location.state) {
    return <Redirect to='/'></Redirect>
  }
  
  const userRef = database.collection("user").doc(location.state.userid);
  function getUserInfo() {
    userRef.get()
      .then(docSnapshot => {
        setUser(docSnapshot.data())
      })
  }


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
          <div>
          <Typography inline className="no_deco" variant="h6">
            CitiMall
          </Typography>
          <Typography inline>
            User: {user.name} Loyalty Points: {user.loyalty}
          </Typography>
          </div>
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
                  <ListItem button onClick={() => 
                          {
                            console.log(jsonObj.url);
                            history.push({
                              pathname: jsonObj.url,
                              state: { userid: location.state.userid }
                            })
                          }
                        }>
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
