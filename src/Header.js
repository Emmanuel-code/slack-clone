import { Avatar, ButtonGroup, MenuItem, Select } from '@material-ui/core'
import { AccessTime, ArrowDropDown, ArrowDropDownCircle, ExpandMore, HelpOutline, Search } from '@material-ui/icons'
import React from 'react'
import './Header.css'
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import SidebarOption from './SidebarOption';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice";

function Header() {
// const user = useSelector(selectUser);
    const [user] = useAuthState(auth);
    const history = useHistory();
      const dispatch = useDispatch();
    
    return (
      <div className="header">
        <div className="header__left">
          <Avatar src={user?.photoURL}>{user?.displayName[0]}</Avatar>{" "}
          <Select color="primary" className="drop">
            <MenuItem
              onClick={() => auth.signOut().then(dispatch(logout()))}
            >
              Logout
            </MenuItem>
          </Select>
          <AccessTime />
        </div>
        <div className="header__middle">
          <Search />
          <input type="text" placeholder="search bej slack" />
        </div>
        <div className="header__right">
          <HelpOutline />
        </div>
      </div>
    );
}

export default Header
