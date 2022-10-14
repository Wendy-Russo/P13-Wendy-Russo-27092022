import React, { state, useState, useEffect, useCallback } from "react";
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import UserService from "../services/user.service";
import { updateProfile } from "../slices/auth";

import argentBankLogo from '../img/argentBankLogo.png'

import LogoutButton from "./LogoutButton";
import NameButton from "./NameButton";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'


function User(){

  const [successFull, setSuccessFull] = useState(false);
  const { user : currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const DISPATCH = useDispatch();

  const initialValues = {
    firstName : "",
    lastName  : "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
  });

  const _updateProfile = (formValue) => {
    console.log("0")

    const { firstName, lastName } = formValue;
    setSuccessFull(false);

    DISPATCH(updateProfile({firstName,lastName}))
      .unwrap()
      .then(() => {
        setSuccessFull(true);
        window.location.reload();
      })
      .catch(() => {
        setSuccessFull(false);
      });
  }

  useEffect(() => {
    UserService.getUserProfile().then(
      (response) => {
        setContent(response.data);
        setFirstName(response.data.body.firstName)
        setLastName(response.data.body.lastName)
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message)
          ||
          error.message 
          ||
          error.toString();

        setContent(_content);
      }
    );

    /*EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };*/

  }, [])

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return(
    <>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <NameButton/>
          <LogoutButton/>
        </div>
      </nav>
      <main className="main bg-dark py-5">
        <div className="header">
          <h1 className="">
            Welcome back
            <br />
            {firstName + ' ' + lastName}
          </h1>

          <div className="dropdown-center d-flex justify-content-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={_updateProfile}
            >
              <Form className="update-form d-flex flex-wrap justify-content-center w-50" >
                <div className="d-md-flex w-100 justify-content-center">
                  <div className="mb-3 mx-2 ">
                      <Field name="firstName" placeholder={firstName} id="firstName" className="rounded-pill form-control mb-2 shadow-sm" />
                      <ErrorMessage name="firstName" component="div" className='alert alert-danger' />
                  </div>
                  <div className="mb-3 mx-2">
                      <Field name="lastName" placeholder={lastName} id="lastName" className="rounded-pill form-control mb-2 shadow-sm" />
                      <ErrorMessage name="lastName" component="div" className='alert alert-danger' />
                  </div>
                </div>
                <div className="d-md-flex w-100 justify-content-center">
                  <button type="submit"  className="sign-in-button rounded shadow-sm mx-2" >  
                    <span>Update Profile</span>
                  </button>
                  <button type="reset"  className="sign-in-button rounded shadow-sm mx-2" >  
                    <span>Cancel</span>
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account rounded shadow">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button rounded shadow-sm">View transactions</button>
          </div>
        </section>
        <section className="account rounded shadow">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button rounded shadow-sm">View transactions</button>
          </div>
        </section>
        <section className="account rounded shadow">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button rounded shadow-sm">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  
  )
}

export default User
