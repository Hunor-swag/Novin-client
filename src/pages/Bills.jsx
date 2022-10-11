import React, { useState, useEffect } from "react";
import NotLoggedIn from "../components/NotLoggedIn";
import Sidebar from "../components/Sidebar";
import parseJwt from "../functions/parseJwt";
import { Link } from "react-router-dom";

const Bills = (props) => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/bills")
      .then((response) => response.json())
      .then((data) => {
        setBills(data);
        // console.log(data);
      });
  }, []);

  let token = document.cookie.split("=")[1];
  if (!token) {
    return <NotLoggedIn />;
  }

  const userToken = parseJwt(token);
  // console.log(userToken);

  return (
    <div className="flex">
      <Sidebar userToken={userToken} />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Bills</h1>
        <table className="table">
          <tbody>
            <tr>
              <td className="td"></td>
              <td className="td">Customer name</td>
              <td className="td">Date of issue</td>
              <td className="td">Due date</td>
              <td className="td">Item name</td>
              <td className="td">Comment</td>
              <td className="td">Price</td>
            </tr>
            {bills.map((bill, index) => {
              return (
                <tr key={index}>
                  <td className="td">{index + 1}</td>
                  <td className="td">{bill.customer_name}</td>
                  <td className="td">{bill.date_of_issue}</td>
                  <td className="td">{bill.due_date}</td>
                  <td className="td">{bill.item_name}</td>
                  <td className="td">{bill.comment}</td>
                  <td className="td">{bill.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/create-bill">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5 disabled:text-black disabled:bg-red-400 disabled:border-red-700"
          >
            Create
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Bills;
