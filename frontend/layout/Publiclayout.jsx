import { Outlet, useLocation } from "react-router-dom";
import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer";

const Publiclayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <Header />}

      <Outlet />

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Publiclayout;
