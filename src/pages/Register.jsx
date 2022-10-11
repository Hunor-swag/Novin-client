import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

const usernameValid = (username) => {
  return username.length >= 6;
};

const passwordValid = (password) => {
  return password.length >= 6;
};

const nameValid = (name) => {
  return name.length > 0;
};

const Register = () => {
  return (
    <div className="border-4 grid place-items-center text-xl p-5 max-w-2xl mx-auto rounded-xl mt-5">
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const date = new Date();
          const datestring =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
          const requestData = {
            name: values.name,
            username: values.username,
            password: values.password,
            date: datestring,
          };

          await axios
            .post("http://localhost:5050/register", requestData)
            .then((response) => {
              window.location.href = "/login";
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {(props) => {
          const { values } = props;
          return (
            <Form>
              <Field
                type="Name"
                name="name"
                placeholder="Name (min. 1 character)"
                className="m-1 rounded-lg p-2 w-72"
              />
              <br />
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1 disabled:text-black disabled:bg-red-400 disabled:border-red-700"
                disabled={
                  !usernameValid(values.username) ||
                  !passwordValid(values.password) ||
                  !nameValid(values.name)
                }
              >
                Register
              </button>
              <Link to="/">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1"
                  type="button"
                >
                  Back
                </button>
              </Link>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
