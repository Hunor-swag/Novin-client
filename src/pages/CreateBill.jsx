import React from "react";
import NotLoggedIn from "../components/NotLoggedIn";
import Sidebar from "../components/Sidebar";
import parseJwt from "../functions/parseJwt";
import { Formik, Field, Form } from "formik";
import axios from "axios";

const CreateBill = () => {
  // is the user logged in?
  let token = document.cookie.split("=")[1];
  if (!token) {
    return <NotLoggedIn />;
  }

  const userToken = parseJwt(token);

  return (
    <div className="flex">
      <Sidebar userToken={userToken} />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <div className="border-4 grid place-items-center text-xl p-5 max-w-2xl mx-auto rounded-xl">
          <Formik
            initialValues={{
              customer_name: "",
              date_of_issue: "",
              due_date: "",
              item_name: "",
              comment: "",
              price: "",
            }}
            onSubmit={async (values) => {
              // send data to api
              const requestData = {
                customer_name: values.customer_name,
                date_of_issue: values.date_of_issue,
                due_date: values.due_date,
                item_name: values.item_name,
                comment: values.comment,
                price: parseInt(values.price),
              };
              axios
                .post("http://localhost:5050/create-bill", requestData)
                .then((response) => {
                  // console.log(response.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              window.location.href = "/bills";
            }}
          >
            {(props) => {
              return (
                <Form>
                  <Field
                    type="text"
                    name="customer_name"
                    placeholder="Customer name"
                    className="m-1 rounded-lg p-2 w-72"
                    required
                  />
                  <br />
                  <Field
                    type="text"
                    name="date_of_issue"
                    placeholder="Date of issue"
                    className="m-1 rounded-lg p-2 w-72"
                    required
                  />
                  <br />
                  <Field
                    type="text"
                    name="due_date"
                    placeholder="Due date"
                    className="m-1 rounded-lg p-2 w-72"
                    required
                  />
                  <br />
                  <Field
                    type="text"
                    name="item_name"
                    placeholder="Item name"
                    className="m-1 rounded-lg p-2 w-72"
                    required
                  />
                  <br />
                  <Field
                    type="text"
                    name="comment"
                    placeholder="Comment"
                    className="m-1 rounded-lg p-2 w-72"
                    required
                  />
                  <br />
                  <Field
                    type="text"
                    name="price"
                    placeholder="Price"
                    className="m-1 rounded-lg p-2 w-72"
                    required
                  />
                  <br />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1 disabled:text-black disabled:bg-red-400 disabled:border-red-700"
                  >
                    Create bill
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;
