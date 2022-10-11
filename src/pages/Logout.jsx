import { Link } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }, []);

  return (
    <div className="p-10 text-5xl">
      You have successfully logged out. Click{" "}
      <Link to="/" className="underline text-blue-400">
        home
      </Link>{" "}
      to return to the home page.
    </div>
  );
};

export default Logout;
