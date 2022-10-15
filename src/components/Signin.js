import '../css/main.css'
import argentBankLogo from '../img/argentBankLogo.png'
import iconChat from '../img/icon-chat.png'
import iconMoney from '../img/icon-money.png'
import iconSecurity from '../img/icon-security.png'

import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect  } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Navigate, useNavigate } from "react-router-dom";


import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Signin = () => {

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username : "",
    password : "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({username,password}))
      .unwrap()
      .then(() => {
        Navigate("/user");
      })
      .catch(() => {
        setLoading(false);
      });
  }

  if(isLoggedIn){
    return <Navigate to="/user" />
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
            <a className="main-nav-item" href="./login">
            <i className="fa fa-user-circle" />
            Sign In
            </a>
        </div>
        </nav>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon" />
            <h1>
              Sign In
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <div className='form-group'>
                
                  <div className="input-wrapper">
                    <label htmlFor="username">
                      Username
                    </label>
                    <Field type="text" name="username" id="username" className="rounded-pill mb-2 ps-3"/>
                    <ErrorMessage name="username" component="div" className='alert alert-danger' />
                  </div>

                  <div className="input-wrapper">
                    <label htmlFor="password">
                      Password
                    </label>
                    <Field type="text" id="password" name="password" className="rounded-pill mb-2 ps-3"/>
                    <ErrorMessage name="password" component="div" className='alert alert-danger' />
                  </div>

                  <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>

                  <button type="submit"  className="sign-in-button rounded" disabled={
                    loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                  )}>  
                    <span>Login</span>
                  </button>

                </div>
              </Form>
            </Formik>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </section>
        </main>

        <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
        </footer>
      
    </>
      
  );
} 

export default Signin