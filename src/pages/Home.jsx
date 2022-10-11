import NotLoggedIn from "../components/NotLoggedIn";
import Sidebar from "../components/Sidebar";
import parseJwt from "../functions/parseJwt";

const Home = () => {
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
        <h1 className="text-4xl">Welcome to the bill managing system! </h1>
        <h3 className="mt-10">Find out more at the menu on the left side!</h3>
      </div>
    </div>
  );
};

export default Home;
