import NotLoggedIn from "../components/NotLoggedIn";
import Sidebar from "../components/Sidebar";
import parseJwt from "../functions/parseJwt";

const Home = () => {
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
        <h1>Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
