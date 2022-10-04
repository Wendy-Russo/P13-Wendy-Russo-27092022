import React, { state, useState, useEffect, useCallback } from "react";
import {useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

function LogoutButton(){

  const { isLoggedIn } = useSelector((state) => state.auth);

  const DISPATCH = useDispatch();


  console.log(isLoggedIn)

  const logOut = useCallback(() => {
    console.log(1)
    DISPATCH(logout());
  }, [DISPATCH]);

  return(
    isLoggedIn &&(<a className="main-nav-item " href="./" onClick={logOut}>
      <i className="fa fa-sign-out me-1"/>
      Log Out
    </a>)
  )
}

export default LogoutButton