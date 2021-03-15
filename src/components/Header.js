import React, { useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from '@material-ui/core/IconButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "../styles/Header.css";

import { userContext } from '../App';

const Header = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();

  return (
    <div className="header">
      <div className="header__contents">
        
        <div className="header__contents__logo">
         <InstagramIcon fontSize="large" />
         
          Instagram</div>
        <div className="header__contents__icons">

        <Link to="/home">
          <IconButton>
              <HomeIcon fontSize="large" />    
          </IconButton>
         </Link>

         <Link to="/createpost">
          <IconButton>
            <AddBoxOutlinedIcon fontSize="large" />
          </IconButton>
         </Link>

         <Link to="/profile">
          <IconButton>
              <Avatar />
          </IconButton>
         </Link>
        
          <IconButton onClick={
                () => {
                  sessionStorage.clear();
                  dispatch({type: "LOGOUT"});
                  history.push('/signin');
                }
              }>
              <ExitToAppIcon fontSize="large" />
          </IconButton>       
      
          
        </div>
      </div>
    </div>
  );
};

export default Header;
