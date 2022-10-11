import { useState, useEffect } from "react";
import NotLoggedIn from "../components/NotLoggedIn";
import Sidebar from "../components/Sidebar";
import parseJwt from "../functions/parseJwt";
import { Link } from "react-router-dom";

const ViewBill = () => {
  const [values, setValues] = useState({
    customer_name: "",
    date_of_issue: "",
    due_date: "",
    item_name: "",
    comment: "",
    price: "",
  });

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/bills")
      .then((response) => response.json())
      .then((data) => {
        setBills(data);
      });
  }, []);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const selectChange = (e) => {
    if (e.target.value !== "")
      setValues(bills.find((bill) => bill.customer_name === e.target.value));
  };

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
          <select
            onChange={(e) => selectChange(e)}
            className="w-72 mb-10 rounded-lg"
          >
            <option value=""></option>
            {bills.map((bill, index) => {
              return <option key={index}>{bill.customer_name}</option>;
            })}
          </select>
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Customer name: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="customer_name"
                      placeholder="Customer name"
                      className="m-1 rounded-lg p-2 w-72"
                      value={values.customer_name}
                      onChange={(e) => handleInputChange(e)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Date of issue: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="date_of_issue"
                      placeholder="Date of issue"
                      className="m-1 rounded-lg p-2 w-72"
                      value={values.date_of_issue}
                      onChange={(e) => handleInputChange(e)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Due date: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="due_date"
                      placeholder="Due date"
                      className="m-1 rounded-lg p-2 w-72"
                      value={values.due_date}
                      onChange={(e) => handleInputChange(e)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Item name: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="item_name"
                      placeholder="Item name"
                      className="m-1 rounded-lg p-2 w-72"
                      value={values.item_name}
                      onChange={(e) => handleInputChange(e)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Comment: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="comment"
                      placeholder="Comment"
                      className="m-1 rounded-lg p-2 w-72"
                      value={values.comment}
                      onChange={(e) => handleInputChange(e)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Price: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="price"
                      placeholder="Price"
                      className="m-1 rounded-lg p-2 w-72"
                      value={values.price}
                      onChange={(e) => handleInputChange(e)}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to="/">
              <button
                type="button"
                className=" mt-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1 disabled:text-black disabled:bg-red-400 disabled:border-red-700"
              >
                Home
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
