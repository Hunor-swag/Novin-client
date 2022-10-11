import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div className="border-4 p-5 max-w-2xl mx-auto grid place-items-center rounded-xl mt-5">
      <h1 className="text-3xl font-semibold">Welcome to the homepage!</h1>
      <div className="flex flex-row items-center gap-4">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotLoggedIn;
