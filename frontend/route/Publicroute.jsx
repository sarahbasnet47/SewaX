import Publiclayout from "../layout/Publiclayout";
import About from "../src/Components/About";
import Contact from "../src/Components/Contact";
import Hero from "../src/Components/Hero";
import Login from "../src/Components/Login";
import Qna from "../src/Components/Qna";
import Register from "../src/Components/Register";
import ServiceDetails from "../src/Components/Servicedetails";
import Services from "../src/Components/Services";
import UserPosts from "../src/Components/Userpost";
import Vendor from "../src/Components/Vendor";
import VendorDetails from "../src/Components/Vendordetails";
const Landing = () => {
  return (
    <div>
      <Hero />
      <Qna />
    </div>
  );
};
export const PublicRoutes = {
  element: <Publiclayout />,
  children: [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/vendor",
      element: <Vendor />,
    },
    {
      path: "/services/:slug",
      element: <ServiceDetails />,
    },
    {
      path: "/vendor/:id",
      element: <VendorDetails />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/post",
      element: <UserPosts />,
    },
    {
      path:"/posts",
      element:<UserPosts/>
    },
    {
      path:"/contact",
      element:<Contact/>
    }
  ],
};
