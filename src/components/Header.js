import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "./Header.css";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { MAIN_LOGO } from "../utils/iconsAndLogos";
import { Link } from "react-router-dom";
import { listItems } from "../utils/constants";

const Header = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div className="header_overAll">
      {/* ham icon for side bar */}
      <IconButton onClick={() => setToggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* logo and quote */}
      <div className="header_logo-and-heading">
        <img src={MAIN_LOGO} className="header_logo" />
        <Typography vairant="h3">FITNESS TRACKER BY ADITYA</Typography>
      </div>

      {/* drawer */}
      <Drawer anchor="left" open={toggleDrawer}>
        <div className="header_drawer">
          <IconButton onClick={() => setToggleDrawer(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <ul className="header_ListParent">
            {listItems.map((eachItem) => (
              <li onClick={() => setToggleDrawer(false)} className="header_ListItem">
                <Link 
                to={"/" + eachItem.path}>
                  <Button >
                    {eachItem.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
