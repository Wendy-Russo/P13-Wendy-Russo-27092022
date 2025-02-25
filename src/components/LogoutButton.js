import React, { state, useState, useEffect, useCallback } from "react";
import {useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

function LogoutButton(){

  const { isLoggedIn } = useSelector((state) => state.auth);

  const DISPATCH = useDispatch();

  const logOut = useCallback(() => {

    DISPATCH(logout());
  }, [DISPATCH]);

  return(
    isLoggedIn &&(<a className="main-nav-item " href="./login" onClick={logOut}>
      <i className="fa fa-sign-out me-1"/>
      Log Out
    </a>)
  )
}

export default LogoutButton