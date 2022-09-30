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
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName + ' ' + lastName}
          </h1>

          <div className="dropdown-center ">
            <button type="button" className=" dropdown-toggle edit-button rounded" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false">
              Dropdown form
            </button>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={_updateProfile}
            >
              <div className="dropdown-menu p-3 shadow border border-success">

                <Form >
                  <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <Field name="firstName" id="firstName" className="rounded form-control" />
                      <ErrorMessage name="firstName" component="div" className='alert alert-danger' />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <Field name="lastName" id="lastName" className="rounded form-control" />
                      <ErrorMessage name="lastName" component="div" className='alert alert-danger' />
                  </div>
                  <button type="submit"  className="sign-in-button rounded" >  
                    <span>Update Profile</span>
                  </button>
                </Form>
              </div >
            </Formik>
          </div>

        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account rounded">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button rounded">View transactions</button>
          </div>
        </section>
        <section className="account rounded">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button rounded">View transactions</button>
          </div>
        </section>
        <section className="account rounded">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button rounded">View transactions</button>
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
