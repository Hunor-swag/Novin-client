import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import control from "../assets/control.png";
import logo from "../assets/logo.png";

function getTime() {
  let today = new Date();
  var hours = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
  var minutes =
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  var time = hours + ":" + minutes;
  return time;
}

const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState("");

  const timeInterval = () => {
    setTime(getTime());
  };

  useEffect(() => {
    timeInterval();
    setInterval(timeInterval, 1000);
  }, []);

  const links = [
    { text: "Home", route: "/" },
    { text: "Bills", route: "/bills" },
    { text: "Create a bill", route: "/create-bill" },
    { text: "Log out", route: "/logout" },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-purple-800 relative`}
    >
      <img
        src={control}
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-purple-800 ${
          !open && "rotate-180"
        }`}
        alt=""
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img src={logo} alt="" className={`cursor-pointer duration-500`} />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          {props.userToken.user.name}
        </h1>
      </div>
      <ul className="pt-6">
        {links.map((link, index) => (
          <Link key={index} to={link.route}>
            <li
              className={`${
                !open && "hidden"
              } text-gray-400 text-lg flex items-center gap-x-4 cursor-pointer p-3 hover:bg-white rounded-md font-semibold`}
            >
              <span className={` origin-left duration-200`}>{link.text}</span>
            </li>
          </Link>
        ))}
      </ul>
      <ul className="pt-6">
        <li
          className={`${
            !open && "hidden"
          } text-gray-400 text-lg flex items-center gap-x-4 p-3`}
        >
          <span className={` origin-left duration-200`}>
            Last login: {props.userToken.user.last_login}
          </span>
        </li>
        <li
          className={`${
            !open && "hidden"
          } text-gray-400 text-lg flex items-center gap-x-4 p-3`}
        >
          <span className={` origin-left duration-200`}>Time: {time}</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
