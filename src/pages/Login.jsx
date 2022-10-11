import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [attempts, setAttempts] = useState(0); // attempts to log in
  const [msg, setMsg] = useState(""); // fail message under buttons
  const [isVerified, setIsVerified] = useState(false); // captcha state
  const captchaRef = useRef(null);

  const usernameValid = (username) => {
    return username.length >= 6;
  };

  const passwordValid = (password) => {
    return password.length >= 6;
  };

  const verifyCallback = (e) => {
    setIsVerified(true);
  };

  return (
    <div className="border-4 grid place-items-center text-xl p-5 max-w-2xl mx-auto rounded-xl mt-5">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          if (attempts >= 3 && !isVerified) {
            setMsg("Please verify that you are a human!");
            return;
          }

          // send login data to api
          const requestData = {
            username: values.username,
            password: values.password,
          };

          await axios
            .post("http://localhost:5050/login", requestData)
            .then((response) => {
              // console.log(response.data);
              const token = response.data.token;

              document.cookie = "token=" + token;
              window.location.href = "/";
            })
            .catch((err) => {
              setMsg("Invalid credentials");
            });
          if (attempts >= 3) captchaRef.current.reset();
          setAttempts(attempts + 1);
          setIsVerified(false);
        }}
      >
        {(props) => {
          const { values } = props;
          return (
            <Form>
              <Field
                type="text"
                name="username"
                placeholder="Username (min. 6 characters)"
                className="m-1 rounded-lg p-2 w-72"
              />
              <br />
              <Field
                type="password"
                name="password"
                placeholder="Password (min. 6 characters)"
                className="m-1 rounded-lg p-2 w-72"
              />
              <br />
              {attempts >= 3 && (
                <div>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    onChange={verifyCallback}
                    ref={captchaRef}
                  />
                </div>
              )}
              <br />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1 disabled:text-black disabled:bg-red-400 disabled:border-red-700"
                disabled={
                  !usernameValid(values.username) ||
                  !passwordValid(values.password)
                }
              >
                Login
              </button>
              <Link to="/register">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Register
                </button>
              </Link>

              <p className="text-red-700 font-bold">{msg}</p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
